namespace ReformasRapBackend.Data.Dto;

public record Dashboard
{
    public int Documentos { get; set; }
    public int Clientes { get; set; }
    public int Emails { get; set; }
    public int Historial { get; set; }
}
