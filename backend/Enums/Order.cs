using System.Text.Json.Serialization;

namespace ReformasRapBackend.Enums;
[JsonConverter(typeof(JsonStringEnumConverter<Order>))]
public enum Order
{
    Documento,
    Cliente,
    Fecha
}