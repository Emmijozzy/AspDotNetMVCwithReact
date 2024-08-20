using AspDotNetMVC.Models;
using AspDotNetMVC.Utils;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace AspDotNetMVC.Controllers
{
    [JwtAuthorize]
    public class BooksController : BaseController
    {
        private readonly HttpRequestHandler _requestHandler;
        private readonly HttpClient _httpClient;

        public BooksController(HttpRequestHandler requestHandler)
        {
            _requestHandler = requestHandler;
            _httpClient = _requestHandler.httpClient;
        }

        // GET: Books
        public async Task<IActionResult> Index()
        {
            var response = await _httpClient.GetAsync("api/BooksApi"); // Adjust URL as needed

            // Console.WriteLine(response);

            response.EnsureSuccessStatusCode();

            var responseData = await response.Content.ReadAsStringAsync();
            var books = JsonConvert.DeserializeObject<IEnumerable<Book>>(responseData);

            var error = TempData["Error"] as string;

            if (string.IsNullOrEmpty(error))
            {
                error = "";
            }

            ViewData["Error"] = error;
            return View(books);
        }

        // GET: Books/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var response = await _httpClient.GetAsync($"api/BooksApi/{id}");
            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var book = JsonConvert.DeserializeObject<Book>(responseData);
                return View(book);
            }
            return NotFound();
        }

        // GET: Books/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Books/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Book book)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));

                // You can now use the errors collection to display error messages to the user
                foreach (var error in errors)
                {
                    Console.WriteLine(error);
                }

                // Or return a custom error response
                return BadRequest(new { errors });
            }

            if (ModelState.IsValid)
            {
                var content = new StringContent(JsonConvert.SerializeObject(book), Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync("api/BooksApi", content);

                Console.WriteLine(response);
                Console.WriteLine(response.IsSuccessStatusCode);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
            }
            return View(book);
        }

        // GET: Books/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            var response = await _httpClient.GetAsync($"api/BooksApi/{id}");

            //Console.WriteLine(response);
            //Console.WriteLine(response.IsSuccessStatusCode);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var book = JsonConvert.DeserializeObject<Book>(responseData);
                return View(book);
                //return RedirectToAction("Index", "Books");
            }
            return NotFound();
        }

        // POST: Books/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }


            if (ModelState.IsValid)
            {

                Console.WriteLine("Ca;;;3333");
                var content = new StringContent(JsonConvert.SerializeObject(book), Encoding.UTF8, "application/json");
                var response = await _httpClient.PutAsync($"api/BooksApi/{id}", content);

                Console.WriteLine(response);
                Console.WriteLine(response.IsSuccessStatusCode);

                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
            }
            return View(book);
        }

        // GET: Books/Delete/5
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _httpClient.GetAsync($"api/BooksApi/{id}");
            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var book = JsonConvert.DeserializeObject<Book>(responseData);
                return View(book);
            }
            return NotFound();
        }

        // POST: Books/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var response = await _httpClient.DeleteAsync($"api/BooksApi/{id}");

            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction(nameof(Index));
            }
            return Problem("Error deleting book.");
        }

    }
}
