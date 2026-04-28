using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Clientes;

public interface IClientesRepository
{
    Task<IEnumerable<Cliente>> GetClientes(ClienteSort? sortBy = null, bool desc = false, int items = 10, int offset = 0);
    Task<int> GetClientesCount(ClienteSort? sortBy = null, bool desc = false);
    Task<Cliente?> GetCliente(Guid id);
    Task<Cliente?> FindByEmail(string email); 
    Task<Cliente?> AddCliente(Cliente cliente);
    Task UpdateCliente(Guid id, Cliente cliente);
    Task DeleteCliente(Guid id);
}