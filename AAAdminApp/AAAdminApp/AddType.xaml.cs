using AAAdminApp.Models;
using AAAdminApp.Services;
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

namespace AAAdminApp
{
    /// <summary>
    /// Interaction logic for AddType.xaml
    /// </summary>
    public partial class AddType : Window
    {
        private readonly string _usertoken;

        public AddType(string token)
        {
            InitializeComponent();
            _usertoken = token;
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {

                var apiService = new ApiService();
                var brands = await apiService.GetBrandsAsync();
                cmbBrands.ItemsSource = brands;
            }
            catch (Exception)
            {

                MessageBox.Show("Hiba történt a márkák betöltésekor.");
            }
            
           
        }

        private async void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                ApiService apiService = new ApiService();
                if (cmbBrands.SelectedItem != null && txtType.Text != null)
                {
                    var selectedBrand = cmbBrands.SelectedItem as Brand;
                    AAAdminApp.Models.Type type = new AAAdminApp.Models.Type
                    {
                        TypeName = txtType.Text,
                        BrandId = selectedBrand.Id,
                        Brand = null

                    };
                    string result = await apiService.AddTypeAdminAsync(type,_usertoken);
                    MessageBox.Show(result);
                    this.DialogResult = true;
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Kérjük adja meg a típust és válasszon márkát!", "Hiányzó adatok",
                                  MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
