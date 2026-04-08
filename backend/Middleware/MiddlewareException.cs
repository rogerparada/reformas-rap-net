using System.Net;

namespace ReformasRapBackend.Middleware;

public class MiddlewareException(HttpStatusCode statusCode, object? errors = null) : Exception
{
    public HttpStatusCode StatusCode { get; set; } = statusCode;

    public object? Errors { get; set; } = errors;
}