using System.Text.Json.Serialization;

namespace ReformasRapBackend.Enums;
[JsonConverter(typeof(JsonStringEnumConverter<DocumentoSort>))]
public enum DocumentoSort
{
    Documento,
    Cliente,
    Fecha
}