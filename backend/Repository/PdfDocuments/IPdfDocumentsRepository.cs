using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Repository.PdfDocuments;

public interface IPdfDocumentsRepository
{
    Task<PdfDoc?> GetPdf(Guid idDocumento);
}