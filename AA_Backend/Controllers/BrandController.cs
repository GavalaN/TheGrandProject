using AA_Backend.DTOs;
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
        private readonly CarplaceContext _context;
        [HttpGet("BrandGet")]
        public IActionResult GetBrand()
        {
            
                try
                {
                    List<Brand> list = _context.Brands.ToList();
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

        [HttpGet("GetTypeByBrand")]
        public IActionResult GetTypeByBrand(int id)
        {
           
                try
                {
                    List<TypeDTO> types = _context.Types.Where(t => t.BrandId == id).Select(k => new TypeDTO()
                    {
                        Id = k.Id,
                        TypeName = k.TypeName
                    }).ToList();
                    return Ok(types);
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
