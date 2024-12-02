namespace DrawAndGuess.Entities
{
    public class Game
    {
        #region Fields

        private int gameId;
        private Lobby lobby;
        private List<Round> rounds;
        private DateTime startTime;
        private DateTime endTime;

        #endregion Fields

        #region Constructors

        public Game()
        {
        }

        public Game(int gameId, Lobby lobby, List<Round> rounds, DateTime startTime, DateTime endTime)
        {
            GameId = gameId;
            Lobby = lobby;
            Rounds = rounds;
            StartTime = startTime;
            EndTime = endTime;
        }

        #endregion Constructors

        #region Properties

        public int GameId
        {
            get { return gameId; }
            set { gameId = value; }
        }

        public Lobby Lobby
        {
            get { return lobby; }
            set { lobby = value; }
        }

        public List<Round> Rounds
        {
            get { return rounds; }
            set { rounds = value; }
        }

        public DateTime StartTime
        {
            get { return startTime; }
            set { startTime = value; }
        }

        public DateTime EndTime
        {
            get { return endTime; }
            set { endTime = value; }
        }

        #endregion Properties
    }
}