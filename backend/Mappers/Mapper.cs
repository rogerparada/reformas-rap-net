using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;


namespace ReformasRapBackend.Mappers;

public class Mapper : IMapper
{
    public ClienteResponse ClienteEntityToResponse(Cliente cliente) => new()
    {
        Id = cliente.Id,
        Name = cliente.Name,
        Email = cliente.Email,
        Phone = cliente.Phone,
        City = cliente.City,
        Address = cliente.Address,
        Nif = cliente.Nif,
        Documentos = cliente.Documentos.Count,
    };

    public FullClienteResponse FullClienteEntityToResponse(Cliente cliente)=> new()
    {
        Id = cliente.Id,
        Name = cliente.Name,
        Email = cliente.Email,
        Phone = cliente.Phone,
        City = cliente.City,
        Address = cliente.Address,
        Nif = cliente.Nif,
        Documentos = cliente.Documentos.Select(DocumentoToInfoResponse).ToList()
    };

    public Cliente ClienteRequestToEntity(ClienteRequest response) => new()
    {
        Name = response.Name,
        Email = response.Email,
        Phone = response.Phone,
        City = response.City,
        Address = response.Address,
        Nif = response.Nif
    };

    public Documento DocumentoRequestToEntity(DocumentoRequest doc) => new()
    {
        NumeroDocumento = doc.NumeroDocumento,
        IdCliente = doc.IdCliente,
        TipoDocumento = doc.TipoDocumento,
        Fecha = doc.Fecha ?? DateTime.UtcNow,
        Iva = doc.Iva ?? false,
        Estado = doc.Estado ?? Estado.Borrador,
    };

    public DocumentoResponse DocumentoToResponse(Documento doc) => new()
    {
        IdDocumento = doc.IdDocumento,
        NumeroDocumento = doc.NumeroDocumento,
        TipoDocumento = doc.TipoDocumento,
        IdCliente = doc.IdCliente,
        Estado = doc.Estado,
        Fecha = doc.Fecha,
        Iva = doc.Iva
    };

    public FullDocumentoResponse FullDocumentoToResponse(Documento doc) => new()
    {
        IdDocumento = doc.IdDocumento,
        NumeroDocumento = doc.NumeroDocumento,
        TipoDocumento = doc.TipoDocumento,
        IdCliente = doc.IdCliente,
        Estado = doc.Estado,
        Fecha = doc.Fecha,
        Iva = doc.Iva,
        Items = doc.Items.Select(ItemToResponse).ToList(),
        Cliente = doc.Cliente != null ? ClienteEntityToResponse(doc.Cliente) : null
    };

    public DocumentoInfoResponse DocumentoToInfoResponse(Documento doc) => new()
    {
        IdDocumento = doc.IdDocumento,
        NumeroDocumento = doc.NumeroDocumento,
        TipoDocumento = doc.TipoDocumento,
        IdCliente = doc.IdCliente,
        Estado = doc.Estado,
        Fecha = doc.Fecha,
        Iva = doc.Iva,
        Total = doc.Items.Aggregate(0.0M,
            (acc, item) => acc + (item.Price * item.Quantity)),
        Cliente = doc.Cliente != null ? doc.Cliente.Name : string.Empty,
    };

    public Item ItemRequestToEntity(ItemRequest item) => new()
    {
        Id = item.Id ?? 0,
        Quantity = item.Quantity,
        Price = item.Price,
        Description = item.Description,
    };

    public ItemResponse ItemToResponse(Item item) => new()
    {
        Id = item.Id,
        Quantity = item.Quantity,
        Price = item.Price,
        Description = item.Description,
    };
}