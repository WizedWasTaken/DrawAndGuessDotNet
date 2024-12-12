using DrawAndGuess.Entities;
using DrawAndGuess.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace DrawAndGuess.SignalR.Hubs
{
    public class LobbyHub : Microsoft.AspNetCore.SignalR.Hub, ILobbyHub
    {
        private static readonly ConcurrentDictionary<string, Player> ConnectedClients = new();
        private static List<Lobby> ActiveLobbies = new();

        // Add a static list of lobbies
        private readonly Lobby lobby1 = new Lobby(1, "Cheferne", new List<Player> { }, LobbyStatus.Waiting);

        private readonly Lobby lobby2 = new Lobby(2, "Chefens Kontor", new List<Player> { }, LobbyStatus.InGame);
        private readonly Lobby lobby3 = new Lobby(3, "Kontoret", new List<Player> { }, LobbyStatus.InGame);
        private readonly Lobby lobby4 = new Lobby(4, "Kontoret", new List<Player> { }, LobbyStatus.InGame);
        private readonly Lobby lobby5 = new Lobby(5, "Kontoret", new List<Player> { }, LobbyStatus.Ended);

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
            if (ActiveLobbies.Count == 0)
            {
                ActiveLobbies.Add(lobby1);
                ActiveLobbies.Add(lobby2);
                ActiveLobbies.Add(lobby3);
                ActiveLobbies.Add(lobby4);
                ActiveLobbies.Add(lobby5);
            }

            var lobbies = ActiveLobbies;

            return Task.FromResult(lobbies);
        }

        public async Task<Lobby> CreateLobby(string title)
        {
            var connectionId = Context.ConnectionId;

            var player = ConnectedClients[connectionId];

            var lobby = new Lobby(ActiveLobbies.Count + 1, title, new List<Player> { player }, LobbyStatus.Waiting);

            lobby.Messages.Add(new Message(1, "System", "Oprettede lobby.", DateTime.UtcNow));
            lobby.Messages.Add(new Message(1, "System", "Gør dig klar til at tegne eller gætte!", DateTime.UtcNow));

            ActiveLobbies.Add(lobby);

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
            UpdateCurrentLobby(lobby.LobbyId);

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
            }

            await Clients.All.SendAsync("lobbyUpdated", lobby);
            UpdateCurrentLobby(lobby.LobbyId);

            return;
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
            return null;
        }

        public async Task SendMessage(int lobbyId, string message, string username)
        {
            var connectionId = Context.ConnectionId;

            Message messageObj = new Message(1, username, message, DateTime.UtcNow);

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
            await Clients.OthersInGroup(lobbyId.ToString()).SendAsync("messageReceived", messageObj);
        }

        public Task<List<Message>> GetMessages(int lobbyId)
        {
            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);

            return Task.FromResult(lobby.Messages);
        }
    }
}