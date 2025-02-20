using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AA_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        [HttpGet("GetColor")]
        public IActionResult GetColor()
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    List<Color> list = context.Colors.ToList();
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
}
