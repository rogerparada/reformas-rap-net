using System.ComponentModel.DataAnnotations;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Data.Dto;

public class DocumentoRequest
{
    [Required(ErrorMessage = "El campo {0} es obligatorio")]
    public required string NumeroDocumento { get; set; }

    [EnumDataType(typeof(TipoDocumento))] public TipoDocumento TipoDocumento { get; set; }
    public DateTime? Fecha { get; set; }
    [EnumDataType(typeof(Estado))] public Estado? Estado { get; set; } 
    public bool? Iva { get; set; }
    public required Guid IdCliente { get; set; }

    [MinLength(1, ErrorMessage = "Se requiere minimo un item para el documento")]
    public List<ItemRequest> Items { get; set; } = [];
}