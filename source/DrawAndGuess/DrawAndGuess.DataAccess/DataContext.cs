using DrawAndGuess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DrawAndGuess.DataAccess
{
    public class DataContext : IdentityDbContext<IdentityUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Word> Words { get; set; }
        public DbSet<Point> Points { get; set; }
        public DbSet<Statistic> Statistics { get; set; }
        public DbSet<Guess> Guesses { get; set; }
        public DbSet<Lobby> Lobbies { get; set; }
    }
}