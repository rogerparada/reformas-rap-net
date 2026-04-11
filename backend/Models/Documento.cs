using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Models;

public class Documento
{
    [Key] public Guid IdDocumento { get; set; }
    [StringLength(10)] public required string NumeroDocumento { get; set; }
    public TipoDocumento TipoDocumento { get; set; }
    public DateTime Fecha { get; set; }
    public Estado Estado { get; set; }
    public bool Iva { get; set; }
    
    public List<Item> Items { get; set; } = [];
    public Guid IdCliente { get; set; }
    
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }

    [ForeignKey("IdCliente")] public virtual Cliente? Cliente { get; set; }
}