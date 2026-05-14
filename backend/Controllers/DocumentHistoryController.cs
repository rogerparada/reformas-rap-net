using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Services.Documentos;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
// [Authorize]
[Produces("application/json")]
// [ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class DocumentHistoryController(IDocumentHistoryService documentHistoryService)
    : ControllerBase
{
    [HttpGet]
    [EndpointDescription("Historial de cambios")]
    public async Task<
        ActionResult<ApiResponse<List<DocumentHistoryResponse>>>
    > GetDocumentHistories()
    {
        var data = await documentHistoryService.GetDocumentHistories();
        return Ok(new { data });
    }
}
