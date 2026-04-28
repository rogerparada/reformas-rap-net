using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Services.Clientes;

public interface IClientesService
{
    Task<ResultApiResponse<List<ClienteResponse>>> GetAllClientes(ClienteSort? sortBy = null, bool desc = false, int items = 10, int offset = 0);
    Task<FullClienteResponse> GetClienteById(Guid id);
    Task<Guid> CreateCliente(ClienteRequest cliente);
    Task UpdateCliente(Guid id, ClienteRequest cliente);
    Task DeleteCliente(Guid id);
}