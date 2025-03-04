namespace AA_Backend.DTOs
{
    public class LoggedInUsers
    {
        public string Token { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNum { get; set; } = null!;
        public int UId { get; set; }

    }
}
