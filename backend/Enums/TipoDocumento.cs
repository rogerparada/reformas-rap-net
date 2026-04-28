using System.Text.Json.Serialization;

namespace ReformasRapBackend.Enums;

[JsonConverter(typeof(JsonStringEnumConverter<TipoDocumento>))]
public enum TipoDocumento
{
    None,
    Presupuesto,
    Factura,
    CuentaCobro
}
