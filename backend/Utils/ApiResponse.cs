namespace ReformasRapBackend.Utils;

public record ApiResponse<T>(T Data);

public record ApiResponse(string Message);