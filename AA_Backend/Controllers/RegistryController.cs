using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AA_Backend.Models;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        private readonly CarplaceContext _context;
        [HttpPost("Registry")]
        public async  Task<IActionResult> Registry(User user)
        {
            
                try
                {
                    if(_context.Users.FirstOrDefault(u => u.Username == user.Username) != null)
                    {
                        return BadRequest("A felhasználónév már foglalt!");
                    }
                    else if (_context.Users.FirstOrDefault(u => u.Email == user.Email) != null)
                    {
                        return BadRequest("Az email cím már foglalt!");
                    }
                    user.Created = DateTime.Now;
                    user.IsActive = 0;
                    user.IsAdmin = false;
                    user.Hash= Program.CreateSHA256(user.Hash);
                    await _context.Users.AddAsync(user);
                    await _context.SaveChangesAsync();
                    Program.SendEmail(user.Email, "Regisztráció", $"Nyomdd ki a szemét: \nhttp://localhost:5000/Registry/Activation?Username={user.Username}&email={user.Email}");
                    return Ok("Sikeres regisztráció! Az aktiváláshoz ellenőrizze az email fiókját!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            
        }
        [HttpGet("GenerateSalt")]
        public IActionResult GenerateSalt()
        { 
            return Ok(Program.GenerateSalt());
        }
        [HttpGet("Activation")]
        public async Task<IActionResult> Activate(string Username, string email)
        {
            
                try
                {
                    var user = _context.Users.FirstOrDefault(u => u.Username == Username && u.Email == email);
                    if (user == null)
                    {
                        return BadRequest("Sikertelen aktiválás.");
                    }
                    user.IsActive = 1;
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                    return Ok("Sikeres aktiválás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            
        }
        [HttpPut("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
              try
                {
                    var user = _context.Users.FirstOrDefault(u => u.Email == email);
                    if (user == null)
                    {
                        return BadRequest("Nem található felhasználó ezzel az email címmel!");
                    }
                    string newPass = Program.GenerateSalt();
                    user.Hash = Program.CreateSHA256(newPass);
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                    Program.SendEmail(email, "Elfelejtett jelszó", $"Az új jelszavad: {newPass}");
                    return Ok("Az új jelszót elküldtük az email címére!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            
        }
    }
}
