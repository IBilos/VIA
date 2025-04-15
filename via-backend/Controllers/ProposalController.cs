using Microsoft.AspNetCore.Mvc;
using via_backend.Models;

namespace via_backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProposalsController : ControllerBase
    {
        private static readonly List<Proposal> _proposals = [];

        // Get all proposals
        [HttpGet]
        public ActionResult<IEnumerable<Proposal>> GetProposals()
        {
            return Ok(_proposals);
        }

        // Create a new proposal
        [HttpPost]
        public ActionResult CreateProposal([FromBody] Proposal proposal)
        {
            Console.WriteLine($"Received proposal: {System.Text.Json.JsonSerializer.Serialize(proposal)}");

            proposal.Id = _proposals.Count + 1;  //auto-incremented ID
            _proposals.Add(proposal);
            return CreatedAtAction(nameof(GetProposals), new { id = proposal.Id }, proposal);
        }

        // Update proposal status
        [HttpPatch("{id}")]
        public ActionResult UpdateProposalStatus(int id, [FromBody] string newStatus)
        {
            var proposal = _proposals.FirstOrDefault(p => p.Id == id);
            if (proposal == null)
            {
                return NotFound(); // If proposal is not found, return 404
            }

            proposal.Status = newStatus;
            return NoContent();  // Status updated successfully
        }
    }

}