using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AA_Backend.Services;
using AA_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Google.Protobuf.WellKnownTypes;
using FluentFTP;
using MySqlX.XDevAPI;

namespace AA_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly FtpService _ftpService;
        private readonly FtpConfig _ftpConfig;

        public PictureController(FtpService ftpService,FtpConfig ftpConfig)
        {
            _ftpService = ftpService;
            _ftpConfig = ftpConfig;
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
               

                var fileName = carId+extension;
                int i = 0;
                while (context.Pictues.FirstOrDefault(x=> x.FilePath == fileName )!=null)
                {
                    i++;
                    fileName = carId +"_"+ i+ extension;
                }
                  
                context.Pictues.Add(new Pictue {
                    FilePath = fileName,
                    CarId=carId
                });
                context.SaveChanges();
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
                if (context.Pictues.FirstOrDefault(x=>x.CarId==carId)==null)
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
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateImage([FromForm] IFormFile file, string filename)
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


                
                
                context.Pictues.Update(new Pictue
                {
                    FilePath = filename,
                    
                });
                context.SaveChanges();
                using var stream = file.OpenReadStream();
                _ftpService.UploadImageAsync(stream, filename);
                return Ok($"Sikeres Fájlmodosítás {filename} néven");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePicture(string filename)
        {
            using (var context = new CarplaceContext()) {
                try
                {
                    // 1. Get the picture record from database
                    var picture = await context.Pictues.FirstOrDefaultAsync(x=>x.FilePath==filename);
                    if (picture == null)
                    {
                        return NotFound($"Ezzel a névvel kép nem található");
                    }

                    // 2. Delete from FTP server
                    bool ftpDeleteSuccess =  _ftpService.DeleteFileAsync(filename);
                    if (!ftpDeleteSuccess)
                    {
                        return Ok("Successful file delete");
                    }

                    // 3. Delete from database
                    context.Pictues.Remove(picture);
                    await context.SaveChangesAsync();

                    return NoContent();
                }
                catch (Exception ex)
                {
                    
                    return StatusCode(500, "An error occurred while deleting the picture.");
                }
            }
        }


    }
}
