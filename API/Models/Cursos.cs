using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Curso
    {
        public int id { get; set; }

        [Required]
        public int codCurso { get; set; }

        [Required]
        [StringLength(30)]
        public string? nomeCurso { get; set; }

        [Required]
        [StringLength(1)]
        public string? periodo { get; set; }
    }
}