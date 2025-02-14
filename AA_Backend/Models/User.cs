using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AA_Backend.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNum { get; set; } = null!;

    public string Password { get; set; } = null!;
    [JsonIgnore]
    public DateTime Created { get; set; }
    [JsonIgnore]
    public bool IsAdmin { get; set; }

    public string Salt { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
}
