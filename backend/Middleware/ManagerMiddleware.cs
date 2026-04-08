using System.Net;

namespace ReformasRapBackend.Middleware;

public class ManagerMiddleware(RequestDelegate next, ILogger<ManagerMiddleware> logger)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception e)
        {
            await ManagerExceptionAsync(context, e, logger);
        }
    }

    private async Task ManagerExceptionAsync(HttpContext context, Exception ex, ILogger<ManagerMiddleware> log)
    {
        var (statusCode, responseBody) = ex switch
        {
            MiddlewareException me => (
                (int)me.StatusCode,
                me.Errors ?? "se produjo un error de Middleware"),
            _ => (
                (int)HttpStatusCode.InternalServerError,
                string.IsNullOrEmpty(ex.Message) ? "Error" : ex.Message)
        };

        if (statusCode == 500)
        {
            log.LogError(ex, "Server Error");
        }
        else
        {
            log.LogWarning(ex, "Middleware Exception");
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        await context.Response.WriteAsJsonAsync(new
        {
            status = statusCode,
            errors = responseBody
        });
    }
}