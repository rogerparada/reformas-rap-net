using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Documentos;

public interface IDocumentHistoryRepository
{
    Task<List<DocumentHistory>> GetHistories();
    Task<int> GetHistoriesCount();
    Task<DocumentHistory?> GetHistory(Guid id);
}
