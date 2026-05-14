using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Data;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Documentos;

public class DocumentHistoryRepository(AppDbContext context) : IDocumentHistoryRepository
{
    public async Task<List<DocumentHistory>> GetHistories() =>
        await context.DocumentHistory.ToListAsync();

    public async Task<DocumentHistory?> GetHistory(Guid id) =>
        await context
            .DocumentHistory.Include(h => h.Usuario)
            .FirstOrDefaultAsync(dh => dh.Id == id);
}
