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

    public Task<Guid> CreateEmail(Email email)
    {
        throw new NotImplementedException();
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