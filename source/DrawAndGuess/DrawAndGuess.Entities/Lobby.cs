using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrawAndGuess.Entities
{
    public class Lobby
    {
        #region Fields

        private int lobbyId;
        private List<Player> players;

        #endregion Fields

        #region Constructors

        public Lobby()
        { }

        public Lobby(int lobbyId, List<Player> players)
        {
            LobbyId = lobbyId;
            Players = players;
        }

        #endregion Constructors

        #region Properties

        public int LobbyId
        {
            get { return lobbyId; }
            set { lobbyId = value; }
        }

        public List<Player> Players
        {
            get { return players; }
            set { players = value; }
        }

        #endregion Properties
    }
}