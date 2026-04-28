using System.Text.Json.Serialization;

namespace ReformasRapBackend.Enums;

[JsonConverter(typeof(JsonStringEnumConverter<ClienteSort>))]
public enum ClienteSort
{
    Nombre,
    Email,
    Phone
}