using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AA_Backend.Models;

public partial class Pictue
{
    public int Id { get; set; }

    public int CarId { get; set; }

    public string FilePath { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
}
