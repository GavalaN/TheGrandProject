using System;
using System.Collections.Generic;

namespace AAAdminApp.Models;

public partial class Car
{
    public int Id { get; set; }

    public int BrandId { get; set; }

    public int TypeId { get; set; }

    public string? Description { get; set; }

    public int KmClock { get; set; }

    public int ColorId { get; set; }

    public int Price { get; set; }

    public int SellerId { get; set; }

    public DateTime UploadDate { get; set; }

    public bool Sold { get; set; }

    public string BodyType { get; set; } = null!;

    public int NumOfCyl { get; set; }

    public int Horsepower { get; set; }

    public int Cc { get; set; }

    public string EngineType { get; set; } = null!;

    public string FuelType { get; set; } = null!;

    public string Drive { get; set; } = null!;

    public string TransType { get; set; } = null!;

    public int Year { get; set; }

    public int KWeight { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual Color Color { get; set; } = null!;

    public virtual ICollection<Pictue> Pictues { get; set; } = new List<Pictue>();

    public virtual User Seller { get; set; } = null!;

    public virtual Type Type { get; set; } = null!;
}
