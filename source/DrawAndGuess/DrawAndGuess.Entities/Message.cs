using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrawAndGuess.Entities
{
    public class Message
    {
        #region Fields

        private int messageId;
        private string sender;
        private string content;
        private DateTime timestamp;

        #endregion Fields

        #region Constructors

        public Message()
        {
        }

        public Message(int messageId, string sender, string content, DateTime timestamp)
        {
            MessageId = messageId;
            Sender = sender;
            Content = content;
            Timestamp = timestamp;
        }

        #endregion Constructors

        #region Properties

        public int MessageId
        {
            get => messageId;
            set => messageId = value;
        }

        public string Sender
        {
            get => sender;
            set => sender = value;
        }

        public string Content
        {
            get => content;
            set => content = value;
        }

        public DateTime Timestamp
        {
            get => timestamp;
            set => timestamp = value;
        }

        #endregion Properties
    }
}