using System.Net;
using QuestPDF.Fluent;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
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

    public async Task<EmailResponse?> GetEmail(Guid id)
    {
        var email = await emailsRepository.GetEmail(id);
        return email is null
            ? throw new MiddlewareException(HttpStatusCode.NotFound, new { message = "No se encontrado el email" })
            : mapper.EmailEntityToResponse(email);
    }

    public async Task<Guid> Send(EmailRequest email)
    {
        try
        {
            var mail = mapper.EmailRequestToEntity(email);
            var toSend = await emailsRepository.SaveEmail(mail);
            if (toSend is null)
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
            await emailsRepository.ChangeToSend(toSend.Id);

            return toSend.Id;
        }
        catch (ArgumentNullException e)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = e.Message });
        }
        catch (ResendException)
        {
            throw new MiddlewareException(HttpStatusCode.ExpectationFailed, new { message = "Error en el envío, se ha guardado como borrador" });
        }
        catch (Exception) {
            
            throw new MiddlewareException(HttpStatusCode.InternalServerError, new { message = "Server Error" });
        }
    }
    public async Task<Guid> SendEditedDraft(EmailRequest email)
    {
        try
        {
            var mail = mapper.EmailRequestToEntity(email);
            var toSend = await emailsRepository.UpdateEmail(mail.Id, mail);
            if (toSend is null)
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
            await emailsRepository.ChangeToSend(toSend.Id);

            return toSend.Id;
        }
        catch (ArgumentNullException e)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = e.Message });
        }
        catch (ResendException)
        {
            throw new MiddlewareException(HttpStatusCode.ExpectationFailed, new { message = "Error en el envío, se ha guardado como borrador" });
        }
        catch (Exception) {
            
            throw new MiddlewareException(HttpStatusCode.InternalServerError, new { message = "Server Error" });
        }
    }
    public async Task<Guid> ForwardEmail(Guid id)
    {
        try
        {
            var email = await emailsRepository.GetEmail(id);
            if (email is null)
            {
                throw new MiddlewareException(HttpStatusCode.NotFound, new { message = "Email no encontrado" });
            }
            ArgumentNullException.ThrowIfNull(email.Attachment);

            var doc = await pdfDocumentsRepository.GetPdf(email.Attachment.Value);

            if (doc is null)
            {
                throw new MiddlewareException(HttpStatusCode.NotFound,
                    new { message = "No se ha encontrado el documento" });
            }

            var pdf = new PdfDocument(doc);
            var message = await GetMessageAsync(email);
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
            
            if(email.Status == Estado.Borrador)
            {
                await emailsRepository.ChangeDraftToSend(email.Id);
            }
            else
            {
                await emailsRepository.ChangeToSend(email.Id);
            }

            return email.Id;
        }
        catch (ArgumentNullException e)
        {
            throw new MiddlewareException(HttpStatusCode.BadRequest, new { message = e.Message });
        }
        catch (ResendException)
        {
            throw new MiddlewareException(HttpStatusCode.ExpectationFailed, new { message = "Error en el envío, se ha guardado como borrador" });
        }
        catch (Exception) {
            
            throw new MiddlewareException(HttpStatusCode.InternalServerError, new { message = "Server Error" });
        }
    }

    public Task<Guid> Resend(EmailRequest email)
    {
        throw new NotImplementedException();
    }

    private static async Task<EmailMessage> GetMessageAsync(Email email)
    {
        var message = new EmailMessage();

        await message.FromEmailAsync(email);

        return message;
    }
}