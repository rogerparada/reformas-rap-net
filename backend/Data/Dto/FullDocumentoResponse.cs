using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Data.Dto;

public class FullDocumentoResponse
{
    public Guid IdDocumento { get; set; }
    public required string NumeroDocumento { get; set; }
    public TipoDocumento TipoDocumento { get; set; }
    public DateTime Fecha { get; set; }
    public Estado Estado { get; set; }
    public bool Iva { get; set; }
    public Guid IdCliente { get; set; }
    public List<ItemResponse> Items { get; set; } = [];
    
    public ClienteResponse? Cliente { get; set; }
}