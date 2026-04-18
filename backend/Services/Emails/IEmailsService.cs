using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Services.Emails;

public interface IEmailsService
{
    Task<List<EmailResponse>> GetEmails();
    Task<EmailResponse?> GetEmail(Guid id);
    Task<Guid> Send(EmailRequest email);
}