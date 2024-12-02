namespace DrawAndGuess.Entities
{
    public class Statistic
    {
        #region Fields

        private int statisticId;
        private List<Point> points;

        #endregion Fields

        #region Constructors

        public Statistic()
        { }

        public Statistic(int statisticId, List<Point> points)
        {
            StatisticId = statisticId;
            Points = points;
        }

        #endregion Constructors

        #region Properties

        public int StatisticId
        {
            get { return statisticId; }
            set { statisticId = value; }
        }

        public List<Point> Points
        {
            get { return points; }
            set { points = value; }
        }

        #endregion Properties
    }
}