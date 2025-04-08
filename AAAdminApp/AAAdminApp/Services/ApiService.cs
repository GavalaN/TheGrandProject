using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using AAAdminApp.Models;
using AAAdminApp.DTOs;
using AAAdminApp.DTOs;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Collections.ObjectModel;
namespace AAAdminApp.Services

{
    public class ApiService
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "http://localhost:5000";

        public ApiService()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri(BaseUrl);
        }

        public async Task<ObservableCollection<CarDTO>> GetAllCarsAsync()
        {
            try
            {
                // Call the endpoint you provided
                var response = await _httpClient.GetAsync("/CarDTO/GetAll"); // Replace "yourcontroller" with your actual controller name

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadFromJsonAsync<ObservableCollection<CarDTO>>();
                }
                else
                {
                    // Handle non-success status codes
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException($"API request failed with status code {response.StatusCode}: {errorContent}");
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions (network errors, etc.)
                throw new Exception("Failed to retrieve cars from API", ex);
            }
        }
        public async Task<string> DeleteCarAsync(int id, string token)
        {
            try
            {
                // Add the token to the request headers
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                // Send DELETE request with the id as a query parameter
                var response = await _httpClient.DeleteAsync($"/Car/Delete?id={id}&token={token}");

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return ($"Error: {response.StatusCode} - {errorContent}");
                }
            }
            catch (Exception ex)
            {
               return ("Failed to delete car"+ ex);
            }
        }
        // Method to get salt for a username
        public async Task<string> GetUserSaltAsync(string username)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync($"Login/GetSalt/{username}", new { });

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    throw new Exception("Username not found");
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Error: {errorContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to get user salt", ex);
            }
        }

        // Method to perform login
        public async Task<LoggedInUsers> LoginAsync(LoginDTO loginDto)
        {
            using (var context = new CarplaceContext())
            {
                try
                {
                    var response = await _httpClient.PostAsJsonAsync("Login", loginDto);

                    if (response.IsSuccessStatusCode)
                    {
                        bool isadmin = context.Users.FirstOrDefault(u => u.Username == loginDto.LoginName).IsAdmin;

                        // Add admin check
                        if (!isadmin)
                        {
                            throw new Exception("Access denied. Administrator privileges required.");
                        }
                        var loggedInUser = await response.Content.ReadFromJsonAsync<LoggedInUsers>();
                        return loggedInUser;
                    }
                    else
                    {
                        var errorContent = await response.Content.ReadAsStringAsync();
                        throw new Exception($"Login failed: {errorContent}");
                    }
                   
                }


                catch (Exception ex)
                {
                    throw new Exception("Login failed", ex);
                }
            }
        }
        public async Task<string> UpdateCarAsync(Car car, string token)
        {
            try
            {
                // Add the token to the request headers
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                // Send PUT request with the car object
                var response = await _httpClient.PutAsJsonAsync("Car/Put", new
                {
                    car = car,
                    token = token
                });

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException($"Error: {response.StatusCode} - {errorContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update car", ex);
            }
        }


    }
}
