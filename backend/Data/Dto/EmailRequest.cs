using System.ComponentModel.DataAnnotations;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Data.Dto;

public class EmailRequest
{
    [Required(ErrorMessage = "Se require un destinatario")]
    public required string To { get; set; }
    [Required(ErrorMessage = "Se require un asunto")]
    public required string Subject { get; set; }
    public string? Cc { get; set; }
    public string? Cco { get; set; }
    [Required(ErrorMessage = "Se require un mensaje")]
    public required string Message { get; set; }
    public Guid IdCliente { get; set; }
    public Guid Attachment { get; set; }
}