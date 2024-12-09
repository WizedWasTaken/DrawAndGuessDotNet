using DrawAndGuess.DataAccess;
using DrawAndGuess.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
            });


            // Auth
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                };
            });
            builder.Services.AddIdentity<Player, Role>()
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

            //app.MapIdentityApi<Player>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.UseCors("CorsPolicy");

            SeedRoles(app);

            app.Run();
        }

        public static void SeedRoles(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())  // Create a scope for scoped services
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
                var roles = new[] { "Admin", "Player" };

                foreach (var role in roles)
                {
                    var roleExist = roleManager.RoleExistsAsync(role).Result;
                    if (!roleExist)
                    {
                        var roleResult = roleManager.CreateAsync(new Role { Name = role }).Result;
                    }
                }
            }
        }


    }
}