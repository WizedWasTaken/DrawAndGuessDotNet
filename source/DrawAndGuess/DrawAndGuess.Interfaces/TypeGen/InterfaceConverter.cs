using System.Text;

namespace DrawAndGuess.Interfaces.TypeGen
{
    public class InterfaceConverter
    {
        public string ConvertCSharpInterfaceToTypeScript(string interfaceName, string[] methods)
        {
            var sb = new StringBuilder();
            sb.AppendLine($"export interface {interfaceName} {{");

            foreach (var method in methods)
            {
                sb.AppendLine($"    {method};");
            }

            sb.AppendLine("}");
            return sb.ToString();
        }
    }
}