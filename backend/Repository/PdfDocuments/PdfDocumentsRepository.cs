using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Data;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Repository.PdfDocuments;

public class PdfDocumentsRepository(AppDbContext context) : IPdfDocumentsRepository
{
    public async Task<PdfDoc?> GetPdf(Guid idDocumento)
    {
        var document = await context.Documentos
            .Include(d=>d.Items)
            .Include(d=>d.Cliente)
            .FirstOrDefaultAsync(x => x.IdDocumento == idDocumento);
        var company = await context.Companies.FirstOrDefaultAsync();
        if (document is null || company is null) return null;
        
        return new PdfDoc(document,company);
    }
}