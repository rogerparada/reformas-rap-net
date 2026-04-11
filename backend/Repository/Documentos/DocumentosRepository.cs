using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Data;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Documentos;

public class DocumentosRepository(AppDbContext context) : IDocumentosRepository
{
    public async Task<IEnumerable<Documento>> GetDocumentos() => await context.Documentos.ToListAsync();

    public async Task<IEnumerable<Documento>> GetDocumentosByType(TipoDocumento tipoDocumento) =>
        await context.Documentos.Where(d => d.TipoDocumento == tipoDocumento).ToListAsync();
    public async Task<IEnumerable<Documento>> GetFullDocumentos() =>
        await context.Documentos
            .Include(d => d.Items)
            .Include(d => d.Cliente)
            .ToListAsync();
    public async Task<IEnumerable<Documento>> GetFullDocumentosByType(TipoDocumento tipoDocumento) =>
        await context.Documentos
            .Include(d => d.Items)
            .Include(d => d.Cliente)
            .Where(d => d.TipoDocumento == tipoDocumento).ToListAsync();

    public async Task<IEnumerable<Documento>> GetDocumentosByIdCliente(Guid idCliente) =>
        await context.Documentos.Where(d => d.IdCliente == idCliente).ToListAsync();

    public async Task<Documento?> GetDocumento(string numeroDocumento) => await
        context.Documentos.FirstOrDefaultAsync(d => d.NumeroDocumento == numeroDocumento);

    public async Task<Documento?> GetDocumento(Guid idDocumento) =>
        await context.Documentos
            .Include(d => d.Items)
            .Include(d => d.Cliente)
            .AsNoTracking()
            .FirstOrDefaultAsync(d => d.IdDocumento == idDocumento);

    public async Task<Documento?> CreateDocumento(Documento doc)
    {
        doc.Created = DateTime.UtcNow;
        var result = await context.Documentos.AddAsync(doc);
        return result.Entity;
    }

    public async Task DeleteDocumento(string id)
    {
        var doc = await GetDocumento(id);
        if (doc is not null)
        {
            context.Documentos.Remove(doc);
            await context.SaveChangesAsync();
        }
    }

    public async Task UpdateDocumento(Guid id, Documento documento)
    {
        var doc = await context.Documentos.FirstOrDefaultAsync(d => d.IdDocumento == id);
        if (doc is not null)
        {
            doc.NumeroDocumento = documento.NumeroDocumento;
            doc.Estado = documento.Estado;
            doc.IdCliente = documento.IdCliente;
            doc.Fecha = documento.Fecha;
            doc.TipoDocumento = documento.TipoDocumento;
            doc.Iva = documento.Iva;
            doc.Updated = DateTime.UtcNow;

            context.Documentos.Update(doc);
            await context.SaveChangesAsync();
        }
    }

    public async Task<bool> DocumentoExists(string numeroDocumento) =>
        await context.Documentos.AnyAsync(d => d.NumeroDocumento == numeroDocumento);

    public async Task<bool> DocumentoExists(Guid idDocumento) =>
        await context.Documentos.AnyAsync(d => d.IdDocumento == idDocumento);
}