using System.ComponentModel.DataAnnotations;

namespace ReformasRapBackend.Models;

public class Cliente
{
    [Key] public Guid Id { get; set; }
    [StringLength(50)] public required string Email { get; set; }
    [StringLength(50)] public required string Name { get; set; }
    [StringLength(50)] public required string City { get; set; }
    [StringLength(50)] public required string Phone { get; set; }
    [StringLength(100)] public required string Address { get; set; }
    [StringLength(10)] public string? Nif { get; set; } = null;
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public List<Documento> Documentos { get; set; } = [];
}