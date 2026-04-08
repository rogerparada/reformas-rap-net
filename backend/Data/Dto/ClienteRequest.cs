using System.ComponentModel.DataAnnotations;

namespace ReformasRapBackend.Data.Dto;

public class ClienteRequest
{
    [Required]
    [MaxLength(100, ErrorMessage = "La dirección de Email no puede tener mas de 100 caracteres")] 
    [EmailAddress(ErrorMessage = "La dirección de Email no es valida")]
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string City { get; set; }
    [Required]
    [Phone(ErrorMessage = "Numero de Telefono no es valido")]
    [MinLength(9, ErrorMessage = "El numero de teléfono debe tener minimo 9 digitos")]
    public required string Phone { get; set; }
    public required string Address { get; set; }
    public string? Nif { get; set; }
}