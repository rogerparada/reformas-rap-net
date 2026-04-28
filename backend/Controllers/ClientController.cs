using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Services.Clientes;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
[Produces("application/json")]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class ClientController(IClientesService clientesService) : ControllerBase
{
    [HttpGet]
    [EndpointSummary("Ver Clientes")]
    [ProducesResponseType(typeof(ResultApiResponse<List<ClienteResponse>>), StatusCodes.Status200OK )]
    public async Task<ActionResult<ResultApiResponse<List<ClienteResponse>>>> Get(
        [FromQuery] ClienteSort sortBy = ClienteSort.Nombre,
        [FromQuery] bool desc = false,
        [FromQuery] int items =10,
        [FromQuery] int offset = 0
        )
    {
        var response = await clientesService.GetAllClientes(sortBy, desc, items, offset);
        return Ok(response);
    }

    [HttpGet("{id:guid}")]
    [EndpointSummary("Buscar cliente")]
    [ProducesResponseType(typeof(ClienteResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(Guid id)
    {
        var client = await clientesService.GetClienteById(id);
        return Ok(client);
    }

    [HttpPost]
    [EndpointSummary("Agregar cliente")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Consumes("application/json")]
    public async Task<IActionResult> AddCliente(ClienteRequest cliente)
    {
        var idCliente = await clientesService.CreateCliente(cliente);
        return Created("Client", new { idCliente });
    }

    [HttpPut("{id:guid}")]
    [EndpointSummary("Actualizar cliente")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Consumes("application/json")]
    public async Task<IActionResult> Put(Guid id, ClienteRequest cliente)
    {
        await clientesService.UpdateCliente(id, cliente);
        return Ok();
    }

    [HttpDelete("{id:guid}")]
    [EndpointSummary("Eliminar cliente")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        await clientesService.DeleteCliente(id);
        return Ok();
    }
}