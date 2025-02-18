using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AA_Backend.Models;

public partial class Brand
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
    [JsonIgnore]
    public virtual ICollection<Type> Types { get; set; } = new List<Type>();
}
