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
        Valor = doc.Items.Aggregate(0.0M,
            (acc, item) => item.Importe > 0 ? acc + item.Importe : acc + (item.Price * item.Quantity)),
        Cliente = doc.Cliente != null ? doc.Cliente.Name : string.Empty,
    };

    public Item ItemRequestToEntity(ItemRequest item) => new()
    {
        Id = item.Id ?? 0,
        Quantity = item.Cantidad ?? 0,
        Price = item.Precio ?? 0.0M,
        Importe = item.Importe ?? 0.0M,
        Descripcion = item.Descripcion,
    };

    public ItemResponse ItemToResponse(Item item) => new()
    {
        Id = item.Id,
        Cantidad = item.Quantity,
        Precio = item.Price,
        Importe = item.Importe,
        Descripcion = item.Descripcion,
    };
}