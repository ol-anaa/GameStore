using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoEscola_API.Data;
using ProjetoEscola_API.Models;

namespace ProjetoEscola_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase

    {
        private EscolaContext _context;
        public UsuarioController(EscolaContext context)
        {
            // construtor
            _context = context;
        }
        [HttpGet]
        public ActionResult<List<User>> GetAll()
        {
            return _context.Usuario.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<List<User>> Get(int id)
        {
            try
            {
                var result = _context.Usuario.Find(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(User model)
        {
            try
            {
                _context.Usuario.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Usuario/{model.id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> delete(int id)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var Usuario = await _context.Usuario.FindAsync(id);
                if (Usuario == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Usuario);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> put(int id, User dadosUsuarioAlt)
        {
            try
            {
                var result = await _context.Usuario.FindAsync(id);
                if (id != result.id)
                {
                    return BadRequest();
                }
                result.id = dadosUsuarioAlt.id;
                result.nome = dadosUsuarioAlt.nome;
                result.email = dadosUsuarioAlt.email;
                result.senha = dadosUsuarioAlt.senha;
                result.role = dadosUsuarioAlt.role;
                await _context.SaveChangesAsync();
                return Created($"/api/Usuario/{dadosUsuarioAlt.id}", dadosUsuarioAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}