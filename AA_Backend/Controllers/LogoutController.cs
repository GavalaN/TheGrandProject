using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AA_Backend;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LogoutController : ControllerBase
    {
        
        [HttpPost]
        public IActionResult Logout(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                lock (Program.LoggedInUsers)
                {
                    Program.LoggedInUsers.Remove(token);
                }
                return Ok("Sikeres kijelentkezés!");
            }
            return NotFound("Nem található a felhasználó!");
        }
    }
}
