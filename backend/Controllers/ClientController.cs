using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Services.Clientes;

namespace ReformasRapBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ClientController(IClientesService clientesService) : ControllerBase
{
    [HttpGet]
    [EndpointSummary("Ver Clientes")]
    public async Task<IEnumerable<ClienteResponse>> Get() => await clientesService.GetAllClientes();

    [HttpGet("{id}")]
    [EndpointSummary("Buscar cliente")]
    [ProducesResponseType(typeof(ClienteResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(int id)
    {
        var client = await clientesService.GetClienteById(id);
        return Ok(client);
    }
    
    [HttpPost]
    [EndpointSummary("Agregar cliente")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddCliente(ClienteRequest cliente)
    {
        await clientesService.CreateCliente(cliente);
        return Created();
    }

    [HttpPut("{id}")]
    [EndpointSummary("Actualizar cliente")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Put(int id, ClienteRequest cliente)
    {
        await clientesService.UpdateCliente(id, cliente);
        return Ok();
    }

    [HttpDelete("{id}")]
    [EndpointSummary("Eliminar cliente")]
    public async Task<IActionResult> Delete(int id)
    {
        await clientesService.DeleteCliente(id);
        return Ok();
    }

}