using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReformasRapBackend.Services.PdfDocuments;

namespace ReformasRapBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PdfController(IPdfDocumentsService pdfDocumentsService) : ControllerBase
{
    [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DownloadPdf(Guid id)
    {
        var pdfResponse = await pdfDocumentsService.GetPdf(id);
        var (name, document) = pdfResponse;
        return File(document, "application/pdf", $"{name}.pdf");
    }
    [HttpGet("view/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ViewPdf(Guid id)
    {
        var pdfResponse = await pdfDocumentsService.GetPdf(id);
        var (name, document) = pdfResponse;

        Response.Headers.Append("Content-Disposition", "inline; filename=factura.pdf");
        return File(document, "application/pdf", $"{name}.pdf");
    }
}