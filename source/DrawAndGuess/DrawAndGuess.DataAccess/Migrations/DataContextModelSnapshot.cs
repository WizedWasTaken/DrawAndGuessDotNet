﻿// <auto-generated />
using System;
using DrawAndGuess.DataAccess;
using DrawAndGuess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DrawAndGuess.DataAccess.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "lobbyStatus", new[] { "ended", "in_game", "waiting" });
            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "points", new[] { "one", "three", "two" });
            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "wordDifficulty", new[] { "easy", "hard", "medium" });
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DrawAndGuess.Entities.Game", b =>
                {
                    b.Property<int>("GameId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("GameId"));

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("LobbyId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("GameId");

                    b.HasIndex("LobbyId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Guess", b =>
                {
                    b.Property<int>("GuessId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("GuessId"));

                    b.Property<string>("GuessWord")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("GuessedById")
                        .HasColumnType("text");

                    b.Property<int?>("RoundId")
                        .HasColumnType("integer");

                    b.Property<WordDifficulty>("WordDifficulty")
                        .HasColumnType("\"wordDifficulty\"");

                    b.HasKey("GuessId");

                    b.HasIndex("GuessedById");

                    b.HasIndex("RoundId");

                    b.ToTable("Guesses");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Lobby", b =>
                {
                    b.Property<int>("LobbyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("LobbyId"));

                    b.Property<LobbyStatus>("LobbyStatus")
                        .HasColumnType("\"lobbyStatus\"");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LobbyId");

                    b.ToTable("Lobbies");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Point", b =>
                {
                    b.Property<int>("PointId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("PointId"));

                    b.Property<int?>("StatisticId")
                        .HasColumnType("integer");

                    b.Property<Points>("Value")
                        .HasColumnType("points");

                    b.HasKey("PointId");

                    b.HasIndex("StatisticId");

                    b.ToTable("Points");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Round", b =>
                {
                    b.Property<int>("RoundId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RoundId"));

                    b.Property<int>("CorrectWordWordId")
                        .HasColumnType("integer");

                    b.Property<int?>("GameId")
                        .HasColumnType("integer");

                    b.Property<int>("LobbyId")
                        .HasColumnType("integer");

                    b.HasKey("RoundId");

                    b.HasIndex("CorrectWordWordId");

                    b.HasIndex("GameId");

                    b.HasIndex("LobbyId");

                    b.ToTable("Round");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Statistic", b =>
                {
                    b.Property<int>("StatisticId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("StatisticId"));

                    b.HasKey("StatisticId");

                    b.ToTable("Statistics");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Word", b =>
                {
                    b.Property<int>("WordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("WordId"));

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("WordId");

                    b.ToTable("Words");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("character varying(13)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasDiscriminator().HasValue("IdentityRole");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("character varying(13)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasDiscriminator().HasValue("IdentityUser");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Role", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityRole");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PlayerId")
                        .HasColumnType("text");

                    b.HasIndex("PlayerId");

                    b.HasDiscriminator().HasValue("Role");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Player", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<int?>("LobbyId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("StatisticId")
                        .HasColumnType("integer");

                    b.HasIndex("LobbyId");

                    b.HasIndex("StatisticId");

                    b.HasDiscriminator().HasValue("Player");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Game", b =>
                {
                    b.HasOne("DrawAndGuess.Entities.Lobby", "Lobby")
                        .WithMany()
                        .HasForeignKey("LobbyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lobby");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Guess", b =>
                {
                    b.HasOne("DrawAndGuess.Entities.Player", "GuessedBy")
                        .WithMany()
                        .HasForeignKey("GuessedById");

                    b.HasOne("DrawAndGuess.Entities.Round", null)
                        .WithMany("Guesses")
                        .HasForeignKey("RoundId");

                    b.Navigation("GuessedBy");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Point", b =>
                {
                    b.HasOne("DrawAndGuess.Entities.Statistic", null)
                        .WithMany("Points")
                        .HasForeignKey("StatisticId");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Round", b =>
                {
                    b.HasOne("DrawAndGuess.Entities.Word", "CorrectWord")
                        .WithMany()
                        .HasForeignKey("CorrectWordWordId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DrawAndGuess.Entities.Game", null)
                        .WithMany("Rounds")
                        .HasForeignKey("GameId");

                    b.HasOne("DrawAndGuess.Entities.Lobby", "Lobby")
                        .WithMany()
                        .HasForeignKey("LobbyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CorrectWord");

                    b.Navigation("Lobby");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Role", b =>
                {
                    b.HasOne("DrawAndGuess.Entities.Player", null)
                        .WithMany("Roles")
                        .HasForeignKey("PlayerId");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Player", b =>
                {
                    b.HasOne("DrawAndGuess.Entities.Lobby", null)
                        .WithMany("Players")
                        .HasForeignKey("LobbyId");

                    b.HasOne("DrawAndGuess.Entities.Statistic", "Statistic")
                        .WithMany()
                        .HasForeignKey("StatisticId");

                    b.Navigation("Statistic");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Game", b =>
                {
                    b.Navigation("Rounds");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Lobby", b =>
                {
                    b.Navigation("Players");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Round", b =>
                {
                    b.Navigation("Guesses");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Statistic", b =>
                {
                    b.Navigation("Points");
                });

            modelBuilder.Entity("DrawAndGuess.Entities.Player", b =>
                {
                    b.Navigation("Roles");
                });
#pragma warning restore 612, 618
        }
    }
}
