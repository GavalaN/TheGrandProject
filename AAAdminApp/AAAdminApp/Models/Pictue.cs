using System;
using System.Collections.Generic;

namespace AAAdminApp.Models;

public partial class Pictue
{
    public int Id { get; set; }

    public int CarId { get; set; }

    public string FilePath { get; set; } = null!;

    public virtual Car Car { get; set; } = null!;
}
