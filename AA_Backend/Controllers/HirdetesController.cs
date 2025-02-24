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
                        KWeight = k.KWeight



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
                    car.BrandId = context.Brands.FirstOrDefaultAsync(b => b.Name == hirdetes.Brand).Id;
                    car.TypeId = context.Types.FirstOrDefaultAsync(t => t.TypeName == hirdetes.Type_Name).Id;
                    car.KmClock = hirdetes.KMClock;
                    car.Price = hirdetes.Price;
                    car.Description = hirdetes.Description;
                    car.Cc = hirdetes.Ccm;
                    car.Horsepower = hirdetes.Hp;
                    car.FuelType = hirdetes.Fuel_Type;
                    car.Year = hirdetes.Year;
                    car.Seller.Username = hirdetes.Username;
                    car.Seller.PhoneNum = hirdetes.PhoneNum;
                    car.Seller.Email = hirdetes.Email;
                    car.Drive = hirdetes.Drive;
                    car.Color.Name = hirdetes.Color;
                    car.TransType = hirdetes.TransType;
                    car.EngineType = hirdetes.EngineType;
                    car.NumOfCyl = hirdetes.NumofCylinders;
                    car.BodyType = hirdetes.BodyType;
                    car.KWeight = hirdetes.KWeight;
                    await context.SaveChangesAsync();
                    return Ok("Sikeres módosítás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
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
            using (var context = new CarplaceContext())
            {
                try
                {
                    var car = context.Cars.FirstOrDefault(k => k.Id == id);
                    if (car == null)
                    {
                        return BadRequest("Nem található a hirdetés!");
                    }
                    context.Cars.Remove(car);
                    await context.SaveChangesAsync();
                    return Ok("Sikeres törlés!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
