using System.Net;
using QuestPDF.Fluent;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Mappers;
using ReformasRapBackend.Middleware;
using ReformasRapBackend.Models;
using ReformasRapBackend.Repository.Emails;
using ReformasRapBackend.Repository.PdfDocuments;
using ReformasRapBackend.Utils;
using Resend;

namespace ReformasRapBackend.Services.Emails;

public class EmailsService(
    IEmailsRepository emailsRepository,
    IMapper mapper,
    IPdfDocumentsRepository pdfDocumentsRepository,
    IResend resend)
    : IEmailsService
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

    public async Task<Guid> Send(EmailRequest email)
    {
        try
        {
            var toSend = mapper.EmailRequestToEntity(email);
            
            var id = await emailsRepository.SaveEmail(toSend);
            if (id is null)
            {
                throw new MiddlewareException(HttpStatusCode.InternalServerError, new { message = "Server Error" });
            }

            var doc = await pdfDocumentsRepository.GetPdf(email.Attachment);

            if (doc is null)
            {
                throw new MiddlewareException(HttpStatusCode.NotFound,
                    new { message = "No se ha encontrado el documento" });
            }

            var pdf = new PdfDocument(doc);
            var message = await GetMessageAsync(toSend);
            var attachment = pdf.GeneratePdf();

            message.Attachments =
            [
                new EmailAttachment()
                {
                    Filename = $"{doc.InfoDocument.Numero}.pdf",
                    Content = attachment
                }
            ];

            await resend.EmailSendAsync(message);

            return id.Value;
        }
        catch (ArgumentNullException e)
        {
            Console.WriteLine(e);
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = e.Message });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new MiddlewareException(HttpStatusCode.InternalServerError, new { message = "Server Error" });
        }
    }
    
    private static async Task<EmailMessage> GetMessageAsync(Email email)
    {
        var message = new EmailMessage();

        await message.FromEmailAsync(email);

        return message;
    }
}