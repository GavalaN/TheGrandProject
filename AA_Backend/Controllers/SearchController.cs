using AA_Backend.DTOs;
using AA_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        [HttpPost("GigaSearch")]
        public IActionResult Search(SearchDTO search, int page, int pagesize)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    var query = context.Cars.AsQueryable();

                    // Apply filters (unchanged)
                    if (search.BrandId != 0)
                        query = query.Where(b => b.BrandId == search.BrandId);

                    if (search.TypeId != 0)
                        query = query.Where(t => t.TypeId == search.TypeId);

                    if (search.BodyType != null)
                        query = query.Where(b => b.BodyType == search.BodyType);

                    if (search.FuelType != null)
                        query = query.Where(f => f.FuelType == search.FuelType);

                    if (search.YearMin != 0 && search.YearMax != 0)
                        query = query.Where(y => y.Year >= search.YearMin && y.Year <= search.YearMax);
                    else if (search.YearMin != 0)
                        query = query.Where(y => y.Year >= search.YearMin);
                    else if (search.YearMax != 0)
                        query = query.Where(y => y.Year <= search.YearMax);

                    if (search.PriceMin != 0 && search.PriceMax != 0)
                        query = query.Where(p => p.Price >= search.PriceMin && p.Price <= search.PriceMax);
                    else if (search.PriceMin != 0)
                        query = query.Where(p => p.Price >= search.PriceMin);
                    else if (search.PriceMax != 0)
                        query = query.Where(p => p.Price <= search.PriceMax);

                    if (search.KMClockMin != 0 && search.KMClockMax != 0)
                        query = query.Where(k => k.KmClock >= search.KMClockMin && k.KmClock <= search.KMClockMax);
                    else if (search.KMClockMin != 0)
                        query = query.Where(k => k.KmClock >= search.KMClockMin);
                    else if (search.KMClockMax != 0)
                        query = query.Where(k => k.KmClock <= search.KMClockMax);

                    if (search.ColorId != 0)
                        query = query.Where(c => c.ColorId == search.ColorId);

                    if (search.CcMin != 0 && search.CcMax != 0)
                        query = query.Where(cc => cc.Cc >= search.CcMin && cc.Cc <= search.CcMax);
                    else if (search.CcMin != 0)
                        query = query.Where(cc => cc.Cc >= search.CcMin);
                    else if (search.CcMax != 0)
                        query = query.Where(cc => cc.Cc <= search.CcMax);

                    if (search.HpMin != 0 && search.HpMax != 0)
                        query = query.Where(h => h.Horsepower >= search.HpMin && h.Horsepower <= search.HpMax);
                    else if (search.HpMin != 0)
                        query = query.Where(h => h.Horsepower >= search.HpMin);
                    else if (search.HpMax != 0)
                        query = query.Where(h => h.Horsepower <= search.HpMax);

                    if (search.NumOfCyl != 0)
                        query = query.Where(n => n.NumOfCyl == search.NumOfCyl);

                    if (search.EngineType != null)
                        query = query.Where(e => e.EngineType == search.EngineType);

                    if (search.Drive != null)
                        query = query.Where(d => d.Drive == search.Drive);

                    if (search.TransType != null)
                        query = query.Where(tr => tr.TransType == search.TransType);

                    if (search.KWeightMin != 0 && search.KWeightMax != 0)
                        query = query.Where(kw => kw.KWeight >= search.KWeightMin && kw.KWeight <= search.KWeightMax);
                    else if (search.KWeightMin != 0)
                        query = query.Where(kw => kw.KWeight >= search.KWeightMin);
                    else if (search.KWeightMax != 0)
                        query = query.Where(kw => kw.KWeight <= search.KWeightMax);

                    // Project the results into CarDTO
                    var response = query.Select(car => new CarDTO
                    {
                        Id = car.Id,
                        SellerId = car.SellerId,
                        Type_name = car.Type.TypeName,
                        Brand = car.Brand.Name,
                        KMClock = car.KmClock,
                        Price = car.Price,
                        Description = car.Description,
                        Year = car.Year,
                        fuel_type = car.FuelType,
                        ccm = car.Cc,
                        hp = car.Horsepower,
                        Pathname = car.Pictues.FirstOrDefault(x => x.CarId == car.Id).FilePath,
                        Sold = car.Sold
                    }).Skip((page - 1) * pagesize).Take(pagesize).ToList();

                    return Ok(response);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }



        }
        [HttpPost("GetSearchSize")]
        public IActionResult GetSearchSize(SearchDTO search)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    var query = context.Cars.AsQueryable();

                    // Apply filters (unchanged)
                    if (search.BrandId != 0)
                        query = query.Where(b => b.BrandId == search.BrandId);

                    if (search.TypeId != 0)
                        query = query.Where(t => t.TypeId == search.TypeId);

                    if (search.BodyType != null)
                        query = query.Where(b => b.BodyType == search.BodyType);

                    if (search.FuelType != null)
                        query = query.Where(f => f.FuelType == search.FuelType);

                    if (search.YearMin != 0 && search.YearMax != 0)
                        query = query.Where(y => y.Year >= search.YearMin && y.Year <= search.YearMax);
                    else if (search.YearMin != 0)
                        query = query.Where(y => y.Year >= search.YearMin);
                    else if (search.YearMax != 0)
                        query = query.Where(y => y.Year <= search.YearMax);

                    if (search.PriceMin != 0 && search.PriceMax != 0)
                        query = query.Where(p => p.Price >= search.PriceMin && p.Price <= search.PriceMax);
                    else if (search.PriceMin != 0)
                        query = query.Where(p => p.Price >= search.PriceMin);
                    else if (search.PriceMax != 0)
                        query = query.Where(p => p.Price <= search.PriceMax);

                    if (search.KMClockMin != 0 && search.KMClockMax != 0)
                        query = query.Where(k => k.KmClock >= search.KMClockMin && k.KmClock <= search.KMClockMax);
                    else if (search.KMClockMin != 0)
                        query = query.Where(k => k.KmClock >= search.KMClockMin);
                    else if (search.KMClockMax != 0)
                        query = query.Where(k => k.KmClock <= search.KMClockMax);

                    if (search.ColorId != 0)
                        query = query.Where(c => c.ColorId == search.ColorId);

                    if (search.CcMin != 0 && search.CcMax != 0)
                        query = query.Where(cc => cc.Cc >= search.CcMin && cc.Cc <= search.CcMax);
                    else if (search.CcMin != 0)
                        query = query.Where(cc => cc.Cc >= search.CcMin);
                    else if (search.CcMax != 0)
                        query = query.Where(cc => cc.Cc <= search.CcMax);

                    if (search.HpMin != 0 && search.HpMax != 0)
                        query = query.Where(h => h.Horsepower >= search.HpMin && h.Horsepower <= search.HpMax);
                    else if (search.HpMin != 0)
                        query = query.Where(h => h.Horsepower >= search.HpMin);
                    else if (search.HpMax != 0)
                        query = query.Where(h => h.Horsepower <= search.HpMax);

                    if (search.NumOfCyl != 0)
                        query = query.Where(n => n.NumOfCyl == search.NumOfCyl);

                    if (search.EngineType != null)
                        query = query.Where(e => e.EngineType == search.EngineType);

                    if (search.Drive != null)
                        query = query.Where(d => d.Drive == search.Drive);

                    if (search.TransType != null)
                        query = query.Where(tr => tr.TransType == search.TransType);

                    if (search.KWeightMin != 0 && search.KWeightMax != 0)
                        query = query.Where(kw => kw.KWeight >= search.KWeightMin && kw.KWeight <= search.KWeightMax);
                    else if (search.KWeightMin != 0)
                        query = query.Where(kw => kw.KWeight >= search.KWeightMin);
                    else if (search.KWeightMax != 0)
                        query = query.Where(kw => kw.KWeight <= search.KWeightMax);

                    // Project the results into CarDTO
                    var response = query.Select(car => new CarDTO
                    {
                        Id = car.Id,
                        SellerId = car.SellerId,
                        Type_name = car.Type.TypeName,
                        Brand = car.Brand.Name,
                        KMClock = car.KmClock,
                        Price = car.Price,
                        Description = car.Description,
                        Year = car.Year,
                        fuel_type = car.FuelType,
                        ccm = car.Cc,
                        hp = car.Horsepower,
                        Pathname = car.Pictues.FirstOrDefault(x => x.CarId == car.Id).FilePath,
                        Sold = car.Sold
                    }).ToList();

                    return Ok(response.Count());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }


        }
    }
}

