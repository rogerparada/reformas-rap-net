using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Services.Documentos;

namespace ReformasRapBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class DocumentController(IDocumentosService documentosService) : ControllerBase
{
    [HttpGet]
    [EndpointSummary("Lista de Documentos")]
    [EndpointDescription("Lista de Documentos, admite el filtrado por tipo")]
    public async Task<List<DocumentoResponse>> GetByType([FromQuery] TipoDocumento? tipo) => tipo is null
        ? await documentosService.GetDocumentos()
        : await documentosService.GetDocumentosByType(tipo.Value);

    [HttpGet("{id}")]
    [EndpointSummary("Buscar documento")]
    [ProducesResponseType(typeof(FullDocumentoResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(Guid id)
    {
        var doc = await documentosService.GetDocumento(id);
        return Ok(doc);
    }

    [HttpPost]
    [EndpointSummary("Crear Documento")]
    [EndpointDescription("Crea un nuevo documento del tipo Factura, Presupuesto o Cuenta de cobro")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Post([FromBody] DocumentoRequest documento)
    {
        await documentosService.CreateDocumento(documento);
        return Created();
    }

    [HttpPut("{id}")]
    [EndpointSummary("Modificar Documento")]
    public async Task<IActionResult> Put(Guid id, [FromBody] DocumentoRequest documento)
    {
        await documentosService.UpdateDocumento(id, documento);
        return Ok();
    }

    [HttpDelete("{id}")]
    [EndpointSummary("Eliminar Documento")]
    [ProducesResponseType(StatusCodes.Status200OK, Description = "Se ha eliminado el documento")]
    [ProducesResponseType(StatusCodes.Status404NotFound, Description = "No encontrado")]
    public async Task<IActionResult> Delete(string id)
    {
        await documentosService.DeleteDocumento(id);
        return Ok(new { message = "Se ha eliminado el documento" });
    }
}