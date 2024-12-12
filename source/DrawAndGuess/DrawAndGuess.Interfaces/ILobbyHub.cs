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

        Task<Lobby> GetCurrentLobby(int lobbyId, Player player);

        Task LeaveLobby(int lobbyId, Player player);

        Task UpdateCurrentLobby(int lobbyId);

        Task VoteStartGame(int lobbyId, Player player);

        // Messages

        Task SendMessage(int lobbyId, string message, string username);

        Task<List<Message>> GetMessages(int lobbyId);
    }
}