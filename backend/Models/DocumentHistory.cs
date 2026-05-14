using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Models;

public class DocumentHistory
{
    [Key]
    public Guid Id { get; set; }
    public DateTime Created { get; set; }
    public TipoDocumento Tipo { get; set; }

    [MaxLength(10)]
    public string NumeroDocumento { get; set; } = string.Empty;
    public Actions Accion { get; set; }

    public required Guid IdDocumento { get; set; }

    [MaxLength(36)]
    public string? IdUsuario { get; set; }

    [ForeignKey("IdDocumento")]
    public virtual Documento? Documento { get; set; }

    [ForeignKey("IdUsuario")]
    public ApplicationUser? Usuario { get; set; }
}
