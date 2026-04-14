using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Models;

public class Email
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    [EmailAddress] 
    public required string Destination { get; set; }
    public required string Subject { get; set; }
    public string? Attachment { get; set; }
    public string? Cc { get; set; }
    public string? Cco { get; set; }
    public required string Message { get; set; }
    public Estado Status { get; set; } = Estado.Borrador;
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public required Guid IdCliente { get; set; }
    [ForeignKey(nameof(IdCliente))]
    public virtual Cliente? Cliente { get; set; }
}