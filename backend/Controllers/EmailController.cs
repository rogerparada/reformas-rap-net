using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Services.Emails;

namespace ReformasRapBackend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class EmailController(IEmailsService emailsService) : ControllerBase
{
    [HttpGet]
    [EndpointSummary("Listado de emails")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<List<EmailResponse>> GetAll() => await emailsService.GetEmails();

}