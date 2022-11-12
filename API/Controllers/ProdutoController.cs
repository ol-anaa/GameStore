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
    public class ProdutoController : ControllerBase

    {
        private EscolaContext _context;
        public ProdutoController(EscolaContext context)
        {
            // construtor
            _context = context;
        }
        [HttpGet]
        public ActionResult<List<Produto>> GetAll()
        {
            return _context.Produto.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<List<Produto>> Get(int id)
        {
            try
            {
                var result = _context.Produto.Find(id);
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
        public async Task<ActionResult> post(Produto model)
        {
            try
            {
                _context.Produto.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/produto/{model.id}", model);
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
                var Produto = await _context.Produto.FindAsync(id);
                if (Produto == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Produto);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> put(int id, Produto dadosProdutoAlt)
        {
            try
            {
                //verifica se existe aluno a ser alterado
                var result = await _context.Produto.FindAsync(id);
                if (id != result.id)
                {
                    return BadRequest();
                }
                result.id = dadosProdutoAlt.id;
                result.nome = dadosProdutoAlt.nome;
                result.valor = dadosProdutoAlt.valor;
                result.descricao = dadosProdutoAlt.descricao;
                await _context.SaveChangesAsync();
                return Created($"/api/produto/{dadosProdutoAlt.id}", dadosProdutoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}