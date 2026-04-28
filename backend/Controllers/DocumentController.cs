using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Data.Dto;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;
using ReformasRapBackend.Services.Documentos;
using ReformasRapBackend.Utils;

namespace ReformasRapBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
[Produces("application/json")]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class DocumentController(IDocumentosService documentosService) : ControllerBase
{
    [HttpGet]
    [EndpointSummary("Lista de Documentos")]
    [EndpointDescription("Lista de Documentos, admite el filtrado por tipo, ser ordenado por nombre, cliente o fecha")]
    [ProducesResponseType<ApiResponse<List<DocumentoResponse>>>(StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<List<DocumentoResponse>>>> Get(
        [FromQuery] TipoDocumento? tipo,
        [FromQuery] DocumentoSort? orderBy,
        [FromQuery] bool desc
    )
    {
        var data = await documentosService.GetDocumentos(tipo, orderBy, desc);
        return Ok(new { data });
    }


    [HttpGet("info")]
    [EndpointSummary("Lista de informacion de los Documentos")]
    [EndpointDescription("Lista de Documentos, admite el filtrado por tipo")]
    [ProducesResponseType(typeof(ResultApiResponse<List<DocumentoInfoResponse>>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse<List<DocumentoInfoResponse>>>> GetInfo(
        [FromQuery] TipoDocumento tipo = TipoDocumento.None,
        [FromQuery] DocumentoSort sortBy = DocumentoSort.Fecha,
        [FromQuery] bool desc = false,
        [FromQuery] int items =10,
        [FromQuery] int offset = 0)
    {
        var result = await documentosService.GetDocumentosInfo(tipo, sortBy, desc, items, offset);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [EndpointSummary("Buscar documento")]
    [ProducesResponseType(typeof(ApiResponse<FullDocumentoResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiResponse<FullDocumentoResponse>>> Get(Guid id)
    {
        var data = await documentosService.GetDocumento(id);
        return Ok(new { data });
    }

    [HttpPost]
    [EndpointSummary("Crear Documento")]
    [EndpointDescription("Crea un nuevo documento del tipo Factura, Presupuesto o Cuenta de cobro")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiResponse<Guid>>> Post([FromBody] DocumentoRequest documento)
    {
        var idDocumento = await documentosService.CreateDocumento(documento);
        return Created("Client", new { idDocumento });
    }

    [HttpPut("{id:guid}")]
    [EndpointSummary("Modificar Documento")]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApiResponse>> Put(Guid id, [FromBody] DocumentoRequest documento)
    {
        await documentosService.UpdateDocumento(id, documento);
        return Ok(new
        {
            message = "Se ha actualizado el documento"
        });
    }

    [HttpDelete("{id:guid}")]
    [EndpointSummary("Eliminar Documento")]
    [ProducesResponseType(StatusCodes.Status200OK, Description = "Se ha eliminado el documento")]
    [ProducesResponseType(StatusCodes.Status404NotFound, Description = "No encontrado")]
    public async Task<ActionResult<ApiResponse>> Delete(Guid id)
    {
        await documentosService.DeleteDocumento(id);
        return Ok(new { message = "Se ha eliminado el documento" });
    }

    [HttpGet("company")]
    [EndpointSummary("Información de empresa")]
    [ProducesResponseType(typeof(Company), StatusCodes.Status200OK)]
    public async Task<Company?> CompanyInfo() => await documentosService.GetCompanyInfo();
}