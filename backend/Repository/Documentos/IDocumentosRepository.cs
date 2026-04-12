using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Documentos;

public interface IDocumentosRepository
{
    Task<IEnumerable<Documento>> GetDocumentos();
    Task<IEnumerable<Documento>> GetDocumentosByType(TipoDocumento tipoDocumento);
    Task<IEnumerable<Documento>> GetFullDocumentos();
    Task<IEnumerable<Documento>> GetFullDocumentosByType(TipoDocumento tipoDocumento);
    Task<IEnumerable<Documento>> GetDocumentosByIdCliente(Guid idCliente);
    Task<Documento?> GetDocumento(string numeroDocumento);
    Task<Documento?> GetDocumento(Guid idDocumento);
    Task<Documento?> CreateDocumento(Documento documento);
    Task DeleteDocumento(Guid id);
    Task UpdateDocumento(Guid id, Documento documento);
    Task<bool> DocumentoExists(string numeroDocumento);
    Task<bool> DocumentoExists(Guid idDocumento);
}