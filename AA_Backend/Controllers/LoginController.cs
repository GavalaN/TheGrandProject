using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AA_Backend.Models;
using AA_Backend.Controllers;
using AA_Backend.DTOs;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly CarplaceContext _context;
        [HttpPost("GetSalt/{Username}")]
        public async Task<IActionResult> GetSalt(string Username)
        {
            
                try
                {
                    User response = await _context.Users.FirstOrDefaultAsync(u => u.Username == Username);
                    if (response == null)
                    {
                        return NotFound("Felhasználó név nem található!");
                    }
                    else
                    {
                        return Ok(response.Salt);
                    }
                }
                catch (Exception ex) 
                {
                    return BadRequest(ex.Message);
                }
            
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            
                try
                {
                    string hash = Program.CreateSHA256(loginDTO.TmpHash);
                    User response = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginDTO.LoginName && u.Hash == hash);
                    if (response != null)
                    {
                        string token = Guid.NewGuid().ToString();
                        lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(token, response);
                        }

                        return Ok(new LoggedInUsers()
                        {
                            Token = token,
                            Username = response.Username,
                            Email = response.Email
                        });
                    }
                    return NotFound("valami nem jó!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        
    }
}
