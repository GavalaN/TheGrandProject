using AA_Backend.DTOs;
using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        



        [HttpGet("GetUserListings")]
        public IActionResult GetUserListings(int userid)
        {
            using (var context = new CarplaceContext())
            {
                try
                {

                    var listings = context.Cars
                        .Where(l => l.SellerId == userid)
                        .Select(k => new CarDTO()
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
                            Pathname = k.Pictues.FirstOrDefault().FilePath

                        }).ToList();

                    if (listings.Any())
                    {
                        return Ok(listings);
                    }
                    else
                    {
                        List<CarDTO> carDTOs = new List<CarDTO>();
                        CarDTO car = new()
                        {
                            Id = -1,
                            Description = "No listings found"
                        };
                        carDTOs.Add(car);
                        return NotFound(carDTOs);
                    }

                }
                catch (Exception ex)
                {
                    List<CarDTO> carDTOs = new List<CarDTO>();
                    CarDTO car = new()
                    {
                        Id = -1,
                        Description = ex.Message
                    };
                    carDTOs.Add(car);
                    return BadRequest(carDTOs);
                }
            }
        }
    }
}
