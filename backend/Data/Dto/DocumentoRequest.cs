using System.ComponentModel.DataAnnotations;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Data.Dto;

public class DocumentoRequest
{
    public string? NumeroDocumento { get; set; }

    [EnumDataType(typeof(TipoDocumento))]
    public TipoDocumento TipoDocumento { get; set; }
    public DateTime? Fecha { get; set; }

    [EnumDataType(typeof(Estado))]
    public Estado? Estado { get; set; }
    public int Iva { get; set; }
    public required Guid IdCliente { get; set; }

    [MinLength(1, ErrorMessage = "Se requiere minimo un item para el documento")]
    public List<ItemRequest> Items { get; set; } = [];
}
