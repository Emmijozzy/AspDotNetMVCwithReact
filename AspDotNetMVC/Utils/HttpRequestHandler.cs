using Microsoft.AspNetCore.Http;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace AspDotNetMVC.Utils
{
    public class HttpRequestHandler : DelegatingHandler 
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IRequestCookieCollection? _cookies;
        public readonly HttpClient httpClient;

        public HttpRequestHandler( IHttpContextAccessor httpContextAccessor, IHttpClientFactory httpClientFactory)
        {
            _httpContextAccessor = httpContextAccessor;
            _cookies = _httpContextAccessor.HttpContext?.Request.Cookies;

            // Set up the HttpClient
            httpClient = httpClientFactory.CreateClient();
            httpClient.BaseAddress = new Uri("http://localhost:5168/api");

            // Get the token from cookies if available
            var token = _cookies?["AuthToken"];
            if (!string.IsNullOrEmpty(token))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }

            // Add cookies to HttpClient headers
            foreach (var cookie in _cookies)
            {
                httpClient.DefaultRequestHeaders.Add("Cookie", $"{cookie.Key}={cookie.Value}");
            }
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var response = await base.SendAsync(request, cancellationToken);

            if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                var tokenResponse = await httpClient.GetAsync("api/Auth/refresh-token");

                if (tokenResponse.IsSuccessStatusCode) 
                {
                    var newAccessToken = await tokenResponse.Content.ReadAsStringAsync();

                    _httpContextAccessor.HttpContext.Response.Cookies.Append("AuthToken", newAccessToken);

                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", newAccessToken);

                    response = await base.SendAsync(request, cancellationToken);
                }
            }

            return response;
        }

    }
}
