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
                    Car car2 = new Car()
                    {
                        Id = car.Id,
                        Description = "Sikeres hozzáadás!\nMost átnavigálunk a képfeltöltésre!"
                    };
                    return Ok(car2);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpPut("Put")]
        public async Task<IActionResult> Put(Car car,string token)
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
                            return Ok("Sikeres módosítás!\nMost átnavigálunk a képfeltöltésre!");

                        }
                        else
                        {
                            return BadRequest("Nem található a hirdetés!");
                        }

                    }
                    return StatusCode(401,"Nem vagy belépve");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    Car car = context.Cars.FirstOrDefault(k => k.Id == id);
                    return Ok(car);
                }
                catch (Exception ex)
                {
                    Car car = new Car()
                    {
                        Id = -1,
                        Description = ex.Message
                    };
                    return BadRequest(car);
                }
            }
        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id, string token)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    User user;
                    Program.LoggedInUsers.TryGetValue(token, out user);
                    
                    if (true)
                    {
                        var car = new Car() { Id = id };
                        if (context.Cars.Contains(car))
                        {
                            context.Cars.Remove(car);
                            await context.SaveChangesAsync();
                            return Ok("Sikeres törlés!");
                        }
                        else
                        {
                            return BadRequest("Nem található a hirdetés!");
                        }
                    }
                    return StatusCode(401, "Nem vagy belépve");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpPut("ToggleSold")]
        public async Task<IActionResult> ToggleSold(int id, string token)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    if (Program.LoggedInUsers.ContainsKey(token))
                    {
                        var car = context.Cars.FirstOrDefault(k => k.Id == id);
                        if (car != null)
                        {
                            car.Sold = !car.Sold;
                            context.Update(car);
                            await context.SaveChangesAsync();
                            return Ok("Sikeres módosítás!");
                        }
                        else
                        {
                            return BadRequest("Nem található a hirdetés!");
                        }
                    }
                    return StatusCode(401, "Nem vagy belépve");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }



    }
}
