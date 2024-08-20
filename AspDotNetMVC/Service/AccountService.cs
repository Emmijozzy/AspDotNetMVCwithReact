using AspDotNetMVC.Models;
using System.Net.Http.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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

        public async Task<bool> LogoutAsync(LogoutRequest logout)
        {

            var response = await _httpClient.PostAsJsonAsync("Logout", logout);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();

                if (string.IsNullOrEmpty(errorContent))
                {
                    Console.WriteLine("Empty Response");
                    return false;
                }

                try
                {
                    var jsonError = JObject.Parse(errorContent);

                    var errorMessage = jsonError["message"]?.ToString();

                    var errorCode = jsonError["code"]?.ToString();

                    Console.WriteLine($"Error: {errorMessage}, Code: {errorCode}");
                    return false;

                }
                catch (JsonReaderException ex)
                {
                    Console.WriteLine($"{ex}, jsonError");
                    return false;
                }

            }

            // Handle the successful response
            return response.IsSuccessStatusCode;
        }
    }
}

public class TokenResponse
{
    public string Token { get; set; }
}
