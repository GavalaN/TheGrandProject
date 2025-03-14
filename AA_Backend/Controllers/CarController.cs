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
        public async Task<IActionResult> Add(Car car,string token)
        {

            using (var context = new CarplaceContext())
            {
                try
                {
                    if (!Program.LoggedInUsers.ContainsKey(token))
                    {
                        return StatusCode(401);
                    }
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
        [HttpPut("Post")]
        public async Task<IActionResult> Post(Car car,string token)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    if (Program.LoggedInUsers.ContainsKey(token))
                    {
                        if (context.Cars.Contains(car))
                        {
                            context.Update(car);
                            await context.SaveChangesAsync();
                            return Ok("Sikeres módosítás!");

                        }
                        else
                        {
                            return BadRequest("Nem található a hirdetés!");
                        }

                    }
                    return StatusCode(401);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }



    }
}
