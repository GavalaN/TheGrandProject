using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AA_Backend.Models;

public partial class Color
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
}
