using ReformasRapBackend.Models;

namespace ReformasRapBackend.Utils;

public class PdfDoc
{
    public CompanyInfo CompanyInfo { get; init; }
    public ClientInfo ClientInfo { get; init; }
    public InfoDocument InfoDocument { get; init; }
    public List<TableItem> Items { get; init; }
    public Totals Totals { get; private set; }

    private const decimal Iva = 0.21M;

    public PdfDoc(Documento doc, Company company)
    {
        ArgumentNullException.ThrowIfNull(doc.Cliente);

        CompanyInfo = new CompanyInfo(
            Name: company.Name,
            Email: company.Email,
            Phone: company.Phone,
            City: company.City,
            Address: company.Address,
            Web: company.Web);

        ClientInfo = new ClientInfo(
            Name: doc.Cliente.Name,
            Email: doc.Cliente.Email,
            Phone: doc.Cliente.Phone,
            City: doc.Cliente.City,
            Address: doc.Cliente.Address,
            Nif: doc.Cliente.Nif
        );

        InfoDocument = new InfoDocument(
            Numero: doc.NumeroDocumento,
            Nif: company.Nif,
            Iva: doc.Iva,
            Tipo: doc.TipoDocumento,
            Fecha: doc.Fecha
        );

        Items = doc.Items.Select(i =>
            {
                var total = i.Quantity > 0 ? i.Quantity * i.Price : i.Price;
                return new TableItem(
                    Description: i.Description,
                    Price: i.Price,
                    Quantity: i.Quantity,
                    Total: total
                );
            }
        ).ToList();

        var subtotal = Items.Sum(item => item.Total);
        var iva = subtotal * Iva;

        Totals = new Totals(
            Subtotal: subtotal,
            Iva: iva,
            Total: subtotal + iva
        );
    }
}