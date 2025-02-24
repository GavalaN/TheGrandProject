using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly CarplaceContext _context;
        [HttpGet("GetColor")]
        public IActionResult GetColor()
        {
            
                try
                {
                    List<Color> list = _context.Colors.ToList();
                    return Ok(list);
                }
                catch (Exception ex)
                {
                    List<Color> list = new List<Color>();
                    Color color = new()
                    {
                        Id = -1,
                        Name = ex.Message
                    };
                    list.Add(color);
                    return BadRequest(list);
                }
            
        }
    }
}
