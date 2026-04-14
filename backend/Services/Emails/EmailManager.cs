using ReformasRapBackend.Models;
using Resend;
using OneOf;

namespace ReformasRapBackend.Services.Emails;

public class EmailManager(IResend resend)
{
    private EmailMessage Message { get; } = new EmailMessage();

    public async Task Send(Email email)
    {
        Message.From = "Reformas RAP <jose@reformasrap.com>";
        Message.To.Add(email.Destination);
        Message.Subject = email.Subject;
        AddCc(email);
        AddCco(email);
        GetBody(email.Message);
        //TODO: Add attachment
        await resend.EmailSendAsync(Message);
    }



    private void GetBody(string message)
    {
        var fullMessage = FormatMessage(message);

        //Todo add Signature
        Message.HtmlBody = fullMessage;
        
    }

    private void AddCc(Email email)
    {
        if (email.Cc is null) return;

        var cc = GetEmails(email.Cc);
        if (cc.IsT1)
        {
            foreach (var se in cc.AsT1)
            {
                Message.Cc?.Add(se);
            }

            return;
        }

        Message.Cc?.Add(cc.AsT0);
    }

    private void AddCco(Email email)
    {
        if (email.Cco is null) return;

        var cco = GetEmails(email.Cco);

        if (cco.IsT1)
        {
            foreach (var se in cco.AsT1)
            {
                Message.Bcc?.Add(se);
            }

            return;
        }

        Message.Bcc?.Add(cco.AsT0);
    }
    
    

    private static OneOf<string, string[]> GetEmails(string str) => (!str.Contains(',')) ? str : str.Split(',');

    private static string FormatMessage(string message)
    {
        var lines = message.Split("\n");
        return (lines.Length == 0)
            ? $"<p>{message}</p>"
            : lines.Aggregate("", (current, line) => current + (line + "</p>"));
    }
}