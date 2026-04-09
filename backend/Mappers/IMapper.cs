using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Mappers;

public interface IMapper
{
    ClienteResponse ClienteEntityToResponse(Cliente cliente);
    Cliente ClienteRequestToEntity(ClienteRequest response);
    Documento DocumentoRequestToEntity(DocumentoRequest doc);
    DocumentoResponse DocumentoToResponse(Documento doc);
    FullDocumentoResponse FullDocumentoToResponse(Documento doc);
    DocumentoInfoResponse DocumentoToInfoResponse(Documento doc);
    Item ItemRequestToEntity(ItemRequest item);
    ItemResponse ItemToResponse(Item item);
}