using DrawAndGuess.Entities;
using DrawAndGuess.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace DrawAndGuess.SignalR.Hubs
{
    public class LobbyHub : Hub, ILobbyHub
    {
        private static readonly ConcurrentDictionary<string, Player> ConnectedClients = new();
        private static readonly ConcurrentDictionary<Lobby, List<Player>> VoteStartLobbies = new();
        private static readonly List<Game> Games = new();
        private static readonly List<Lobby> ActiveLobbies = new();

        public override async Task OnConnectedAsync()
        {
            var connectionId = Context.ConnectionId;

            ConnectedClients.TryAdd(connectionId, new Player
            {
                Id = connectionId
            });

            Console.WriteLine($"{DateTime.UtcNow} - {connectionId} connected to the server.");

            await Clients.All.SendAsync("userCountChanged", ConnectedClients.Count);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connectionId = Context.ConnectionId;

            if (ConnectedClients.TryRemove(connectionId, out _))
            {
                Console.WriteLine($"{DateTime.UtcNow} - {connectionId} disconnected from the server.");
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task<int> GetConnectedCount()
        {
            await Clients.Caller.SendAsync("userCountChanged", ConnectedClients.Count);
            return ConnectedClients.Count;
        }

        public Task<List<Lobby>> GetCurrentLobbies()
        {
            var lobbies = ActiveLobbies.Concat(Games.Select(g => g.Lobby)).ToList();
            return Task.FromResult(lobbies);
        }

        public async Task<Lobby> CreateLobby(string title, Player creator)
        {
            var newLobby = new Lobby(ActiveLobbies.Count + 1, title, new List<Player> { creator }, LobbyStatus.Waiting);

            ActiveLobbies.Add(newLobby);
            VoteStartLobbies.TryAdd(newLobby, new List<Player>());

            await Clients.All.SendAsync("lobbyCreated", newLobby);
            await SendMessage(newLobby.LobbyId, $"{creator.UserName} created the lobby {title}.", "System");

            return newLobby;
        }

        public async Task<Lobby> JoinLobby(int lobbyId, Player player)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);
            if (lobby == null) return null;

            if (lobby.Players.All(p => p.Id != player.Id))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId.ToString());
                lobby.Players.Add(player);

                await Clients.Group(lobbyId.ToString()).SendAsync("lobbyUpdated", lobby);
                await SendMessage(lobby.LobbyId, $"{player.UserName} joined the lobby.", "System");
            }

            return lobby;
        }

        public async Task LeaveLobby(int lobbyId, Player player)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);
            if (lobby == null || player == null) return;

            if (lobby.Players.Remove(player))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, lobbyId.ToString());
                await HandleVoteStartRemoval(lobby, player);

                if (lobby.Players.Count == 0)
                {
                    ActiveLobbies.Remove(lobby);
                }
                else
                {
                    await Clients.Group(lobbyId.ToString()).SendAsync("lobbyUpdated", lobby);
                    await SendMessage(lobby.LobbyId, $"{player.UserName} left the lobby.", "System");
                }
            }
        }

        public Task<Lobby> GetCurrentLobby(int lobbyId, Player player)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);
            return Task.FromResult(lobby);
        }

        public async Task VoteStartGame(int lobbyId, Player player)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);
            if (lobby == null) return;

            var votes = VoteStartLobbies.GetOrAdd(lobby, new List<Player>());

            if (votes.Contains(player))
            {
                votes.Remove(player);
                await SendMessage(lobby.LobbyId, $"{player.UserName} removed their vote.", "System");
            }
            else
            {
                votes.Add(player);
                await SendMessage(lobby.LobbyId, $"{player.UserName} voted to start the game.", "System");
            }

            await Clients.Group(lobbyId.ToString()).SendAsync("lobbyUpdatedVotes", votes);

            if (votes.Count >= lobby.Players.Count / 2)
            {
                lobby.LobbyStatus = LobbyStatus.InGame;
                await StartGame(lobby);
            }
        }

        public async Task SendMessage(int lobbyId, string message, string username)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);
            if (lobby == null) return;

            var messageObj = new Message(lobby.Messages.Count + 1, username, message, DateTime.UtcNow);
            lobby.Messages.Add(messageObj);

            await Clients.Group(lobbyId.ToString()).SendAsync("messageReceived", messageObj);
        }

        public Task<List<Message>> GetMessages(int lobbyId)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);
            return Task.FromResult(lobby?.Messages ?? new List<Message>());
        }

        // Lib Methods
        private async Task StartGame(Lobby lobby)
        {
            var newGame = new Game(Games.Count + 1, lobby, new List<Round>(), DateTime.UtcNow);
            Games.Add(newGame);

            lobby.LobbyStatus = LobbyStatus.InGame;
            await Clients.Group(lobby.LobbyId.ToString()).SendAsync("startGame", lobby.LobbyId);
        }


        private async Task HandleVoteStartRemoval(Lobby lobby, Player player)
        {
            if (VoteStartLobbies.TryGetValue(lobby, out var votes))
            {
                votes.Remove(player);
                if (!votes.Any())
                {
                    VoteStartLobbies.TryRemove(lobby, out _);
                }

                await Clients.Group(lobby.LobbyId.ToString()).SendAsync("lobbyUpdatedVotes", votes);
            }
        }
    }
}
