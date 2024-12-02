namespace DrawAndGuess.Entities
{
    public class Round
    {
        #region Fields

        private int roundId;
        private Word correctWord;
        private List<Guess> guesses;
        private Lobby lobby;

        #endregion Fields

        #region Constructors

        public Round()
        { }

        public Round(int roundId, Word correctWord, List<Guess> guesses, Lobby lobby)
        {
            RoundId = roundId;
            CorrectWord = correctWord;
            Guesses = guesses;
            Lobby = lobby;
        }

        #endregion Constructors

        #region Properties

        public int RoundId
        {
            get { return roundId; }
            set { roundId = value; }
        }

        public Word CorrectWord
        {
            get { return correctWord; }
            set { correctWord = value; }
        }

        public List<Guess> Guesses
        {
            get { return guesses; }
            set { guesses = value; }
        }

        public Lobby Lobby
        {
            get { return lobby; }
            set { lobby = value; }
        }

        #endregion Properties
    }
}