using AA_Backend.DTOs;
using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                        Ccm = k.Type.Motor.Cc,
                        Hp = k.Type.Motor.Horsepower,
                        Fuel_Type = k.Type.Motor.FuelType,
                        Year = k.Type.Year,
                        Username = k.Seller.Username,
                        PhoneNum = k.Seller.PhoneNum,
                        Email = k.Seller.Email,
                        Drive = k.Type.Drive,
                        Color = k.Color.Name,
                        TransType= k.Type.TransType,
                        EngineType=k.Type.Motor.EngineType,
                        NumofCylinders=k.Type.Motor.NumOfCyl,
                        BodyType=k.BodyType,
                        KWeight = k.Type.KWeight



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
