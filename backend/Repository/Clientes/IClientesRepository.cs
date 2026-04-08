using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Clientes;

public interface IClientesRepository
{
    Task<IEnumerable<Cliente>> GetClientes();
    Task<Cliente?> GetCliente(int id);
    Task<Cliente?> FindByEmail(string email); 
    Task AddCliente(Cliente cliente);
    Task UpdateCliente(int id, Cliente cliente);
    Task DeleteCliente(int id);
}