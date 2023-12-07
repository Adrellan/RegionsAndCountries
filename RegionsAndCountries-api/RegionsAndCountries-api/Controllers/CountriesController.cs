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
    public class CountriesController : Controller
    {
        private readonly RandCContext _context;

        public CountriesController(RandCContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var workers = await _context.Countries.ToListAsync();
            return Ok(workers);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm] Country country)
        {
            if (ModelState.IsValid)
            {
                await _context.Countries.AddAsync(country);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Sikeres létrehozás." });
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorMessage = string.Join(", ", errors); 

                return BadRequest(new { errors = errorMessage });
            }
        }


        [HttpPut("Update")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Update([FromForm] Country country)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(country);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CountryExists(country.Ctyid))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok(country);
            }
            return BadRequest(country);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] string[] ctyIds)
        {
            try
            {
                if (ctyIds == null || ctyIds.Length == 0)
                {
                    return BadRequest("Nincs érvényes törlendő azonosító.");
                }

                foreach (var ctyId in ctyIds)
                {
                    var country = await _context.Countries.FindAsync(ctyId);
                    if (country != null)
                    {
                        _context.Countries.Remove(country);
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

        private bool CountryExists(string id)
        {
            return (_context.Countries?.Any(e => e.Ctyid == id)).GetValueOrDefault();
        }
    }
}
