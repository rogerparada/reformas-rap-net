using System.Net;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Mappers;
using ReformasRapBackend.Middleware;
using ReformasRapBackend.Models;
using ReformasRapBackend.Repository.Clientes;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Services.Clientes;

public class ClientesService(IClientesRepository clientesRepository,IConfiguration configuration, IMapper mapper) : IClientesService
{
    public async Task<ResultApiResponse<List<ClienteResponse>>> GetAllClientes(ClienteSort? sortBy = null, bool desc = false, int items = 10, int offset = 0)
    {
        var clients = await clientesRepository.GetClientes(sortBy, desc, items, offset);
        var clientes = clients as IList<Cliente> ?? clients.ToList();
        var clientesResponse = !clientes.Any() 
            ? [] 
            : clientes.Select(mapper.ClienteEntityToResponse).ToList();
        
        var count = await clientesRepository.GetClientesCount(sortBy, desc);
        var queryParams = GetQueryParams(sortBy, desc);
        var url = configuration["ApiSettings:BaseUrl"];
        var next = offset + items < count ? $"{url}/api/Document/info?{queryParams}&offset={offset+items}&items={items}" : null;
        var previous = offset > 0 ? $"{url}/api/Document/info?{queryParams}&offset={offset-items}&items={items}" : null;
        return new ResultApiResponse<List<ClienteResponse>>(count,next, previous, clientesResponse);
    }

   

    public async Task<FullClienteResponse> GetClienteById(Guid id)
    {
        var client = await clientesRepository.GetCliente(id);

        return client is null
            ? throw new MiddlewareException(HttpStatusCode.NotFound, new { message = "No se ha encontrado el cliente" })
            : mapper.FullClienteEntityToResponse(client);
    }

    public async Task<Guid> CreateCliente(ClienteRequest cliente)
    {
        var exist = await clientesRepository.FindByEmail(cliente.Email);
        if (exist is not null)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "Email ya registrado" });
        }
        
        var cli = await clientesRepository.AddCliente(mapper.ClienteRequestToEntity(cliente));

        return cli?.Id  ?? Guid.Empty;
    }
    

    public async Task UpdateCliente(Guid id, ClienteRequest cliente)
    {
        
        var cli = await clientesRepository.GetCliente(id);
        if (cli is null)
        {
            throw new MiddlewareException(HttpStatusCode.NotFound, new { message = "Cliente no existe" });
        }
        var exist = await clientesRepository.FindByEmail(cliente.Email);
        if (exist is not null && exist.Id != cli.Id)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = "El email ya pertenece a otro cliente" });
        }

        try
        {
            var client = mapper.ClienteRequestToEntity(cliente);
            await clientesRepository.UpdateCliente(id, client);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new MiddlewareException(HttpStatusCode.InternalServerError, new { message = "Server Error" });
        }
    }

    public async Task DeleteCliente(Guid id)
    {
        await GetClienteById(id);
        await clientesRepository.DeleteCliente(id);
    }
    
    private string GetQueryParams(ClienteSort? sortBy, bool descending)
    {
        List<string> queryParams = [];
        if (sortBy.HasValue) queryParams.Add($"sortBy={sortBy.ToString()}");
        if(descending) queryParams.Add("desc=true");
        return string.Join('&', queryParams);
    }
}