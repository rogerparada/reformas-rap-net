namespace ReformasRapBackend.Utils;

public record ApiResponse<T>(T Data);

public record ApiResponse(string Message);

public record DocumentApiResponse<T>(int Count, string? Next, string? Previous, T Data );