using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Documentos;

public interface IDocumentosRepository
{
    Task<IEnumerable<Documento>> GetDocumentos(TipoDocumento? tipo = null,
        DocumentoSort? sortBy = DocumentoSort.Fecha, bool descending = false);
    Task<IEnumerable<Documento>> GetFullDocumentos(TipoDocumento? tipo = null,
        DocumentoSort? sortBy = DocumentoSort.Fecha, bool descending = false, int items = 10, int offset = 0);
    Task<int> GetDocumentsCount(TipoDocumento?  tipo = null);
    Task<Documento?> GetDocumento(string numeroDocumento);
    Task<Documento?> GetDocumento(Guid idDocumento);
    Task<Documento?> CreateDocumento(Documento documento);
    Task DeleteDocumento(Guid id);
    Task UpdateDocumento(Guid id, Documento documento);
    Task<bool> DocumentoExists(string numeroDocumento);
    Task<bool> DocumentoExists(Guid idDocumento);
}