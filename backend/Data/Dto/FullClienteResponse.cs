namespace ReformasRapBackend.Data.Dto;

public class FullClienteResponse
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string City { get; set; }
    public required string Phone { get; set; }
    public required string Address { get; set; }
    public string? Nif { get; set; }
    public List<DocumentoInfoResponse> Documentos { get; set; }
}