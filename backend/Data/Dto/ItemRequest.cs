using System.ComponentModel.DataAnnotations;

namespace ReformasRapBackend.Data.Dto;

public class ItemRequest :IValidatableObject
{
    public int? Id { get; set; }
    [Required(ErrorMessage = "El campo {0} es obligatorio")]
    public required string Description { get; set; }

    public decimal? Total { get; set; }
    public decimal? Price { get; set; }
    public int? Quantity { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Total is null or 0)
        {
            if (Price is null or <= 0)
            {
                yield return new ValidationResult("Si no se pone un importe, el precio es obligatorio",
                    new[] { nameof(Price) });
            }

            if (Quantity is null or <= 0)
            {
                yield return new ValidationResult("Si no se pone un importe, la cantidad es obligatria",
                    new[] { nameof(Quantity) });
            }
        }
    }
}