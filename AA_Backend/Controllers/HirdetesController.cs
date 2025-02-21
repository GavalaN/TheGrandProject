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
        [HttpPut("PutHirdetes")]
        public async Task<IActionResult> PutHirdetes(HirdetesDTO hirdetes)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    var car = context.Cars.FirstOrDefault(k => k.Id == hirdetes.Id);
                    if (car == null)
                    {
                        return BadRequest("Nem található a hirdetés!");
                    }
                    car.BrandId = context.Brands.FirstOrDefault(b => b.Name == hirdetes.Brand).Id;
                    car.TypeId = context.Types.FirstOrDefault(t => t.TypeName == hirdetes.Type_Name).Id;
                    car.KmClock = hirdetes.KMClock;
                    car.Price = hirdetes.Price;
                    car.Description = hirdetes.Description;
                    car.Type.Motor.Cc = hirdetes.Ccm;
                    car.Type.Motor.Horsepower = hirdetes.Hp;
                    car.Type.Motor.FuelType = hirdetes.Fuel_Type;
                    car.Type.Year = hirdetes.Year;
                    car.Seller.Username = hirdetes.Username;
                    car.Seller.PhoneNum = hirdetes.PhoneNum;
                    car.Seller.Email = hirdetes.Email;
                    car.Type.Drive = hirdetes.Drive;
                    car.Color.Name = hirdetes.Color;
                    car.Type.TransType = hirdetes.TransType;
                    car.Type.Motor.EngineType = hirdetes.EngineType;
                    car.Type.Motor.NumOfCyl = hirdetes.NumofCylinders;
                    car.BodyType = hirdetes.BodyType;
                    car.Type.KWeight = hirdetes.KWeight;
                    await context.SaveChangesAsync();
                    return Ok("Sikeres módosítás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpPost("HirdetesPost")]
        public async Task<IActionResult>  HirdetesPost(HirdetesDTO hirdetes)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    if (context.Cars.FirstOrDefault(k => k.Id == hirdetes.Id) != null)
                    {
                        return BadRequest("A hirdetés már létezik!");
                    }
                    Car car = new Car()
                    {
                        BrandId = context.Brands.FirstOrDefault(b => b.Name == hirdetes.Brand).Id,
                        TypeId = context.Types.FirstOrDefault(t => t.TypeName == hirdetes.Type_Name).Id,
                        KmClock = hirdetes.KMClock,
                        Price = hirdetes.Price,
                        Description = hirdetes.Description,
                        BodyType = hirdetes.BodyType,
                        ColorId = context.Colors.FirstOrDefault(c => c.Name == hirdetes.Color).Id,
                        SellerId = context.Users.FirstOrDefault(s => s.Username == hirdetes.Username).Id
                    };
                    context.Cars.Add(car);
                    await context.SaveChangesAsync();
                    return Ok("Sikeres hirdetésfeladás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

    }
}
