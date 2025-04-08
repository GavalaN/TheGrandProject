using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using AAAdminApp.Models;
using AAAdminApp.DTOs;
using System.Security.Cryptography;
using Org.BouncyCastle.Crypto.Generators;
using System.Net.Http;
using System.Net.Http.Json;
using AAAdminApp.Services;

namespace AAAdminApp
{
    /// <summary>
    /// Interaction logic for Login.xaml 
    /// </summary>
    
    public partial class Login : Window
    {


        public Login()
        {
            InitializeComponent();
        }

        private async void btnLogin_Click(object sender, RoutedEventArgs e)
        {

            string username = tbFelhasznalonev.Text;
            string password = tbJelszo.Password;

            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                MessageBox.Show("Kérjük adja meg a felhasználónevet és jelszót!", "Hiányzó adatok",
                              MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            
            

            try
            {
                // 1. Initialize auth service
               ApiService authService = new ApiService();

                // 2. Get salt for the user
                string salt = await authService.GetUserSaltAsync(username);

                // 3. Create temporary hash (password + salt)
                string tmpHash = BCrypt.Net.BCrypt.HashPassword(password,salt);


                // 4. Perform login
          
                LoggedInUsers user = await authService.LoginAsync(new LoginDTO
                {
                    LoginName = username,
                    TmpHash = tmpHash
                });

                // 5. Store token securely
                

                // 6. Open main window with the token
                MainWindow mainWindow = new MainWindow(user.Token);
                mainWindow.Show();

                // 7. Close login window
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Bejelentkezés sikertelen: {ex.Message}", "Hiba",
                              MessageBoxButton.OK, MessageBoxImage.Error);
            }
            

        }


    } 
}

        