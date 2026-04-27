using System.Text.Json.Serialization;

namespace ReformasRapBackend.Enums;

[JsonConverter(typeof(JsonStringEnumConverter<Estado>))]
public enum Estado
{
    Borrador,
    Editado,
    Enviado
}