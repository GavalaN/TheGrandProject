using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        [HttpGet("BrandGet")]
        public IActionResult GetBrand()
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    List<Brand> list = context.Brands.ToList();
                    return Ok(list);
                }
                catch (Exception ex)
                {
                    List<Brand> list = new  List<Brand>();
                    Brand brand = new()
                    {
                        Id = -1,
                        Name= ex.Message
                    };
                    list.Add(brand);
                    return BadRequest(list);
                }



            }
        }

        [HttpGet("GetBrandById")]
        public IActionResult GetTypeByBrand(int id)
        {
            using(var context = new CarplaceContext())
            {
                try
                {
                     List<Models.Type> types= context.Types.Where(t => t.BrandId == id).ToList();
                    return Ok();
                }
                catch ( Exception ex)
                {
                    List<Brand> list = new List<Brand>();
                    Brand brand = new()
                    {
                        Id = -1,
                        Name = ex.Message
                    };
                    list.Add(brand);
                    return BadRequest(list);
                }
            }   
        }

        /*[HttpPost]
        public IActionResult Post(Brand brand)
        {
            
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            return Ok();
        }*/
    }
}
