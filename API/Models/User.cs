using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class User
    {
        public int id { get; set; }
        public string nome {get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string senha { get; set; } = string.Empty;
        public string role { get; set; } = string.Empty;
    }

}