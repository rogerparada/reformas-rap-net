using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Documentos;

public interface IDocumentHistoryRepository
{
    Task<List<DocumentHistory>> GetHistories();
    Task<DocumentHistory?> GetHistory(Guid id);
}
