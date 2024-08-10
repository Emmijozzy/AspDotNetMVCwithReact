using AspDotNetMVC.Models;
using Newtonsoft.Json;

namespace AspDotNetMVC.Service
{
    public class AccountService
    {
        private readonly HttpClient _httpClient;

        public AccountService()
        {
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("http://localhost:5168/api/AuthApi/")
            };
        }

        public async Task<bool> RegisterAsync(Register model)
        {
            Console.WriteLine("Called");
            Console.WriteLine(model);
            var response = await _httpClient.PostAsJsonAsync("register", model);
            var errorMessage = await response.Content.ReadAsStringAsync();

            // Handle the error message (e.g., log it, throw an exception, etc.)
            Console.WriteLine($"Error: {errorMessage}");
            return response.IsSuccessStatusCode;
        }

        public async Task<LoginResult> LoginAsync(Login model)
        {
            var response = await _httpClient.PostAsJsonAsync("login", model);
            // Console.WriteLine(response);
            var loginResult = new LoginResult
            {
                Success = response.IsSuccessStatusCode,
            };

            if (loginResult.Success)
            {
                var responseContent = await response.Content.ReadAsStringAsync();

                // Console.WriteLine(responseContent);
                var responseToken = JsonConvert.DeserializeObject<TokenResponse>(responseContent);
                // Console.WriteLine($"{responseToken.Token} token");

                if (string.IsNullOrEmpty(responseToken?.Token))
                {
                    loginResult.Success = false;

                    return loginResult;
                }
                loginResult.Token = $"{responseToken.Token}";
            }

            return loginResult;
        }
    }
}

public class TokenResponse
{
    public string Token { get; set; }
}
