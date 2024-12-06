﻿using DrawAndGuess.Entities;
using DrawAndGuess.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace DrawAndGuess.SignalR.Hubs
{
    public class LobbyHub : Microsoft.AspNetCore.SignalR.Hub, ILobbyHub
    {
        private static readonly ConcurrentDictionary<string, Player> ConnectedClients = new();
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

            ConnectedClients.TryAdd(connectionId, new Player());

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
            // Mock data - make real players.
            var players = new List<Player>
            {
                new Player { PlayerId = 1, Name = "Player 1" },
                new Player { PlayerId = 2, Name = "Player 2" },
                new Player { PlayerId = 3, Name = "Player 3" },
                new Player { PlayerId = 4, Name = "Player 4" },
                new Player { PlayerId = 5, Name = "Player 5" },
            };

            // Mock data
            var lobbies = new List<Lobby>
            {
                new Lobby(1, "Lobby 1", players, LobbyStatus.Waiting),
                new Lobby(2, "Lobby 2", new List<Player>(), LobbyStatus.Waiting),
                new Lobby(3, "Lobby 3", new List<Player>(), LobbyStatus.Waiting),
                new Lobby(4, "Lobby 4", players, LobbyStatus.Waiting),
                new Lobby(5, "Lobby 5", new List<Player>(), LobbyStatus.Waiting),
            };

            return Task.FromResult(lobbies);
        }

        public async Task<Lobby> CreateLobby(string title)
        {
            var connectionId = Context.ConnectionId;

            var player = ConnectedClients[connectionId];

            var lobby = new Lobby(ActiveLobbies.Count + 1, title, new List<Player> { player }, LobbyStatus.Waiting);

            ActiveLobbies.Add(lobby);

            await Clients.All.SendAsync("lobbyCreated", lobby);

            return lobby;
        }

        public async Task<Lobby> JoinLobby(int lobbyId)
        {
            var connectionId = Context.ConnectionId;

            var player = ConnectedClients[connectionId];

            var lobby = ActiveLobbies.FirstOrDefault(l => l.LobbyId == lobbyId);

            if (lobby == null)
            {
                return null;
            }

            lobby.Players.Add(player);

            await Clients.All.SendAsync("lobbyUpdated", lobby);

            return lobby;
        }
    }
}