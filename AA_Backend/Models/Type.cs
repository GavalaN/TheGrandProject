using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AA_Backend.Models;

public partial class Type
{
    public int Id { get; set; }

    public int BrandId { get; set; }

    public string TypeName { get; set; } = null!;

    public int MotorId { get; set; }

    public string Drive { get; set; } = null!;

    public string TransType { get; set; } = null!;

    public int Year { get; set; }

    public int KWeight { get; set; }

    public virtual Brand Brand { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();

    public virtual Motor Motor { get; set; } = null!;
}
