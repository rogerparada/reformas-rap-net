using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Data.Dto;

public record DocumentHistoryResponse
{
    public DateTime Fecha { get; set; }
    public required string NumeroDocumento { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter<TipoDocumento>))]
    public TipoDocumento Tipo { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter<Actions>))]
    public Actions Accion { get; set; }
}
