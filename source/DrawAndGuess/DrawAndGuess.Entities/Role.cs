using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrawAndGuess.Entities
{
    public class Role : IdentityRole
    {
        #region Fields

        private string description;
        private string name;

        #endregion Fields

        #region Constructors

        public Role()
        { }

        public Role(string name)
        {
            Name = name;
        }

        public Role(string name, string description)
        {
            Name = name;
            Description = description;
        }

        #endregion Constructors

        #region Properties

        public string Description
        {
            get { return description; }
            set { description = value; }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        #endregion Properties
    }
}