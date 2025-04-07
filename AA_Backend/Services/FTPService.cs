using FluentFTP;

namespace AA_Backend.Services
{
    public class FtpService
    {
        private readonly string _host;
        private readonly string _username;
        private readonly string _password;
        private readonly string _remoteDirectory;

        public FtpService(IConfiguration config)
        {
            _host = config["FtpConfig:Host"];
            _username = config["FtpConfig:Username"];
            _password = config["FtpConfig:Password"];
            _remoteDirectory = config["FtpConfig:RemoteDirectory"];
        }

        public void UploadImageAsync(Stream fileStream, string remoteFileName)
        {
            using var client = new FtpClient(_host, _username, _password);

            client.Connect();
            client.UploadStream(fileStream, $"{_remoteDirectory}/{remoteFileName}");
        }

        public Stream DownloadImageAsync(string remoteFileName)
        {
            using var client = new FtpClient(_host, _username, _password);
            client.Connect();
            return client.OpenRead($"{_remoteDirectory}/{remoteFileName}");
        }

        public bool DeleteFileAsync(string remoteFileName)
        {
            using var client = new AsyncFtpClient(_host, _username, _password);
            try
            {
                 client.Connect();

                string fullPath = $"{_remoteDirectory}/{remoteFileName}";

                

                // Delete the file
                client.DeleteFile(fullPath);
                return true;
            }
            catch (Exception ex)
            {
                // Log error (consider injecting ILogger<FtpService>)
                Console.WriteLine($"FTP deletion failed: {ex.Message}");
                return false;
            }
            finally
            {
                if (client.IsConnected)
                     client.Disconnect();
            }
        }

    }
}
