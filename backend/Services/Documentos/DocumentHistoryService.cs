using System.Net;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Mappers;
using ReformasRapBackend.Middleware;
using ReformasRapBackend.Repository.Documentos;

namespace ReformasRapBackend.Services.Documentos;

public class DocumentHistoryService(
    IDocumentHistoryRepository documentHistoryRepository,
    IMapper mapper
) : IDocumentHistoryService
{
    public async Task<List<DocumentHistoryResponse>> GetDocumentHistories()
    {
        var dHistories = await documentHistoryRepository.GetHistories();
        return dHistories.Select(mapper.DocumentHistoryToResponse).ToList();
    }

    public async Task<DocumentHistoryResponse> GetDocumentHistory(Guid id)
    {
        var dh = await documentHistoryRepository.GetHistory(id);
        return dh is null
            ? throw new MiddlewareException(HttpStatusCode.NotFound, "DocumentHistory not found")
            : mapper.DocumentHistoryToResponse(dh);
    }
}
