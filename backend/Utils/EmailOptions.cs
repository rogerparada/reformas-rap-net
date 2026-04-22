using OneOf;
using ReformasRapBackend.Models;
using Resend;

namespace ReformasRapBackend.Utils;

public static class EmailOptions
{
    public static EmailMessage FromEmail(this EmailMessage emailMessage, Email email)
    {
        emailMessage.To = email.To;
        emailMessage.From = "Reformas RAP <jose@reformasrap.com>";
        emailMessage.Subject = email.Subject;
        emailMessage.Body(email.Message)
            .AddCc(email.Cc)
            .AddCco(email.Cco)
            .AddSignature();

        return emailMessage;
    }

    public static async Task<EmailMessage> FromEmailAsync(this EmailMessage emailMessage, Email email)
    {
        emailMessage.To = email.To;
        emailMessage.From = "Reformas RAP <jose@reformasrap.com>";
        emailMessage.Subject = email.Subject;
        emailMessage
            .Body(email.Message)
            .AddCc(email.Cc)
            .AddCco(email.Cco);

        await emailMessage.AddSignatureAsync();
        return emailMessage;
    }

    private static EmailMessage Body(this EmailMessage emailMessage, string message)
    {
        emailMessage.HtmlBody = FormatMessage(message);

        return emailMessage;
    }

    private static EmailMessage AddCc(this EmailMessage emailMessage, string? emails)
    {
        if (emails is null) return emailMessage;

        var cc = GetEmails(emails);
        emailMessage.Cc = [..cc];

        return emailMessage;
    }

    private static EmailMessage AddCco(this EmailMessage emailMessage, string? emails)
    {
        if (emails is null) return emailMessage;

        var cco = GetEmails(emails);
        emailMessage.Bcc = [..cco];
        return emailMessage;
    }


    private static EmailMessage AddSignature(this EmailMessage emailMessage)
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Resources", "Templates", "Signature.html");
        var signature = File.ReadAllText(path);
        emailMessage.HtmlBody += signature;
        return emailMessage;
    }

    private static async Task<EmailMessage> AddSignatureAsync(this EmailMessage emailMessage)
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Resources", "Templates", "Signature.html");
        var signature = await File.ReadAllTextAsync(path);
        emailMessage.HtmlBody += signature;
        return emailMessage;
    }


    private static string[] GetEmails(string str)
    {
        str = str.Replace(" ", "");
        return (!str.Contains(',')) ? [str] : str.Split(',');
    }


    private static string FormatMessage(string message)
    {
        var lines = message.Split("\n");
        return (lines.Length == 0)
            ? $"<p>{message}</p>"
            : lines.Aggregate("", (current, line) => current + (line + "</p>"));
    }
}