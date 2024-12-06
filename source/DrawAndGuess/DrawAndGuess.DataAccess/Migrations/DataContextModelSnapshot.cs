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

            modelBuilder.Entity("DrawAndGuess.Entities.Admin", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("AdminId"));

                    b.Property<int>("UserPlayerId")
                        .HasColumnType("integer");

                    b.HasKey("AdminId");

                    b.HasIndex("UserPlayerId");

                    b.ToTable("Admins");
                });

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

                    b.Property<int>("GuessedByPlayerId")
                        .HasColumnType("integer");

                    b.Property<int?>("RoundId")
                        .HasColumnType("integer");

                    b.Property<WordDifficulty>("WordDifficulty")
                        .HasColumnType("\"wordDifficulty\"");

                    b.HasKey("GuessId");

                    b.HasIndex("GuessedByPlayerId");

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

            modelBuilder.Entity("DrawAndGuess.Entities.Player", b =>
                {
                    b.Property<int>("PlayerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("PlayerId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("LobbyId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("StatisticId")
                        .HasColumnType("integer");

                    b.HasKey("PlayerId");

                    b.HasIndex("LobbyId");

                    b.HasIndex("StatisticId");

                    b.ToTable("Players");
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

            modelBuilder.Entity("DrawAndGuess.Entities.Admin", b =>
                {
                    b.HasOne("DrawAndGuess.Entities.Player", "User")
                        .WithMany()
                        .HasForeignKey("UserPlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
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
                        .HasForeignKey("GuessedByPlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DrawAndGuess.Entities.Round", null)
                        .WithMany("Guesses")
                        .HasForeignKey("RoundId");

                    b.Navigation("GuessedBy");
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
#pragma warning restore 612, 618
        }
    }
}
