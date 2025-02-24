using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class CarController : ControllerBase
    {
        private readonly CarplaceContext _context;


        [HttpPost("Add")]
        public async Task<IActionResult> Add(Car car)
        {
            
                try
                {
                    await _context.Cars.AddAsync(car);
                    await _context.SaveChangesAsync();
                    return Ok("Sikeres hozzáadás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            
        }



    }
}
