using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AA_Backend.Models;

public partial class Type
{
    public int Id { get; set; }

    public int BrandId { get; set; }

    public string TypeName { get; set; } = null!;

    public virtual Brand? Brand { get; set; }
    [JsonIgnore]
    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
}
