using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Aluno
    {
        public int id { get; set; }

        [Required]
        [StringLength(5)]
        public string? ra { get; set; }

        [Required]
        [StringLength(30)]
        public string? nome { get; set; }

        [Required]
        public int codCurso { get; set; }
    }
}