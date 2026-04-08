using ReformasRapBackend.Data.Dto;

namespace ReformasRapBackend.Services.Clientes;

public interface IClientesService
{
    Task<List<ClienteResponse>> GetAllClientes();
    Task<ClienteResponse> GetClienteById(int id);
    Task CreateCliente(ClienteRequest cliente);
    Task UpdateCliente(int id, ClienteRequest cliente);
    Task DeleteCliente(int id);
}