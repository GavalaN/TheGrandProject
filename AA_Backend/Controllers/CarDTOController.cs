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
                        SellerId = k.SellerId,
                        Brand = k.Brand.Name,
                        Type_name = k.Type.TypeName,
                        KMClock = k.KmClock,
                        Price = k.Price,
                        Description = k.Description,
                        ccm = k.Cc,
                        hp = k.Horsepower,
                        fuel_type = k.FuelType,
                        Year = k.Year,
                        picId = k.Pictues.FirstOrDefault(x=>x.CarId==k.Id).Id


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
        [HttpPost("GetPage")]
        public IActionResult GetDTOPage(int page,int pagesize)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    List<CarDTO> CarDTOs = context.Cars.Select(k => new CarDTO()
                    {
                        Id = k.Id,
                        SellerId = k.SellerId,
                        Brand = k.Brand.Name,
                        Type_name = k.Type.TypeName,
                        KMClock = k.KmClock,
                        Price = k.Price,
                        Description = k.Description,
                        ccm = k.Cc,
                        hp = k.Horsepower,
                        fuel_type = k.FuelType,
                        Year = k.Year
                    }).Skip((page - 1) * pagesize).Take(pagesize).ToList();
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
