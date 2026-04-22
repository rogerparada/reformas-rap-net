using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReformasRapBackend.Models;

public class Item
{
    [Key] public Guid Id { get; set; }
    [StringLength(1000)] public required string Description { get; set; }
    [Column(TypeName = "decimal(18,2)")] public decimal Price { get; set; }
    public int Quantity { get; set; } = 1;
    public Guid IdDocumento { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    [ForeignKey("IdDocumento")] public virtual Documento? Documento { get; set; }

    public override bool Equals(object? obj)
    {
        if (obj is null) return false;
        var item = obj as Item;
        if (item is null) return false;
        var description = item.Description == Description;
        var price = item.Price == Price;
        var quantity = item.Quantity == Quantity;
        
        return description && price && quantity;
    }
}