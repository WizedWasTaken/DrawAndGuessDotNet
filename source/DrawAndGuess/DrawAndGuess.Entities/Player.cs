using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DrawAndGuess.Entities
{
    public class Player : IdentityUser
    {
        #region Fields

        private string name;
        private Role role;
        private Statistic? statistic;

        #endregion Fields

        #region Constructors

        public Player()
        { }

        public Player(string name)
        {
            Name = name;
        }

        public Player(string name, Role role)
        {
            Name = name;
            Role = role;
        }

        public Player(string name, Statistic statistic)
        {
            Name = name;
            Statistic = statistic;
        }

        public Player(string name, Role role, Statistic statistic)
        {
            Name = name;
            Role = role;
            Statistic = statistic;
        }

        #endregion Constructors

        #region Properties

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public Role Role
        {
            get { return role; }
            set { role = value; }
        }

        public Statistic? Statistic
        {
            get { return statistic; }
            set { statistic = value; }
        }

        #endregion Properties
    }
}
