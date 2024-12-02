namespace DrawAndGuess.Entities
{
    public class Point
    {
        #region Fields

        private int pointId;
        private Points value;

        #endregion Fields

        #region Constructors

        public Point()
        {
        }

        public Point(int pointId, Points value)
        {
            this.pointId = pointId;
            this.value = value;
        }

        #endregion Constructors

        #region Properties

        public int PointId
        {
            get { return pointId; }
            set { pointId = value; }
        }

        public Points Value
        {
            get { return value; }
            set { this.value = value; }
        }

        #endregion Properties
    }
}