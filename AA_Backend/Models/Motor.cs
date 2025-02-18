using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AA_Backend.Models;

public partial class Motor
{
    public int Id { get; set; }

    public int NumOfCyl { get; set; }

    public int Horsepower { get; set; }

    public int Cc { get; set; }

    public string EngineType { get; set; } = null!;

    public string FuelType { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Type> Types { get; set; } = new List<Type>();
}
