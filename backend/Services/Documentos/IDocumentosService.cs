using ReformasRapBackend.Data.Dto;

namespace ReformasRapBackend.Services.Documentos;

public interface IDocumentosService
{
    Task<List<DocumentoResponse>> GetDocumentos();
    
    Task<DocumentoResponse> GetDocumento(string idDocumento);
    Task<FullDocumentoResponse> GetDocumento(Guid idDocumento);
    
    Task CreateDocumento(DocumentoRequest documento);
    
    Task DeleteDocumento(string idDocumento);
    Task UpdateDocumento(Guid id, DocumentoRequest documento);
}