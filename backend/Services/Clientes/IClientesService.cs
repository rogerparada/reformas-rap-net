using ReformasRapBackend.Data.Dto;

namespace ReformasRapBackend.Services.Clientes;

public interface IClientesService
{
    Task<List<ClienteResponse>> GetAllClientes();
    Task<FullClienteResponse> GetClienteById(Guid id);
    Task CreateCliente(ClienteRequest cliente);
    Task UpdateCliente(Guid id, ClienteRequest cliente);
    Task DeleteCliente(Guid id);
}