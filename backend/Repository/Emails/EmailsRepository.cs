using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Data;
using ReformasRapBackend.Mappers;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Emails;

public class EmailsRepository(AppDbContext context) : IEmailsRepository
{
    public async Task<IEnumerable<Email>> GetAllEmails() => await context.Emails
        .Include(e => e.Cliente)
        .AsNoTracking()
        .ToListAsync();

    public async Task<Email?> GetEmail(Guid id) => await context.Emails.FindAsync(id);

    public async Task<Guid?> SaveEmail(Email email)
    {
        var cli = await context.Clientes.FindAsync(email.IdCliente);
        var doc = await context.Documentos.FindAsync(email.Attachment);
        ArgumentNullException.ThrowIfNull(cli);
        ArgumentNullException.ThrowIfNull(doc);
        email.Created = DateTime.UtcNow;
        var  id = context.Emails.Add(email);
        context.SaveChangesAsync();

        return id.Entity.Id;
    }

    public Task<Email> UpdateEmail(Guid id, Email email)
    {
        throw new NotImplementedException();
    }

    public Task<Email> DeleteEmail(Guid id)
    {
        throw new NotImplementedException();
    }
}