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
    /// Interaction logic for AddBrand.xaml
    /// </summary>
    public partial class AddBrand : Window
    {
        private readonly string _usertoken;
        public AddBrand(string token)
        {
            InitializeComponent();
            _usertoken = token;
        }

        private async void Button_Click(object sender, RoutedEventArgs e)
        {
            if (txtBrand.Text!=null)
            {
                try
                {
                    string result = await new ApiService().AddBrandAdminAsync(
                        new Brand { Name = txtBrand.Text.Trim() },
                        _usertoken);

                    MessageBox.Show(result);
                    this.DialogResult = true;
                    this.Close();
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            else
            {
                MessageBox.Show("Kérjük adja meg a márkát!", "Hiányzó adatok",
                              MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

        }
    }
}
