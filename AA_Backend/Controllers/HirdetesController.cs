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
        private readonly CarplaceContext _context;
        [HttpGet("GetHirdetesById")]
        public IActionResult GetHirdetesById(int id)
        {
            
                try
                {
                    HirdetesDTO Hirdetes = _context.Cars.Select(k => new HirdetesDTO()
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
        [HttpPut("PutHirdetes")]
        public async Task<IActionResult> PutHirdetes(HirdetesDTO hirdetes)
        {
            
                try
                {
                    var car = _context.Cars.FirstOrDefault(k => k.Id == hirdetes.Id);
                    if (car == null)
                    {
                        return BadRequest("Nem található a hirdetés!");
                    }
                    car.BrandId = _context.Brands.FirstOrDefaultAsync(b => b.Name == hirdetes.Brand).Id;
                    car.TypeId = _context.Types.FirstOrDefaultAsync(t => t.TypeName == hirdetes.Type_Name).Id;
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
                    await _context.SaveChangesAsync();
                    return Ok("Sikeres módosítás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            
        }
        /*[HttpPost("HirdetesPost")]
        public async Task<IActionResult>  HirdetesPost(HirdetesDTO hirdetes)
        {
            using (var _context = new CarplaceContext())
            {
                try
                {
                    if (_context.Cars.FirstOrDefault(k => k.Id == hirdetes.Id) != null)
                    {
                        return BadRequest("A hirdetés már létezik!");
                    }
                    Car car = new Car()
                    {
                        BrandId = _context.Brands.FirstOrDefaultAsync(b => b.Name == hirdetes.Brand).Id,
                        TypeId = _context.Types.FirstOrDefaultAsync(t => t.TypeName == hirdetes.Type_Name).Id,
                        KmClock = hirdetes.KMClock,
                        Price = hirdetes.Price,
                        Description = hirdetes.Description,
                        BodyType = hirdetes.BodyType,
                        ColorId = _context.Colors.FirstOrDefaultAsync(c => c.Name == hirdetes.Color).Id,
                        SellerId = _context.Users.FirstOrDefaultAsync(s => s.Username == hirdetes.Username).Id
                        
                    };
                    await _context.Cars.Add(car);
                    await _context.SaveChangesAsync();
                    return Ok("Sikeres hirdetésfeladás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }*/
        [HttpDelete("DeleteHirdetes")]
        public async Task<IActionResult> DeleteHirdetes(int id)
        {
            
                try
                {
                    var car = _context.Cars.FirstOrDefault(k => k.Id == id);
                    if (car == null)
                    {
                        return BadRequest("Nem található a hirdetés!");
                    }
                    _context.Cars.Remove(car);
                    await _context.SaveChangesAsync();
                    return Ok("Sikeres törlés!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            
        }
    }
}
