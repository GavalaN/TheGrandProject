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
                    if (context.Users.FirstOrDefault(u => u.Username == user.Username) != null)
                    {
                        return BadRequest("A felhasználónév már foglalt!");
                    }
                    else if (context.Users.FirstOrDefault(u => u.Email == user.Email) != null)
                    {
                        return BadRequest("Az email cím már foglalt!");
                    }
                    user.Created = DateTime.Now;
                    user.IsActive = 0;
                    user.IsAdmin = false;
                    user.Hash = Program.CreateSHA256(user.Hash);
                    await context.Users.AddAsync(user);
                    await context.SaveChangesAsync();
                    Program.SendEmail(user.Email, "Regisztráció", $"Nyomdd ki a szemét: \nhttp://localhost:5000/Registry/Activation?Username={user.Username}&email={user.Email}");
                    return Ok("Sikeres regisztráció! Az aktiváláshoz ellenőrizze az email fiókját!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
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
            using (var context = new CarplaceContext())
            {
                try
                {
                    var user = context.Users.FirstOrDefault(u => u.Username == Username && u.Email == email);
                    if (user == null)
                    {
                        return BadRequest("Sikertelen aktiválás.");
                    }
                    user.IsActive = 1;
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
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    var user = context.Users.FirstOrDefault(u => u.Email == email);
                    if (user == null)
                    {
                        return BadRequest("Nem található felhasználó ezzel az email címmel!");
                    }

                    // Generate a secure token (e.g., using GUID or a cryptographic library)
                    var token = Guid.NewGuid().ToString();

                    // Store the token in the database with an expiration time
                    user.ResetPasswordToken = token;
                    user.ResetPasswordTokenExpiry = DateTime.UtcNow.AddHours(1); // Token expires in 1 hour
                    context.Users.Update(user);
                    await context.SaveChangesAsync();

                    // Send the reset link with the token
                    var resetLink = $"http://localhost:3000/{email}/{token}";
                    Program.SendEmail(email, "Elfelejtett jelszó", $"Az új jelszavad itt adhatod meg:\n{resetLink}");

                    return Ok("Az új jelszót elküldtük az email címére!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpPost("PasswordModify")]
        public async Task<IActionResult> PasswordModify(string email, string token, string newPassword,string SALT)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    var user = context.Users.FirstOrDefault(u => u.Email == email);
                    if (user == null)
                    {
                        return BadRequest("Nem található felhasználó ezzel az email címmel!");
                    }

                    // Validate the token
                    if (user.ResetPasswordToken != token || user.ResetPasswordTokenExpiry < DateTime.UtcNow)
                    {
                        return BadRequest("Érvénytelen vagy lejárt token!");
                    }

                    // Update the password
                    user.Hash = Program.CreateSHA256(newPassword);
                    user.Salt = SALT;

                    // Clear the reset token
                    user.ResetPasswordToken = null;
                    user.ResetPasswordTokenExpiry = null;

                    context.Users.Update(user);
                    await context.SaveChangesAsync();

                    return Ok("Sikeres jelszó módosítás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
