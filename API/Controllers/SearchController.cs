using System.Linq;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<SearchController> _logger;

        public SearchController(DataContext context, ILogger<SearchController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<object>> Search([FromQuery] string query)
        {
            _logger.LogInformation($"Search query: {query}");

            var lowerCaseQuery = query.ToLower();

            var eventResults = await _context.Activities
                .Where(e => e.Title.ToLower().Contains(lowerCaseQuery) ||
                            e.Description.ToLower().Contains(lowerCaseQuery) ||
                            e.Category.ToLower().Contains(lowerCaseQuery) ||
                            e.City.ToLower().Contains(lowerCaseQuery) ||
                            e.Venue.ToLower().Contains(lowerCaseQuery))
                .ToListAsync();

            var userResults = await _context.Users
                .Where(u => u.DisplayName.ToLower().Contains(lowerCaseQuery) ||
                            u.UserName.ToLower().Contains(lowerCaseQuery))
                .ToListAsync();

            return Ok(new { eventResults, userResults });
        }
    }
}