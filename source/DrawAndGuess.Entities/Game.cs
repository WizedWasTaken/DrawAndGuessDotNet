using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace DrawAndGuess.Entities
{
    public class Game
    {
        #region Fields
        private int gameId;
        private string gameName;
        private User createdBy;
        private DateTime createdDate;
        private List<User> players;
        private List<Round> rounds;
        private List<Word> words;
    }
}