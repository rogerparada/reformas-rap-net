using System.Text.Json.Serialization;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Data.Dto;

public class DocumentoResponse
{
    public Guid IdDocumento { get; set; }
    public required string NumeroDocumento { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter<TipoDocumento>))]
    public TipoDocumento TipoDocumento { get; set; }
    public DateTime Fecha { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Estado Estado { get; set; }
    public bool Iva { get; set; }
    public Guid IdCliente { get; set; }
}