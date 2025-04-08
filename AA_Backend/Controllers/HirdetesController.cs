using AA_Backend.DTOs;
using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class HirdetesController : ControllerBase
    {
        

        [HttpGet("GetHirdetesById")]
        public IActionResult GetHirdetesById(int id)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    HirdetesDTO Hirdetes = context.Cars.Select(k => new HirdetesDTO()
                    {
                        Id = k.Id,
                        Brand = k.Brand.Name,
                        Type_Name = k.Type.TypeName,
                        KMClock = k.KmClock,
                        Price = k.Price,
                        Description = k.Description,
                        Ccm = k.Cc,
                        Hp = k.Horsepower,
                        Fuel_Type = k.FuelType,
                        Year = k.Year,
                        Username = k.Seller.Username,
                        PhoneNum = k.Seller.PhoneNum,
                        Email = k.Seller.Email,
                        Drive = k.Drive,
                        Color = k.Color.Name,
                        TransType = k.TransType,
                        EngineType = k.EngineType,
                        NumofCylinders = k.NumOfCyl,
                        BodyType = k.BodyType,
                        KWeight = k.KWeight,
                        Hexcode = k.Color.Hexcode,
                        Sold = k.Sold



                    }).FirstOrDefault(k => k.Id == id);

                    return Ok(Hirdetes);
                }
                catch (Exception ex)
                {
                    List<HirdetesDTO> list = new List<HirdetesDTO>();
                    HirdetesDTO hirdetes = new()
                    {
                        Id = -1,
                        Description = ex.Message
                    };
                    list.Add(hirdetes);
                    return BadRequest(list);
                }
            }
        }
        
       
    }
}
