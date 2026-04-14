using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Mappers;
using ReformasRapBackend.Models;
using ReformasRapBackend.Repository.Emails;

namespace ReformasRapBackend.Services.Emails;

public class EmailsService(IEmailsRepository emailsRepository, IMapper mapper) : IEmailsService
{
    public async Task<List<EmailResponse>> GetEmails()
    {
        var emails = await emailsRepository.GetAllEmails();
        var emailResponses = emails as IList<Email> ?? emails.ToList();
        return !emailResponses.Any() ? [] : emailResponses.Select(mapper.EmailEntityToResponse).ToList();
    }

    public Task<EmailResponse?> GetEmail(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<Guid> CreateEmail(Email email)
    {
        throw new NotImplementedException();
    }

    public Task SendEmail(Email email)
    {
        throw new NotImplementedException();
    }
}