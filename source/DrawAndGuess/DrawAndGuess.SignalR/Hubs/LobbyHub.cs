using DrawAndGuess.Entities;
using DrawAndGuess.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace DrawAndGuess.SignalR.Hubs
{
    public class LobbyHub : Microsoft.AspNetCore.SignalR.Hub, ILobbyHub
    {
        private static readonly ConcurrentDictionary<string, Player> ConnectedClients = new();

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

        public async Task Testing()
        {
            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} trykkede på test knappen!");
        }

        public async Task<int> GetConnectedCount()
        {
            Console.WriteLine("Kaldt");
            await Clients.Caller.SendAsync("userCountChanged", ConnectedClients.Count);
            return ConnectedClients.Count;
        }
    }
}