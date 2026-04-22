using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Services.Emails;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[Produces("application/json")]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class EmailController(IEmailsService emailsService) : ControllerBase
{
    [HttpGet]
    [EndpointSummary("Listado de emails")]
    [ProducesResponseType(typeof(ApiResponse<List<EmailResponse>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiResponse<List<EmailResponse>>>> GetAll()
    {
        var response = await emailsService.GetEmails();
        return Ok(new { data = response });
    }

    [HttpGet("{id:guid}")]
    [EndpointSummary("Buscar email")]
    [ProducesResponseType(typeof(ApiResponse<EmailResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ApiResponse<EmailResponse>>> Get(Guid id)
    {
        var data = await emailsService.GetEmail(id);
        return Ok(new { data });
    }

    [HttpPost]
    [EndpointSummary("Nuevo email")]
    [ProducesResponseType(typeof(ApiResponse<Guid>),StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ApiResponse<Guid>>> NewEmail([FromBody] EmailRequest email)
    {
        var idEmail = await emailsService.Send(email);
        return Ok(new { idEmail });
    }

    [HttpPut("{id:guid}/edit")]
    [EndpointSummary("Editar email")]
    [ProducesResponseType(typeof(ApiResponse<Guid>),StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ApiResponse<Guid>>> Edit(Guid id, [FromBody] EmailRequest email)
    {
        var idEmail = await emailsService.EditDraft(id, email);
        return Ok(new { data = idEmail });
    }
    
    [HttpPut("{id:guid}/send")]
    [EndpointSummary("Editar y enviar email")]
    [ProducesResponseType(typeof(ApiResponse<Guid>),StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ApiResponse<Guid>>> EditSend(Guid id, [FromBody] EmailRequest email)
    {
        var idEmail = await emailsService.EditAndSend(id, email);
        return Ok(new { data = idEmail });
    }

    [HttpGet("{id:guid}/forward")]
    [EndpointSummary("Reenviar email")]
    [ProducesResponseType(typeof(ApiResponse<Guid>),StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ApiResponse<Guid>>> Forward(Guid id)
    {
        var idEmail = await emailsService.ForwardEmail(id);
        return Ok(new { data = idEmail });
    }
}