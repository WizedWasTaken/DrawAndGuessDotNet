using DrawAndGuess.Entities;

namespace DrawAndGuess.Interfaces
{
    /// <summary>
    /// Interface defining the operations for managing lobbies, games, and communication within the multiplayer application.
    /// </summary>
    public interface ILobbyHub
    {
        /// <summary>
        /// Gets the total count of connected clients.
        /// </summary>
        /// <returns>The number of currently connected clients.</returns>
        Task<int> GetConnectedCount();

        /// <summary>
        /// Retrieves the list of all active lobbies and lobbies associated with ongoing games.
        /// </summary>
        /// <returns>A list of current lobbies.</returns>
        Task<List<Lobby>> GetCurrentLobbies();

        /// <summary>
        /// Creates a new lobby with the given title and adds the creator to it.
        /// </summary>
        /// <param name="title">The title of the lobby.</param>
        /// <param name="player">The player creating the lobby.</param>
        /// <returns>The created lobby instance.</returns>
        Task<Lobby> CreateLobby(string title, Player player);

        // Lobby Operations

        /// <summary>
        /// Allows a player to join an existing lobby by ID.
        /// </summary>
        /// <param name="lobbyId">The unique ID of the lobby.</param>
        /// <param name="player">The player attempting to join the lobby.</param>
        /// <returns>The lobby the player has joined.</returns>
        Task<Lobby> JoinLobby(int lobbyId, Player player);

        /// <summary>
        /// Retrieves the current lobby for a given player by ID.
        /// </summary>
        /// <param name="lobbyId">The unique ID of the lobby.</param>
        /// <param name="player">The player whose current lobby is being retrieved.</param>
        /// <returns>The current lobby instance if it exists; otherwise, null.</returns>
        Task<Lobby> GetCurrentLobby(int lobbyId, Player player);

        /// <summary>
        /// Allows a player to leave a lobby by ID.
        /// </summary>
        /// <param name="lobbyId">The unique ID of the lobby.</param>
        /// <param name="player">The player leaving the lobby.</param>
        Task LeaveLobby(int lobbyId, Player player);

        /// <summary>
        /// Allows a player to vote for starting a game in a lobby.
        /// </summary>
        /// <param name="lobbyId">The unique ID of the lobby.</param>
        /// <param name="player">The player casting the vote.</param>
        Task VoteStartGame(int lobbyId, Player player);

        // Messaging Operations

        /// <summary>
        /// Sends a message to all players in a lobby.
        /// </summary>
        /// <param name="lobbyId">The unique ID of the lobby.</param>
        /// <param name="message">The message content.</param>
        /// <param name="username">The username of the sender.</param>
        Task SendMessage(int lobbyId, string message, string username);

        /// <summary>
        /// Retrieves the message history for a specific lobby.
        /// </summary>
        /// <param name="lobbyId">The unique ID of the lobby.</param>
        /// <returns>A list of messages from the lobby.</returns>
        Task<List<Message>> GetMessages(int lobbyId);
    }
}
