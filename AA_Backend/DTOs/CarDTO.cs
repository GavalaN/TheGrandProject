namespace AA_Backend.DTOs
{
    public class CarDTO
    {
        public int Id { get; set; }
        public int SellerId { get; set; }
        public string Type_name { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public int KMClock { get; set; }
        public int Price { get; set; }
        public string Description { get; set; } = null!;
        public int Year { get; set; } 
        public string fuel_type { get; set; } = null!;
        public int ccm { get; set; }
        public int hp { get; set; }
        public string? Pathname { get; set; }
        public bool? Sold { get; set; } = null!;

    }
}
