using DrawAndGuess.SignalR.Hubs;

namespace DrawAndGuess.SignalR
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:3000", "https://noahnielsen.dk", "https://nielsen-tech.dk", "https://drawandguess.noahnielsen.dk", "https://drawandguess-frontend.noahnielsen.dk") // Specify the allowed origins
                          .AllowAnyHeader()

                          .AllowAnyMethod()
                          .AllowCredentials(); // Required for SignalR
                });
            });

            builder.Services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
                options.KeepAliveInterval = TimeSpan.FromSeconds(10);
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("CorsPolicy");

            app.MapHub<LobbyHub>("/lobbyHub");

            app.MapControllers();

            app.Run();
        }
    }
}