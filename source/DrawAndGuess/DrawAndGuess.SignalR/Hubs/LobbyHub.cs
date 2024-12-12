using DrawAndGuess.Entities;
using DrawAndGuess.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace DrawAndGuess.SignalR.Hubs
{
    public class LobbyHub : Microsoft.AspNetCore.SignalR.Hub, ILobbyHub
    {
        private static readonly ConcurrentDictionary<string, Player> ConnectedClients = new();
        private static readonly ConcurrentDictionary<Lobby, List<Player>> VoteStartLobbies = new();
        private static List<Lobby> ActiveLobbies = new();

        public LobbyHub()
        {
        }

        /// <summary>
        /// Called when a new connection is established with the hub.
        /// </summary>
        /// <returns>Nothing</returns>
        public override async Task OnConnectedAsync()
        {
            var connectionId = Context.ConnectionId;

            ConnectedClients.TryAdd(connectionId, new Player
            {
                Id = connectionId // Use ConnectionId as a unique identifier
            });

            await Clients.All.SendAsync("userCountChanged", ConnectedClients.Count);

            Console.WriteLine($"{DateTime.UtcNow} - {connectionId} connected to the server.");

            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Called when a connection with the hub is terminated.
        /// </summary>
        /// <param name="exception">Exception the user got.</param>
        /// <returns>Nothing</returns>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connectionId = Context.ConnectionId;

            ConnectedClients.TryRemove(connectionId, out _);

            Console.WriteLine($"{DateTime.UtcNow} - {connectionId} disconnected from the server.");

            await base.OnDisconnectedAsync(exception);
        }

        public async Task<int> GetConnectedCount()
        {
            Console.WriteLine("Kaldt");
            await Clients.Caller.SendAsync("userCountChanged", ConnectedClients.Count);
            return ConnectedClients.Count;
        }

        public Task<List<Lobby>> GetCurrentLobbies()
        {
            var lobbies = ActiveLobbies;

            return Task.FromResult(lobbies);
        }

        public async Task<Lobby> CreateLobby(string title, Player player)
        {
            var lobby = new Lobby(ActiveLobbies.Count + 1, title, new List<Player> { }, LobbyStatus.Waiting);

            VoteStartLobbies.TryAdd(lobby, new List<Player>());
            ActiveLobbies.Add(lobby);
            await SendMessage(lobby.LobbyId, $"{player.UserName} oprettede {lobby.Title}.", "System");
            await JoinLobby(lobby.LobbyId, player);

            await Clients.All.SendAsync("lobbyCreated", lobby);

            return lobby;
        }

        public async Task<Lobby> JoinLobby(int lobbyId, Player player)
        {
            var connectionId = Context.ConnectionId;

            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);

            if (lobby == null)
            {
                return null;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, Convert.ToString(lobbyId));
            lobby.Players.Add(player);

            await Clients.All.SendAsync("lobbyUpdated", lobby);
            await SendMessage(lobby.LobbyId, $"{player.UserName} tilsluttede sig lobbyen.", "System");
            await UpdateCurrentLobby(lobby.LobbyId);

            return lobby;
        }

        public async Task LeaveLobby(int lobbyId, Player player)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);

            if (lobby == null)
            {
                return;
            }

            var playerToRemove = lobby.Players.FirstOrDefault(p => p.Id == player.Id);
            if (playerToRemove != null)
            {
                lobby.Players.Remove(playerToRemove);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, Convert.ToString(lobbyId));

                var voteStartLobby = VoteStartLobbies.FirstOrDefault(l => l.Key.LobbyId == lobbyId);
                if (voteStartLobby.Key != null)
                {
                    voteStartLobby.Value.Remove(player);
                }

                if (voteStartLobby.Value.Count == 0)
                {
                    VoteStartLobbies.TryRemove(voteStartLobby.Key, out _);
                }
            }

            await Clients.All.SendAsync("lobbyUpdated", lobby);

            if (lobby.Players.Count == 0)
            {
                ActiveLobbies.Remove(lobby);
                return;
            }

            await SendMessage(lobby.LobbyId, $"{player.UserName} forlod lobbyen.", "System");
        }

        public Task<Lobby> GetCurrentLobby(int lobbyId)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);

            return Task.FromResult(lobby);
        }

        public Task UpdateCurrentLobby(int lobbyId)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);

            Clients.Clients(lobby.Players.Select(p => p.Id).ToList()).SendAsync("lobbyUpdated", lobby);
            return Task.CompletedTask;
        }

        public async Task VoteStartGame(int lobbyId, Player player)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);

            if (lobby == null)
            {
                return;
            }

            var voteStartLobby = VoteStartLobbies.GetOrAdd(lobby, new List<Player>());

            if (voteStartLobby.Any(p => p.Id == player.Id))
            {
                voteStartLobby.Remove(player);
                await Clients.Group(lobbyId.ToString()).SendAsync("lobbyUpdatedVotes", voteStartLobby);
                await SendMessage(lobby.LobbyId, $"{player.UserName} fjernede sin stemme for at starte spillet.", "System");
                return;
            }

            voteStartLobby.Add(player);
            await SendMessage(lobby.LobbyId, $"{player.UserName} stemte for at starte spillet.", "System");
            await Clients.Group(lobbyId.ToString()).SendAsync("lobbyUpdatedVotes", voteStartLobby);

            if (voteStartLobby.Count >= lobby.Players.Count / 2)
            {
                lobby.LobbyStatus = LobbyStatus.InGame;
                await SendMessage(lobby.LobbyId, $"{player.UserName} startede spillet.", "System");
                await Clients.Group(lobbyId.ToString()).SendAsync("lobbyUpdated", lobby);
                // Make start game logic.
            }
        }

        public async Task SendMessage(int lobbyId, string message, string username)
        {
            Message messageObj = new(1, username, message, DateTime.UtcNow);

            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);

            if (lobby == null)
            {
                Console.WriteLine($"Lobby with ID {lobbyId} not found.");
                return;
            }

            lobby.Messages.Add(messageObj);

            var clientIds = lobby.Players.Select(p => p.Id).ToList();
            if (clientIds.Count == 0)
            {
                Console.WriteLine("No clients in the lobby to send the message to.");
                return;
            }

            Console.WriteLine($"Sending message to clients: {string.Join(", ", clientIds)}");

            // Send the message to everyone in the group except the caller
            if (username == "System")
            {
                await Clients.Group(lobbyId.ToString()).SendAsync("messageReceived", messageObj);
                return;
            }

            await Clients.OthersInGroup(lobbyId.ToString()).SendAsync("messageReceived", messageObj);
        }

        public Task<List<Message>> GetMessages(int lobbyId)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);

            return Task.FromResult(lobby.Messages);
        }
    }
}