using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class CarController : ControllerBase
    {
        

        [HttpPost("Add")]
        public async Task<IActionResult> Add(Car car)
        {

            using (var context = new CarplaceContext())
            {
                try
                {
                    car.UploadDate = DateTime.Now;
                    car.Sold = false;
                    await context.Cars.AddAsync(car);
                    await context.SaveChangesAsync();
                    return Ok("Sikeres hozzáadás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }



    }
}
