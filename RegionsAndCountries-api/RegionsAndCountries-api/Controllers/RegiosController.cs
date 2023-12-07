using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RegionsAndCountries_api.Data;
using RegionsAndCountries_api.Models;

namespace RegionsAndCountries_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegiosController : Controller
    {
        private readonly RandCContext _context;

        public RegiosController(RandCContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
              return _context.Regios != null ? 
                          Ok(await _context.Regios.ToListAsync()) :
                          Problem("Entity set 'RandCContext.Regios'  is null.");
        }

        //public async Task<IActionResult> Details(int? id)
        //{
        //    if (id == null || _context.Regios == null)
        //    {
        //        return NotFound();
        //    }

        //    var regio = await _context.Regios
        //        .FirstOrDefaultAsync(m => m.Regid == id);
        //    if (regio == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(regio);
        //}

        [HttpPost("Create")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromForm] Regio regio)
        {
            if (ModelState.IsValid)
            {
                _context.Add(regio);
                await _context.SaveChangesAsync();
                return Ok(regio);
            }
            return BadRequest(regio);
        }

        [HttpPut("Update")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Update([FromForm] Regio regio)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(regio);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RegioExists(regio.Regid))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok(regio);
            }
            return BadRequest(regio);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] int[] regIds)
        {
            try
            {
                if (regIds == null || regIds.Length == 0)
                {
                    return BadRequest("Nincs érvényes törlendő azonosító.");
                }

                foreach (var regId in regIds)
                {
                    var regio = await _context.Regios.FindAsync(regId);
                    if (regio != null)
                    {
                        _context.Regios.Remove(regio);
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Sikeres törlés." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Hiba történt a törlés során: {ex.Message}");
            }
        }

        private bool RegioExists(int id)
        {
          return (_context.Regios?.Any(e => e.Regid == id)).GetValueOrDefault();
        }
    }
}
