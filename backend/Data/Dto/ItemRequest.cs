using System.ComponentModel.DataAnnotations;

namespace ReformasRapBackend.Data.Dto;

public class ItemRequest :IValidatableObject
{
    public int? Id { get; set; }
    [Required(ErrorMessage = "El campo {0} es obligatorio")]
    public required string Descripcion { get; set; }

    public decimal? Importe { get; set; }
    public decimal? Precio { get; set; }
    public int? Cantidad { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Importe is null or 0)
        {
            if (Precio is null or <= 0)
            {
                yield return new ValidationResult("Si no se pone un importe, el precio es obligatorio",
                    new[] { nameof(Precio) });
            }

            if (Cantidad is null or <= 0)
            {
                yield return new ValidationResult("Si no se pone un importe, la cantidad es obligatria",
                    new[] { nameof(Cantidad) });
            }
        }
    }
}