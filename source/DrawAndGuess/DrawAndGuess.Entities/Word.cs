using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace DrawAndGuess.Entities
{
    public class Word
    {
        #region Fields

        private int wordId;
        private string value;

        #endregion Fields

        #region Constructors

        public Word()
        {
        }

        public Word(int wordId, string value)
        {
            this.wordId = wordId;
            this.Value = value;
        }

        #endregion Constructors

        #region Properties

        public int WordId
        {
            get { return wordId; }
            set { wordId = value; }
        }

        public string Value
        {
            get { return value; }
            set { this.value = value; }
        }

        #endregion Properties
    }
}