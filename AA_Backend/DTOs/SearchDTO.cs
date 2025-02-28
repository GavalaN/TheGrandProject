namespace AA_Backend.DTOs
{
    public class SearchDTO
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public int TypeId { get; set; }
        public string? BodyType { get; set; }
        public string? FuelType { get; set; }
        public int YearMin { get; set; }
        public int YearMax { get; set; }
        public int PriceMin { get; set; }
        public int PriceMax { get; set; }
        public int KMClockMin { get; set; }
        public int KMClockMax { get; set; }
        public int ColorId { get; set; }
        public int CcMin { get; set; }
        public int CcMax { get; set; }
        public int HpMin { get; set; }
        public int HpMax { get; set; }
        public int NumOfCyl { get; set; }
        public string? EngineType { get; set; }
        public string? Drive { get; set; }
        public string? TransType { get; set; }
        public int KWeightMin { get; set; }
        public int KWeightMax { get; set; }


    }
}
