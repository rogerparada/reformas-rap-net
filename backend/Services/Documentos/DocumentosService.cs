using System.Net;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Mappers;
using ReformasRapBackend.Middleware;
using ReformasRapBackend.Models;
using ReformasRapBackend.Repository.Clientes;
using ReformasRapBackend.Repository.Companies;
using ReformasRapBackend.Repository.Documentos;
using ReformasRapBackend.Repository.Items;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Services.Documentos;

public class DocumentosService(
    IConfiguration configuration,
    IDocumentosRepository documentosRepository,
    IItemsRepository itemsRepository,
    IClientesRepository clientesRepository,
    ICompanyRepository companyRepository,
    IMapper mapper)
    : IDocumentosService
{
    public async Task<List<DocumentoResponse>> GetDocumentos(TipoDocumento? tipo = null,
        DocumentoSort? sortBy = DocumentoSort.Fecha, bool descending = false)
    {
        var docs = await documentosRepository.GetDocumentos(tipo, sortBy, descending);
        var documentos = docs as IList<Documento> ?? docs.ToList();
        return !documentos.Any() ? [] : documentos.Select(mapper.DocumentoToResponse).ToList();
    }

    public async Task<ResultApiResponse<List<DocumentoInfoResponse>>> GetDocumentosInfo(TipoDocumento? tipo,
        DocumentoSort? sortBy, bool descending, int items, int offset)
    {
        var docs = await documentosRepository.GetFullDocumentos(tipo, sortBy, descending, items, offset);
        var documentos = docs as IList<Documento> ?? docs.ToList();
        var docsInfo = documentos.Select(mapper.DocumentoToInfoResponse).ToList();

        var queryParams = GetQueryParams(tipo, sortBy, descending);
        var count = await documentosRepository.GetDocumentsCount(tipo);
        var url = configuration["ApiSettings:BaseUrl"];
        var next = offset + items < count ? $"{url}/api/Document/info?{queryParams}&offset={offset+items}&items={items}" : null;
        var previous = offset > 0 ? $"{url}/api/Document/info?{queryParams}&offset={offset-items}&items={items}" : null;

        return new ResultApiResponse<List<DocumentoInfoResponse>>(count, next, previous, docsInfo);
    }

    public async Task<DocumentoResponse> GetDocumento(string idDocumento)
    {
        var doc = await documentosRepository.GetDocumento(idDocumento);
        return doc is null
            ? throw new MiddlewareException(HttpStatusCode.BadRequest, new
            {
                message = "El documento no existe"
            })
            : mapper.DocumentoToResponse(doc);
    }

    public async Task<FullDocumentoResponse> GetDocumento(Guid idDocumento)
    {
        var doc = await documentosRepository.GetDocumento(idDocumento);
        return doc is null
            ? throw new MiddlewareException(HttpStatusCode.BadRequest, new
            {
                message = "El documento no existe"
            })
            : mapper.FullDocumentoToResponse(doc);
    }

    public async Task<Guid> CreateDocumento(DocumentoRequest documento)
    {
        var cliente = await clientesRepository.GetCliente(documento.IdCliente);
        if (cliente == null)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "Cliente no valido" });
        }

        var exist = await documentosRepository.DocumentoExists(documento.NumeroDocumento);
        if (exist)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest,
                new { message = "El numero de documento ya existe" });
        }

        var doc = mapper.DocumentoRequestToEntity(documento);
        var result = await documentosRepository.CreateDocumento(doc);
        if (result == null)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "Error al crear el documento" });
        }

        try
        {
            await itemsRepository.AddItems(
                result.IdDocumento,
                documento.Items.Select(mapper.ItemRequestToEntity).ToList()
            );
        }
        catch (Exception e)
        {
            throw new MiddlewareException(HttpStatusCode.InternalServerError, new { message = e.Message });
        }

        return result.IdDocumento;
    }

    public async Task DeleteDocumento(Guid idDocumento)
    {
        var exist = await documentosRepository.DocumentoExists(idDocumento);
        if (!exist)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "El documento no existe" });
        }

        await documentosRepository.DeleteDocumento(idDocumento);
    }

    public async Task UpdateDocumento(Guid id, DocumentoRequest documento)
    {
        var exist = await documentosRepository.DocumentoExists(id);
        if (!exist)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "El documento no existe" });
        }

        try
        {
            var doc = mapper.DocumentoRequestToEntity(documento);
            var items = documento.Items.Select(mapper.ItemRequestToEntity).ToList();
            await documentosRepository.UpdateDocumento(id, doc);
            await itemsRepository.UpdateItems(id, items);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new MiddlewareException(HttpStatusCode.InternalServerError,
                new { message = "Error al actualizar el documento" });
        }
    }

    public async Task<Company?> GetCompanyInfo() => await companyRepository.GetCompanyInfo();

    private static string GetQueryParams(TipoDocumento? tipo, DocumentoSort? sortBy, bool descending)
    {
        List<string> queryParams = [];
        if(tipo.HasValue && tipo != TipoDocumento.None) queryParams.Add($"tipo={tipo.ToString()}");
        if (sortBy.HasValue) queryParams.Add($"sortBy={sortBy.ToString()}");
        if(descending) queryParams.Add("desc=true");
        return string.Join('&', queryParams);
    }
}