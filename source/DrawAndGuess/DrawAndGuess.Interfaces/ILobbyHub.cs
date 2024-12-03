using DrawAndGuess.Entities;

namespace DrawAndGuess.Interfaces
{
    public interface ILobbyHub
    {
        bool CreateLobby(Lobby lobby);

        bool JoinLobby(string lobbyId, string playerId);
    }
}