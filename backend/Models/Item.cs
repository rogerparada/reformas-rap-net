using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReformasRapBackend.Models;

public class Item
{
    [Key] public int Id { get; set; }
    [StringLength(250)] public required string Descripcion { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal Price { get; set; }

    [Column(TypeName = "decimal(18,2)")] public decimal Importe { get; set; }

    public int Quantity { get; set; }

    public Guid IdDocumento { get; set; }

    [ForeignKey("IdDocumento")] public virtual Documento? Documento { get; set; }
}