namespace ReformasRapBackend.Utils;

public record ApiResponse<T>(T Data);

public record ApiResponse(string Message);

public record ResultApiResponse<T>(int Count, string? Next, string? Previous, T Data );