using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using ReformasRapBackend.Enums;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Data.Interceptors;

public class DocumentHistoryInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(
        DbContextEventData eventData,
        InterceptionResult<int> result
    )
    {
        HistoryChanges(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default
    )
    {
        HistoryChanges(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void HistoryChanges(DbContext? context)
    {
        if (context == null)
            return;

        var entries = context
            .ChangeTracker.Entries()
            .Where(e =>
                e.Entity is Documento
                && (e.State == EntityState.Modified || e.State == EntityState.Added)
            )
            .Select(entry => new DocumentHistory
            {
                IdDocumento = (Guid)entry.Property("IdDocumento").CurrentValue!,
                NumeroDocumento = (string)entry.Property("NumeroDocumento").CurrentValue!,
                Tipo = (TipoDocumento)entry.Property("TipoDocumento").CurrentValue!,
                IdUsuario = (string)entry.Property("IdUsuario").CurrentValue!,
                Accion = entry.State == EntityState.Added ? Actions.Crear : Actions.Editar,
                Created = DateTime.UtcNow,
            })
            .ToList();

        context.Set<DocumentHistory>().AddRange(entries);
    }
}
