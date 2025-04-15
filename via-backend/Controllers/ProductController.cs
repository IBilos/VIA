using Microsoft.AspNetCore.Mvc;
using via_backend.Models;

namespace via_backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        // Mock data for products
        private static readonly List<Product> _products =
        [
            new Product { Id = 1, Name = "Product A" },
            new Product { Id = 2, Name = "Product B" },
            new Product { Id = 3, Name = "Product C" }
        ];

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(_products);
        }
    }
}