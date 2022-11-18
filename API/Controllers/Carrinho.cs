/*using System.Collections.Generic;
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
    public class carrinhoController : ControllerBase

    {
        private EscolaContext _context;
        public carrinhoController(EscolaContext context)
        {
            // construtor
            _context = context;
        }
        [HttpGet]
        public ActionResult<List<Carrinho>> GetAll()
        {
            return _context.carrinho.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<List<Carrinho>> Get(int id)
        {
            try
            {
                var result = _context.carrinho.Find(id);
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
        public async Task<ActionResult> post(Carrinho model)
        {
            try
            {
                _context.carrinho.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/carrinho/{model.id}", model);
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
                var carrinho = await _context.carrinho.FindAsync(id);
                if (carrinho == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(carrinho);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> put(int id, Carrinho dadoscarrinhoAlt)
        {
            try
            {
                var result = await _context.carrinho.FindAsync(id);
                if (id != result.id)
                {
                    return BadRequest();
                }
                result.id = dadoscarrinhoAlt.id;
                result.nome = dadoscarrinhoAlt.nome;
                result.email = dadoscarrinhoAlt.email;
                result.senha = dadoscarrinhoAlt.senha;
                result.role = dadoscarrinhoAlt.role;
                await _context.SaveChangesAsync();
                return Created($"/api/carrinho/{dadoscarrinhoAlt.id}", dadoscarrinhoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}
*/