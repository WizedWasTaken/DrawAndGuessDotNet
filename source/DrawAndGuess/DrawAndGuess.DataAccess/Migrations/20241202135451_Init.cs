using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DrawAndGuess.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:points", "one,three,two")
                .Annotation("Npgsql:Enum:wordDifficulty", "easy,hard,medium");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
