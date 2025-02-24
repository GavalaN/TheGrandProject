using System;
using System.Collections.Generic;

namespace AA_Backend.Models;

public partial class Brand
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();

    public virtual ICollection<Type> Types { get; set; } = new List<Type>();
}
