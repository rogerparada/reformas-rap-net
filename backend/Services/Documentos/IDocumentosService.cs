using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Services.Documentos;

public interface IDocumentosService
{
    Task<List<DocumentoResponse>> GetDocumentos(TipoDocumento? tipo = null, Order? orderBy = Order.Fecha, bool descending = false);
    Task<List<DocumentoInfoResponse>> GetDocumentosInfo(TipoDocumento? tipo = null, Order? orderBy = Order.Fecha, bool descending = false);
    Task<DocumentoResponse> GetDocumento(string idDocumento);
    Task<FullDocumentoResponse> GetDocumento(Guid idDocumento);
    Task<Guid> CreateDocumento(DocumentoRequest documento);
    Task DeleteDocumento(Guid idDocumento);
    Task UpdateDocumento(Guid id, DocumentoRequest documento);
    Task<Company?> GetCompanyInfo();
}