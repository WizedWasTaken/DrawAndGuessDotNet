using DrawAndGuess.Entities;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace DrawAndGuess.SignalR.Hubs
{
    public class LobbyHub : Microsoft.AspNetCore.SignalR.Hub
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
    }
}