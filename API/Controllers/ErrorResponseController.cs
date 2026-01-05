using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorResponseController : BaseApiController
    {
        [HttpGet("auth")]
        public IActionResult GetAuthError()
        {
            return Unauthorized(new { Message = "You are not authorized to access this resource." });
        }

        [HttpGet("not-found")]
        public IActionResult GetNotFoundError()
        {
            return NotFound(new { Message = "The requested resource was not found." });
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error for testing purposes.");
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequestError()
        {
            return BadRequest(new { Message = "The request was invalid." });
        }
    }
}
