using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Emails;

public interface IEmailsRepository
{
    Task<IEnumerable<Email>> GetAllEmails();
    Task<Email?> GetEmail(Guid id);
    Task<Email?> SaveEmail(Email email);
    Task<Email> UpdateEmail(Guid id, Email email);
    Task DeleteEmail(Guid id);
    Task ChangeToSend(Guid id);
    Task ChangeDraftToSend(Guid id);
}