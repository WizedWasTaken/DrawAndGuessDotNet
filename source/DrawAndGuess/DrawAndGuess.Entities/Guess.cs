using System.Runtime.CompilerServices;

namespace DrawAndGuess.Entities
{
    public class Guess
    {
        #region Fields

        private int guessId;
        private string guessWord;
        private Player guessedBy;
        private WordDifficulty wordDifficulty;

        #endregion Fields

        #region Constructors

        public Guess()
        { }

        public Guess(int guessId, string guessWord, Player guessedBy, WordDifficulty wordDifficulty)
        {
            GuessId = guessId;
            GuessWord = guessWord;
            GuessedBy = guessedBy;
            WordDifficulty = wordDifficulty;
        }

        #endregion Constructors

        #region Properties

        public int GuessId
        {
            get { return guessId; }
            set { guessId = value; }
        }

        public string GuessWord
        {
            get { return guessWord; }
            set { guessWord = value; }
        }

        public Player GuessedBy
        {
            get { return guessedBy; }
            set { guessedBy = value; }
        }

        public WordDifficulty WordDifficulty
        {
            get { return wordDifficulty; }
            set { wordDifficulty = value; }
        }

        #endregion Properties
    }
}