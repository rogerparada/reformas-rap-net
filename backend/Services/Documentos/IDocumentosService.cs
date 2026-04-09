using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;

namespace ReformasRapBackend.Services.Documentos;

public interface IDocumentosService
{
    Task<List<DocumentoResponse>> GetDocumentos();
    Task<List<DocumentoResponse>> GetDocumentosByType(TipoDocumento tipoDocumento);
    
    Task<DocumentoResponse> GetDocumento(string idDocumento);
    Task<FullDocumentoResponse> GetDocumento(Guid idDocumento);
    
    Task CreateDocumento(DocumentoRequest documento);
    
    Task DeleteDocumento(string idDocumento);
    Task UpdateDocumento(Guid id, DocumentoRequest documento);
}