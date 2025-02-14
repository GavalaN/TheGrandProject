using AA_Backend.DTOs;
using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CarDTOController : ControllerBase
    {
        [HttpGet("GetAll")]
        public IActionResult GetDTOAll()
        {
            using (var context = new CarplaceContext())
            {
                
                try
                {
                    List<CarDTO> CarDTOs = context.Cars.Select(k => new CarDTO()
                    {
                        Id = k.Id,
                        Brand=k.Brand.Name,
                        Type_name=k.Type.TypeName,
                        KMClock=k.KmClock,
                        Price=k.Price,
                        Description=k.Description,
                        ccm=k.Type.Motor.Cc,
                        hp=k.Type.Motor.Horsepower,
                        fuel_type=k.Type.Motor.FuelType,
                        Year=k.Type.Year


                    }).ToList();
                    return Ok(CarDTOs);
                
                }
                catch (Exception ex)
                {
                    List<CarDTO> list = new List<CarDTO>();
                    CarDTO car = new()
                    {
                        Id = 1,
                        Description = ex.Message
                    };
                    list.Add(car);
                    return BadRequest(list);
                }
            }
        }
    }
}
