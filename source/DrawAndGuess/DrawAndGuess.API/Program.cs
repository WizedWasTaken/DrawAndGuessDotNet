using DrawAndGuess.DataAccess;
using DrawAndGuess.Entities;
using Microsoft.AspNetCore.Identity;
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
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo()
                {
                    Title = "Auth",
                    Version = "v1"
                });

                options.AddSecurityDefinition("Bearer",
                    new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                    {
                        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                        Description = "JWT Authorization header using the Bearer scheme.",
                        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                        BearerFormat = "JWT",
                        Scheme = "bearer"
                    });

                options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement {
                    {
                        new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                        {
                            Reference = new Microsoft.OpenApi.Models.OpenApiReference
                            {
                                Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });
            });

            // Database
            builder.Services.AddDbContextPool<DataContext>(opt =>
                opt.UseNpgsql(
                    "Host=postgre-db.noahnielsen.dk; Database=\"DrawAndGuess\"; Username=DrawAndGuessCode2; Password=drawAndGuessCode2",
                    o => o
                        .SetPostgresVersion(13, 0)
                        .MapEnum<WordDifficulty>("wordDifficulty")
                        .MapEnum<Points>("points")
                        .MapEnum<LobbyStatus>("lobbyStatus")
                ));

            // Auth
            builder.Services.AddAuthentication();
            builder.Services.AddIdentityApiEndpoints<Player>()
                .AddEntityFrameworkStores<DataContext>();

            // Cors
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowAnyOrigin();
                });
            });

            builder.Services.AddScoped<IRepository<Player>, Repository<Player>>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.MapIdentityApi<Player>();

            app.UseAuthorization();

            app.MapControllers();

            app.UseCors("CorsPolicy");

            app.Run();
        }
    }
}