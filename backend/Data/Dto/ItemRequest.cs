using System.ComponentModel.DataAnnotations;

namespace ReformasRapBackend.Data.Dto;

public class ItemRequest 
{
    public int? Id { get; set; }
    [Required(ErrorMessage = "El campo {0} es obligatorio")]
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; } = 0;
}