using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options)
        : IdentityDbContext<ApplicationUser>(options)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Cliente>().HasMany(c => c.Documentos).WithOne(c => c.Cliente);
            builder.Entity<Cliente>().HasMany(c => c.Emails).WithOne(c => c.Cliente);
            builder.Entity<Documento>().HasMany(d => d.Items).WithOne(d => d.Documento);
            builder.Entity<DocumentHistory>()
                .HasOne(dh => dh.Documento)
                .WithMany(d => d.Historial)
                .HasForeignKey(dh => dh.IdDocumento)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<DocumentHistory>()
                .HasOne(dh => dh.Usuario)
                .WithMany()
                .HasForeignKey(dh => dh.IdUsuario)
                .OnDelete(DeleteBehavior.SetNull);
        }

        public DbSet<Cliente> Clientes { get; set; }

        public DbSet<Documento> Documentos { get; set; }
        public DbSet<DocumentHistory> DocumentHistory { get; set; }

        public DbSet<Item> Items { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<Email> Emails { get; set; }
    }
}
