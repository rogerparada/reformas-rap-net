using ReformasRapBackend.Data.Dto;

namespace ReformasRapBackend.Services.PdfDocuments;

public interface IPdfDocumentsService
{
   Task<PdfResponse> GetPdf(Guid idDocumento);
}