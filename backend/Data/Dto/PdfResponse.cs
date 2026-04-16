using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Data.Dto;

public record PdfResponse(string Name, byte[] Document);