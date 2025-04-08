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

        [HttpGet("GetTypeByBrand")]
        public IActionResult GetTypeByBrand(int id)
        {
            using (var context = new CarplaceContext())
            {
                {
                    try
                    {
                        List<TypeDTO> types = context.Types.Where(t => t.BrandId == id).Select(k => new TypeDTO()
                        {
                            Id = k.Id,
                            TypeName = k.TypeName
                        }).ToList();
                        return Ok(types);
                    }
                    catch (Exception ex)
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
        }
        [HttpPost("AddBrandAdmin")]
        public async Task<IActionResult> AddBrandAdmin(Brand brand, string token)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    Program.LoggedInUsers.TryGetValue(token, out var user);

                    if (!Program.LoggedInUsers.ContainsKey(token)||user.IsAdmin==false)
                    {
                        return StatusCode(401,"Nem vagy bejelentkezve vagy nincs megfelelő jogosultságod");
                    }
                    if (context.Brands.Any(b => b.Id == brand.Id) == false)
                    {
                        return BadRequest("Ez a márka nem létezik!");
                    }
                    await context.Brands.AddAsync(brand);
                    await context.SaveChangesAsync();
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

