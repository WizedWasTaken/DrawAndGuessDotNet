using DrawAndGuess.DataAccess;
using DrawAndGuess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DrawAndGuess.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContextPool<DataContext>(opt =>
            opt.UseNpgsql(
                "Host=postgre-db.noahnielsen.dk; Database=\"DrawAndGuess\"; Username=DrawAndGuessCode2; Password=drawAndGuessCode2",
                o => o
                    .SetPostgresVersion(13, 0)
                    .MapEnum<WordDifficulty>("wordDifficulty")
                    .MapEnum<Points>("points")
            ));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}