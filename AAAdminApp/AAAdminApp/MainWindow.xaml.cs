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
using System.Threading.Tasks;
using System.Net.Http.Headers;
using AAAdminApp.Services;
using System.Collections.ObjectModel;

namespace AAAdminApp;

/// <summary>
/// Interaction logic for MainWindow.xaml
/// </summary>


public partial class MainWindow : Window
{
    static ObservableCollection<CarDTO> cars = new ObservableCollection<CarDTO>();
    static ObservableCollection<CarDTO> filteredCars = new ObservableCollection<CarDTO>();

    private readonly string _userToken;
    public MainWindow(string token)
    {
        InitializeComponent();
        _userToken = token;
    }

    private void dtgHird_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {

    }

    private async void Button_Click(object sender, RoutedEventArgs e)
    {
        if (dtgHird.SelectedItem == null)
        {
            MessageBox.Show("Válasszon ki egy hirdetést!");
        }
        else
        {

            int selectedcar=int.Parse(dtgHird.SelectedItem.GetType().GetProperty("Id").GetValue(dtgHird.SelectedItem, null).ToString());
            var apiService = new ApiService();
                string result = await apiService.DeleteCarAsync(selectedcar, _userToken);
            cars.Remove(cars.FirstOrDefault(c => c.Id == selectedcar));
            dtgHird.ItemsSource= cars;

            MessageBox.Show(result, "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            
            
         }
    }

    private async void Button_Click_1(object sender, RoutedEventArgs e)
    {
        using (var context = new CarplaceContext())
        {
            int selectedcar = int.Parse(dtgHird.SelectedItem.GetType().GetProperty("Id").GetValue(dtgHird.SelectedItem, null).ToString());
            Car selectedCar = context.Cars.FirstOrDefault(c => c.Id == selectedcar);
            if (true)
            {
                string token = _userToken;
                var editWindow = new Window1(selectedCar, token);

                if (editWindow.ShowDialog() == true)
                {

                    RefreshCarList();
                }
            }
            else
            {
                MessageBox.Show("Please select a car to edit");
            }
        }
    }
    private async void RefreshCarList()
    {
        try
        {
            var apiService = new ApiService();
            var cars = await apiService.GetAllCarsAsync();
            dtgHird.ItemsSource = cars;
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Error refreshing list: {ex.Message}");
        }
    }

    private void Button_Click_2(object sender, RoutedEventArgs e)
    {

    }

    private void Button_Click_3(object sender, RoutedEventArgs e)
    {

    }

    private async void Window_Loaded(object sender, RoutedEventArgs e)
    {
        try
        {
            ApiService apiService = new ApiService();
            cars = await apiService.GetAllCarsAsync();
            dtgHird.ItemsSource = cars;
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Error loading cars: {ex.Message}", "Error",
                          MessageBoxButton.OK, MessageBoxImage.Error);
        }
    }

    private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
    {
        if (txtKer.Text==null)
        {
            dtgHird.ItemsSource = cars;
        }
        else
        {
            filteredCars.Clear();
            foreach (var car in cars)
            {
                if (car.Type_name.ToLower().Contains(txtKer.Text.ToLower()))
                {
                    filteredCars.Add(car);
                }
            }
            dtgHird.ItemsSource = filteredCars;
        }
    }
}