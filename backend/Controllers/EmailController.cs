using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Services.Emails;

namespace ReformasRapBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EmailController(IEmailsService emailsService) : ControllerBase
{
    [HttpGet]
    [EndpointSummary("Listado de emails")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetAll()
    {
        var response = await emailsService.GetEmails();
        return Ok(new { data = response });
    }

    [HttpPost]
    [EndpointSummary("Nuevo email")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> NewEmail([FromBody] EmailRequest email)
    {
        var idEmail = await emailsService.Send(email);
        return Ok(new { idEmail });
    }
}