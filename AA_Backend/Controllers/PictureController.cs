using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AA_Backend.Services;
using AA_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly FtpService _ftpService;

        public PictureController(FtpService ftpService)
        {
            _ftpService = ftpService;
        }
        [HttpPost("Upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, int carId)
        {
            using (var context = new CarplaceContext())
            {


                if (file == null || file.Length == 0)
                    return BadRequest("Nem adott meg fájlt");

                // Validate file type
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                var extension = Path.GetExtension(file.FileName).ToLower();
                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Nem megengedett fájl típus");


                // Sanitize filename
                var typename = context.Cars.Where(c => c.Id == carId).Select(c => c.Type.TypeName).FirstOrDefault();
                var fileName = typename+"_"+carId;
                context.Pictues.Add(new Pictue {
                    FilePath = fileName,
                    CarId=carId
                });
                using var stream = file.OpenReadStream();
                _ftpService.UploadImageAsync(stream, fileName);
                return Ok($"Sikeres Fájlfeltöltés {fileName} néven");
            }
        }

        [HttpGet("download/{fileName}")]
        public async Task<IActionResult> DownloadImage(string fileName)
        {
            try
            {
                var stream =  _ftpService.DownloadImageAsync(fileName);
                var contentType = GetContentType(fileName);
                return File(stream, contentType, fileName);
            }
            catch (FileNotFoundException)
            {
                return NotFound("Nem talalálható fájl");
            }
        }

        private static string GetContentType(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLower();
            return extension switch
            {
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => "application/octet-stream"
            };
        }
        [HttpGet("bycar/{carId}")]
        public async Task<ActionResult<IEnumerable<string>>> GetPicturePathsByCar(int carId)
        {
            using (var context = new CarplaceContext())
            {
                if (!context.Pictues.Contains(new Pictue() { CarId=carId}))
                {
                    return BadRequest("Invalid Car ID");
                }

                var filePaths = await context.Pictues
                .Where(p => p.CarId == carId)
                .Select(p => p.FilePath)
                .ToListAsync();

                if (!filePaths.Any())
                {
                    return NotFound("No pictures found for this car");
                }

                return Ok(filePaths);
            }
        }
    }
}
