using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Data;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Mappers;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Emails;

public class EmailsRepository(AppDbContext context) : IEmailsRepository
{
    public async Task<IEnumerable<Email>> GetAllEmails() => await context.Emails
        .Include(e => e.Cliente)
        .AsNoTracking()
        .ToListAsync();

    public async Task<Email?> GetEmail(Guid id) =>
        await context.Emails
            .Include(e => e.Cliente)
            .Include(e => e.Documento)
            .FirstOrDefaultAsync(e => e.Id == id);

    public async Task<Email?> SaveEmail(Email email)
    {
        var cli = await context.Clientes.FindAsync(email.IdCliente);
        var doc = await context.Documentos.FindAsync(email.Attachment);
        ArgumentNullException.ThrowIfNull(cli);
        ArgumentNullException.ThrowIfNull(doc);
        email.Created = DateTime.UtcNow;
        context.Emails.Add(email);
        await context.SaveChangesAsync();

        return email;
    }

    public async Task<Email> UpdateEmail(Guid id, Email email)
    {
        var mail = await context.Emails.FindAsync(id);
        ArgumentNullException.ThrowIfNull(mail);
        mail.To = email.To;
        mail.Cc = email.Cc;
        mail.Cco = email.Cco;
        mail.Subject = email.Subject;
        mail.Message = email.Message;
        mail.Updated = DateTime.UtcNow;
        mail.Status = Estado.Editado;

        context.Emails.Update(mail);
        await context.SaveChangesAsync();
        return mail;
    }

    public async Task DeleteEmail(Guid id)
    {
        var email = await context.Emails.FindAsync(id);
        if (email is null) return;

        context.Emails.Remove(email);
        await context.SaveChangesAsync();
    }

    public async Task ChangeToSend(Guid id)
    {
        var email = await context.Emails.FindAsync(id);
        if (email is null) return;
        
        email.Status = Estado.Enviado;
        context.Emails.Update(email);
        await context.SaveChangesAsync();
    }
    public async Task ChangeDraftToSend(Guid id)
    {
        var email = await context.Emails.FindAsync(id);
        if (email is null) return;
        
        email.Updated = DateTime.UtcNow;
        email.Status = Estado.Enviado;
        context.Emails.Update(email);
        await context.SaveChangesAsync();
    }
}