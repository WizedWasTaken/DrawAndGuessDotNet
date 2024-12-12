using DrawAndGuess.Entities;

namespace DrawAndGuess.Interfaces
{
    public interface ILobbyHub
    {
        Task<int> GetConnectedCount();

        Task<List<Lobby>> GetCurrentLobbies();

        Task<Lobby> CreateLobby(string title, Player player);

        // Current Lobby

        Task<Lobby> JoinLobby(int lobbyId, Player player);

        Task<Lobby> GetCurrentLobby(int lobbyId);

        Task LeaveLobby(int lobbyId, Player player);

        Task UpdateCurrentLobby(int lobbyId);

        // Messages

        Task SendMessage(int lobbyId, string message, string username);

        Task<List<Message>> GetMessages(int lobbyId);
    }
}