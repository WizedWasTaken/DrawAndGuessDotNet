using DrawAndGuess.Entities;

namespace DrawAndGuess.Interfaces
{
    public interface ILobbyHub
    {
        Task<int> GetConnectedCount();

        Task<List<Lobby>> GetCurrentLobbies();

        Task<Lobby> CreateLobby(string title);

        Task<Lobby> JoinLobby(int lobbyId, Player player);

        Task<Lobby> GetCurrentLobby();

        Task LeaveLobby(int lobbyId, Player player);
    }
}