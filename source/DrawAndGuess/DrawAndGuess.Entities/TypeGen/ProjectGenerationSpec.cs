using TypeGen.Core.SpecGeneration;

namespace DrawAndGuess.Entities.TypeGen
{
    public class ProjectGenerationSpec : GenerationSpec
    {
        public ProjectGenerationSpec()
        {
            AddClass<Role>();
            AddClass<Game>();
            AddClass<Guess>();
            AddClass<Lobby>();
            AddEnum<LobbyStatus>();
            AddClass<Player>();
            AddClass<Point>();
            AddEnum<Points>();
            AddClass<Round>();
            AddClass<Statistic>();
            AddClass<Word>();
            AddEnum<WordDifficulty>();
        }
    }
}