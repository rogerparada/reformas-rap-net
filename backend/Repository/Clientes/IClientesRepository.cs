using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Clientes;

public interface IClientesRepository
{
    Task<IEnumerable<Cliente>> GetClientes();
    Task<Cliente?> GetCliente(Guid id);
    Task<Cliente?> FindByEmail(string email); 
    Task<Cliente?> AddCliente(Cliente cliente);
    Task UpdateCliente(Guid id, Cliente cliente);
    Task DeleteCliente(Guid id);
}