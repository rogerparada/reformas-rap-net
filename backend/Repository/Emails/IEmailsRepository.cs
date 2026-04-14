using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Emails;

public interface IEmailsRepository
{
    Task<IEnumerable<Email>> GetAllEmails();
    Task<Email?> GetEmail(Guid id);
    Task<Guid> CreateEmail(Email email);
    Task<Email> UpdateEmail(Guid id, Email email);
    Task<Email> DeleteEmail(Guid id);
}