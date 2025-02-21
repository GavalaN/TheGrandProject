namespace AA_Backend.DTOs
{
    public class HirdetesDTO
    {
        public int Id { get; set; }
        public string Type_Name { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public int KMClock { get; set; }
        public int Price { get; set; }
        public string Description { get; set; } = null!;
        public int Year { get; set; } 
        public string Fuel_Type { get; set; } = null!;
        public int Ccm { get; set; }
        public int Hp { get; set; }
        public string Username { get; set; } = null!;   
        public string PhoneNum { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Drive { get; set; } = null!;
        public string Color { get; set; } = null!;
        public string TransType { get; set; } = null!;
        public string EngineType { get; set; } = null!;
        public int NumofCylinders { get; set; }
        public string BodyType { get; set; } = null!;
        public int KWeight { get; set; }
    }
}
