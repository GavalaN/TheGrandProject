using AA_Backend.DTOs;
using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TypeController : ControllerBase
    {
        [HttpPost("AddTypeAdmin")]
        public IActionResult AddTypeAdmin(AA_Backend.Models.Type type, string token)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    if (context.Types.Any(t => t.TypeName == type.TypeName ))
                    {
                        return BadRequest("Ez a típus már létezik!");
                    }

                    Program.LoggedInUsers.TryGetValue(token, out var user);

                    if (!Program.LoggedInUsers.ContainsKey(token) || user.IsAdmin == false)
                    {
                        return StatusCode(401, "Nem vagy bejelentkezve vagy nincs megfelelő jogosultságod");
                    }
                    context.Types.Add(type);
                    context.SaveChanges();
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
