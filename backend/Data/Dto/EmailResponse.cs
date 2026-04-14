using System.ComponentModel.DataAnnotations;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Data.Dto;

public class EmailResponse
{
    public Guid? Id { get; set; }
    public required string Destination { get; set; }
    public required string Subject { get; set; }
    public string? Attachment { get; set; }
    public string? Cc { get; set; }
    public string? Cco { get; set; }
    public required string Message { get; set; }
    [EnumDataType(typeof(Estado))] 
    public Estado Status { get; set; } = Estado.Borrador;
    public ClienteReduced? Cliente { get; set; }
    public DateTime Date { get; set; }
}

public record ClienteReduced(Guid IdCliente, string Name);