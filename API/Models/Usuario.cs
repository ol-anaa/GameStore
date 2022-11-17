using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Usuario
    {
        public int id_usuario { get; set; }
        public string? nome {get; set; }
        public string? email { get; set; }
        public int? senha { get; set; }
    }
}