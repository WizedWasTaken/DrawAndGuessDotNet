using DrawAndGuess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DrawAndGuess.DataAccess
{
    public class DataContext : DbContext
    {
        public DbSet<Admin> Admins;
        public DbSet<Game> Games;
        public DbSet<Player> Players;
        public DbSet<Word> Words;
        public DbSet<Point> Points;
        public DbSet<Statistic> Statistics;
        public DbSet<Guess> Guesses;
        public DbSet<Lobby> Lobbies;
    }
}