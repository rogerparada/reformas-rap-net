using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Repository.Clientes;
using ReformasRapBackend.Repository.Documentos;
using ReformasRapBackend.Repository.Emails;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class DashboardController(
    IDocumentosRepository documentosRepository,
    IClientesRepository clientesRepository,
    IEmailsRepository emailsRepository,
    IDocumentHistoryRepository documentHistoryRepository
) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<Dashboard>>> Dashboard()
    {
        var documentos = await documentosRepository.GetDocumentosCount();
        var historial = await documentHistoryRepository.GetHistoriesCount();
        var clientes = await clientesRepository.GetAllClientesCount();
        var emails = await emailsRepository.GetAllEmailsCount();

        Dashboard data = new()
        {
            Clientes = clientes,
            Emails = emails,
            Historial = historial,
            Documentos = documentos,
        };

        return Ok(new { data });
    }
}
