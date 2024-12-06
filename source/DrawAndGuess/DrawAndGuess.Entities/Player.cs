using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrawAndGuess.Entities
{
    public class Player
    {
        #region Fields

        private int playerId;
        private string name;
        private string password;
        private string email;
        private Statistic? statistic;

        #endregion Fields

        #region Constructors

        public Player()
        { }

        public Player(string name)
        {
            Name = name;
        }

        public Player(string name, string password, string email, Statistic statistic)
        {
            Name = name;
            Password = password;
            Email = email;
            Statistic = statistic;
        }

        public Player(int playerId, string name, string password, string email, Statistic statistic)
        {
            PlayerId = playerId;
            Name = name;
            Password = password;
            Email = email;
            Statistic = statistic;
        }

        #endregion Constructors

        #region Properties

        public int PlayerId
        {
            get { return playerId; }
            set { playerId = value; }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        public string Email
        {
            get { return email; }
            set { email = value; }
        }

        public Statistic? Statistic
        {
            get { return statistic; }
            set { statistic = value; }
        }

        #endregion Properties
    }
}