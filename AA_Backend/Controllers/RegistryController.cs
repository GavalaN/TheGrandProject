using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AA_Backend.Models;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost("Registry")]
        public async  Task<IActionResult> Registry(User user)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    if(context.Users.FirstOrDefault(u => u.Username == user.Username) != null)
                    {
                        return BadRequest("A felhasználónév már foglalt!");
                    }
                    else if (context.Users.FirstOrDefault(u => u.Email == user.Email) != null)
                    {
                        return BadRequest("Az email cím már foglalt!");
                    }
                    user.Created = DateTime.Now;
                    
                    user.IsAdmin = false;
                    user.Hash= Program.CreateSHA256(user.Hash);
                    await context.Users.AddAsync(user);
                    await context.SaveChangesAsync();
                    Program.SendEmail(user.Email, "Regisztráció", $"Nyomdd ki a szemét: \nhttp://localhost:7057/Registry?Username={user.Username}&email={user.Email}");
                    return Ok("Sikeres regisztráció! Az aktiváláshoz ellenőrizze az email fiókját!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet("Aktiválció")]
        public async Task<IActionResult> Activate(string Username, string email)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    var user = context.Users.FirstOrDefault(u => u.Username == Username && u.Email == email);
                    if (user == null)
                    {
                        return BadRequest("Sikertelen aktiválás.");
                    }
                    context.Users.Update(user);
                    await context.SaveChangesAsync();
                    return Ok("Sikeres aktiválás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
