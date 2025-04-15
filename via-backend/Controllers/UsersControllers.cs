using Microsoft.AspNetCore.Mvc;
using via_backend.Models;

namespace via_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // In-memory user data
        private static readonly List<User> users =
        [
            new User { Id = 1, Username = "admin", Password = "admin", Role = "admin" },
            new User { Id = 2, Username = "user1", Password = "user1", Role = "user" },
            new User { Id = 3, Username = "user2", Password = "user2", Role = "user" }
        ];

        // POST api/login
        [HttpPost("login")]
        public ActionResult<User> Login([FromBody] LoginRequest loginRequest)
        {
            // Find the user by username and password
            var user = users.FirstOrDefault(u => u.Username == loginRequest.Username && u.Password == loginRequest.Password);

            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }
            return Ok(user);
        }

        // GET api/users
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(users);
        }
    }

    public class LoginRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
