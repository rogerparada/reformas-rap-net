using ReformasRapBackend.Data.Dto;

namespace ReformasRapBackend.Services.Documentos;

public interface IDocumentHistoryService
{
    Task<List<DocumentHistoryResponse>> GetDocumentHistories();
    Task<DocumentHistoryResponse> GetDocumentHistory(Guid id);
}
