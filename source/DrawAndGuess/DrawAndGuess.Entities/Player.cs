using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DrawAndGuess.Entities
{
    public class Player : IdentityUser
    {
        #region Fields

        private string name;
        private List<Role> role;
        private Statistic? statistic;

        #endregion Fields

        #region Constructors

        public Player()
        { }

        public Player(string name)
        {
            Name = name;
        }

        public Player(string name, List<Role> role)
        {
            Name = name;
            Roles = role;
        }

        public Player(string name, Statistic statistic)
        {
            Name = name;
            Statistic = statistic;
        }

        public Player(string name, List<Role> role, Statistic statistic)
        {
            Name = name;
            Roles = role;
            Statistic = statistic;
        }

        #endregion Constructors

        #region Properties

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public List<Role> Roles
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

        #region Methods

        public override bool Equals(object obj)
        {
            return obj is Player other && Id == other.Id;
        }

        public override int GetHashCode()
        {
            return Id?.GetHashCode() ?? 0;
        }

        #endregion Methods
    }
}