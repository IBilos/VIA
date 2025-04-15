

namespace via_backend.Models
{
    public class Proposal
    {
        public int Id { get; set; }
        public int User  { get; set; }
        public int ProductId { get; set; }
        public required string Text { get; set; }
        public required string Status { get; set; }
        public DateTime Date { get; set; }
    }
}