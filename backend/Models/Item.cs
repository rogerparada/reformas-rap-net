using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReformasRapBackend.Models;

public class Item
{
    [Key] public int Id { get; set; }
    [StringLength(250)] public required string Description { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal Price { get; set; }
    public int Quantity { get; set; } = 1;
    public Guid IdDocumento { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    [ForeignKey("IdDocumento")] public virtual Documento? Documento { get; set; }
}