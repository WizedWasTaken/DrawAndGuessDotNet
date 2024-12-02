using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrawAndGuess.Entities
{
    public class Admin
    {
        #region Fields

        private int adminId;
        private Player user;

        #endregion Fields

        #region Constructors

        public Admin()
        { }

        public Admin(int adminId, Player user)
        {
            AdminId = adminId;
            User = user;
        }

        #endregion Constructors

        #region Properties

        public int AdminId
        {
            get { return adminId; }
            set { adminId = value; }
        }

        public Player User
        {
            get { return user; }
            set { user = value; }
        }

        #endregion Properties
    }
}