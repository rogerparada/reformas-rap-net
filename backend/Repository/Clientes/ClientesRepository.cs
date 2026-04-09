using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Data;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Clientes;

public class ClientesRepository(AppDbContext context) : IClientesRepository
{
    public async Task<IEnumerable<Cliente>> GetClientes() =>
        await context.Clientes.Include(c => c.Documentos).ToListAsync();

    public async Task<Cliente?> GetCliente(int id) => await context.Clientes.FirstOrDefaultAsync(c => c.Id == id);

    public async Task<Cliente?> FindByEmail(string email) =>
        await context.Clientes.FirstOrDefaultAsync(c => c.Email == email);

    public async Task AddCliente(Cliente cliente)
    {
        var client = await context.Clientes.AddAsync(cliente);
        await context.SaveChangesAsync();
    }

    public async Task UpdateCliente(int id, Cliente cliente)
    {
        var client = await GetCliente(id);
        if (client is not null)
        {
            client.Address = cliente.Address;
            client.City = cliente.City;
            client.Email = cliente.Email;
            client.Name = cliente.Name;
            client.Nif = cliente.Nif;
            client.Phone = cliente.Phone;

            await context.SaveChangesAsync();
        }
    }

    public async Task DeleteCliente(int id)
    {
        var cliente = await GetCliente(id);
        if (cliente is not null)
        {
            context.Clientes.Remove(cliente);
            await context.SaveChangesAsync();
        }
    }
}