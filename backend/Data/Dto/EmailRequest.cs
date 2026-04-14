using System.ComponentModel.DataAnnotations;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Data.Dto;

public class EmailRequest
{
    public Guid? Id { get; set; }
    [Required(ErrorMessage = "Se require un destinatario")]
    public required string Destination { get; set; }
    [Required(ErrorMessage = "Se require un asunto")]
    public required string Subject { get; set; }
    public string? Cc { get; set; }
    public string? Cco { get; set; }
    [Required(ErrorMessage = "Se require un mensaje")]
    public required string Message { get; set; }
    [EnumDataType(typeof(Estado))] 
    public Estado Status { get; set; }
    public Guid IdCliente { get; set; }
}