using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Data;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Clientes;

public class ClientesRepository(AppDbContext context) : IClientesRepository
{
    public async Task<IEnumerable<Cliente>> GetClientes(ClienteSort? sortBy = null, bool desc = false,  int items = 10, int offset = 0)
    {
        IQueryable<Cliente> clientes = context.Clientes
            .Include(c => c.Documentos);
        clientes = sortBy.HasValue
            ? sortBy switch
            {
                ClienteSort.Email => desc 
                    ? clientes.OrderByDescending(c => c.Email) 
                    : clientes.OrderBy(c => c.Email),
                ClienteSort.Phone => desc 
                    ? clientes.OrderByDescending(c => c.Phone) 
                    : clientes.OrderBy(c => c.Phone),
                ClienteSort.Nombre or _ => desc
                    ? clientes.OrderByDescending(c => c.Name)
                    : clientes.OrderBy(c => c.Name)
            }
            : clientes;
        
        clientes = clientes.Skip(offset).Take(items);

        return await clientes.ToListAsync();
    }

    public async Task<int> GetClientesCount(ClienteSort? sortBy = null, bool desc = false)
    {
        IQueryable<Cliente> clientes = context.Clientes;
            
        clientes = sortBy.HasValue
            ? sortBy switch
            {
                ClienteSort.Email => desc 
                    ? clientes.OrderByDescending(c => c.Email) 
                    : clientes.OrderBy(c => c.Email),
                ClienteSort.Phone => desc 
                    ? clientes.OrderByDescending(c => c.Phone) 
                    : clientes.OrderBy(c => c.Phone),
                ClienteSort.Nombre or _ => desc
                    ? clientes.OrderByDescending(c => c.Name)
                    : clientes.OrderBy(c => c.Name)
            }
            : clientes;

        return await clientes.CountAsync();
    }

    public async Task<Cliente?> GetCliente(Guid id) =>
        await context.Clientes
            .Include(c => c.Documentos)
            .ThenInclude(d => d.Items)
            .FirstOrDefaultAsync(c => c.Id == id);

    public async Task<Cliente?> FindByEmail(string email) =>
        await context.Clientes.FirstOrDefaultAsync(c => c.Email == email);

    public async Task<Cliente?> AddCliente(Cliente cliente)
    {
        cliente.Created = DateTime.UtcNow;
        var client = await context.Clientes.AddAsync(cliente);
        await context.SaveChangesAsync();
        return client.Entity;
    }

    public async Task UpdateCliente(Guid id, Cliente cliente)
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
            client.Updated = DateTime.UtcNow;

            await context.SaveChangesAsync();
        }
    }

    public async Task DeleteCliente(Guid id)
    {
        var cliente = await GetCliente(id);
        if (cliente is not null)
        {
            context.Clientes.Remove(cliente);
            await context.SaveChangesAsync();
        }
    }
}