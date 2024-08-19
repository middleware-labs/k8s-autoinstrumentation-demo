using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class FetchController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public FetchController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("http://golang-service:8080/fetch");
        var content = await response.Content.ReadAsStringAsync();
        Response.StatusCode = (int)response.StatusCode;
        return Content(content);
    }
}

