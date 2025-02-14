using System;
using System.Collections.Generic;

namespace AA_Backend.Models;

public partial class Car
{
    public int Id { get; set; }

    public int BrandId { get; set; }

    public int PicId { get; set; }

    public int TypeId { get; set; }

    public string? Description { get; set; }

    public int KmClock { get; set; }

    public int ColorId { get; set; }

    public int Price { get; set; }

    public int SellerId { get; set; }

    public DateTime UploadDate { get; set; }

    public bool Sold { get; set; }

    public string Bodytype { get; set; } = null!;

    public virtual Brand Brand { get; set; } = null!;

    public virtual Color Color { get; set; } = null!;

    public virtual Pictue Pic { get; set; } = null!;

    public virtual User Seller { get; set; } = null!;

    public virtual Type Type { get; set; } = null!;
}
