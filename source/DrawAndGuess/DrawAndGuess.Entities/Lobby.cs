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
        private string title;
        private List<Player> players;

        #endregion Fields

        #region Constructors

        public Lobby()
        { }

        public Lobby(int lobbyId, string title, List<Player> players)
        {
            LobbyId = lobbyId;
            Title = title;
            Players = players;
        }

        #endregion Constructors

        #region Properties

        public int LobbyId
        {
            get { return lobbyId; }
            set { lobbyId = value; }
        }

        public string Title
        {
            get { return title; }
            set
            {
                title = value;
            }
        }

        public List<Player> Players
        {
            get { return players; }
            set { players = value; }
        }

        #endregion Properties
    }
}