using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrawAndGuess.Entities
{
    public class Player : IdentityUser
    {
        #region Fields

        private string name;
        private Statistic? statistic;

        #endregion Fields

        #region Constructors

        public Player()
        { }

        public Player(string name)
        {
            Name = name;
        }

        public Player(string name, Statistic statistic)
        {
            Name = name;
            Statistic = statistic;
        }

        #endregion Constructors

        #region Properties

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public Statistic? Statistic
        {
            get { return statistic; }
            set { statistic = value; }
        }

        #endregion Properties
    }
}