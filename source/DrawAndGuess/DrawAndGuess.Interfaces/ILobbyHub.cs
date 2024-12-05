using DrawAndGuess.Entities;

namespace DrawAndGuess.Interfaces
{
    public interface ILobbyHub
    {
        Task Testing();

        Task<int> GetConnectedCount();
    }
}