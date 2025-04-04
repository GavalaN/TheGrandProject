
using AA_Backend.Models;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using AA_Backend.Services;


namespace AA_Backend
{
    public class Program
    {
       

        public static string GenerateSalt()
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            return salt;
        }




        public static string CreateSHA256(string input)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] data = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sBuilder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }
                return sBuilder.ToString();
            }
        }
        public static Dictionary<string, User> LoggedInUsers = new Dictionary<string, User>();
        
        
        public static async Task SendEmail(string mailAddressTo, string subject, string body)
        {
            var builder = WebApplication.CreateBuilder();
            var config = builder.Configuration;
            MailMessage mail = new MailMessage();
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress(config["AuthString:Email"]);
            mail.To.Add(mailAddressTo);
            mail.Body = body;
            smtpClient.Port = 587;
            smtpClient.Credentials = new System.Net.NetworkCredential(config["AuthString:Email"],config["AuthString:Password"]);
            smtpClient.EnableSsl = true;
            await smtpClient.SendMailAsync(mail);
        }

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
             
            // Add services to the container.
            builder.Services.AddScoped<FtpService>();
           

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
            var app = builder.Build();
            //works


           
            

            app.UseCors(MyAllowSpecificOrigins);
            app.UseCors("AllowAll");
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
