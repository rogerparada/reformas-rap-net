using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Services.Documentos;

public interface IDocumentosService
{
    Task<List<DocumentoResponse>> GetDocumentos();
    Task<List<DocumentoResponse>> GetDocumentosByType(TipoDocumento tipoDocumento);
    Task<List<FullDocumentoResponse>> GetFullDocumentosByType(TipoDocumento tipoDocumento);
    Task<List<DocumentoInfoResponse>> GetDocumentosInfo();
    Task<List<DocumentoInfoResponse>> GetDocumentosInfoByType(TipoDocumento tipoDocumento);
    
    Task<DocumentoResponse> GetDocumento(string idDocumento);
    Task<FullDocumentoResponse> GetDocumento(Guid idDocumento);
    
    Task<Guid> CreateDocumento(DocumentoRequest documento);
    
    Task DeleteDocumento(string idDocumento);
    Task UpdateDocumento(Guid id, DocumentoRequest documento);
    Task<Company> GetCompanyInfo();
}