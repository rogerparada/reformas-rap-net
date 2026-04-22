using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Utils;

public record CompanyInfo(string Name, string Email, string Phone, string City, string Address, string Web);
public record ClientInfo(string Name,string Email, string Phone, string City, string Address, string? Nif);
public record InfoDocument(string Numero, string Nif, bool Iva, TipoDocumento Tipo, DateTime Fecha);
public record Totals(decimal Subtotal, decimal Total, decimal Iva);
public record TableItem(string Description, decimal Price, int Quantity, decimal Total);