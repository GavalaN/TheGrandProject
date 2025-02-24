using System;
using System.Collections.Generic;

namespace AA_Backend.Models;

public partial class Color
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Hexcode { get; set; } = null!;

    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
}
