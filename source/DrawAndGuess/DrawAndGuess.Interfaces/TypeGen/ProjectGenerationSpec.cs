using DrawAndGuess.Interfaces;
using TypeGen.Core.SpecGeneration;

namespace DrawAndGuess.Interfaces.TypeGen
{
    public class ProjectGenerationSpec : GenerationSpec
    {
        public ProjectGenerationSpec()
        {
            AddInterface<ILobbyHub>();
        }
    }
}