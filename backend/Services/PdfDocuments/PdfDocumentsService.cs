using System.Net;
using QuestPDF.Fluent;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Middleware;
using ReformasRapBackend.Repository.PdfDocuments;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Services.PdfDocuments;

public class PdfDocumentsService(IPdfDocumentsRepository pdfDocumentsRepository) : IPdfDocumentsService
{
    public async Task<PdfResponse> GetPdf(Guid idDocumento)
    {
        var doc = await pdfDocumentsRepository.GetPdf(idDocumento);
        if (doc is null)
        {
            throw new MiddlewareException(HttpStatusCode.NotFound, new {message = "No se ha encontrado el documento"});
        }
        var document = new PdfDocument(doc);
        return new PdfResponse(Name: doc.InfoDocument.Numero, Document: document.GeneratePdf());
    }
}