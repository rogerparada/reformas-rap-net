using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace ReformasRapBackend.Utils;

public class PdfDocument(PdfDoc doc) : IDocument
{
    private const string Green = "#006630";
    private const string DarkGreen = "#0d542b";
    private const float Border = 0.20F;
    private readonly string _baseDir = AppContext.BaseDirectory;

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            page.Margin(40);
            page.Content().Element(Content);
            page.Footer().Element(Footer);
        });
    }

    private void Header(IContainer container)
    {
        container.Column(col =>
        {
            col.Item()
                .Height(1, Unit.Centimetre)
                .Border(Border, Unit.Millimetre)
                .BorderColor(Green)
                .Background(Green)
                .Row(row =>
                {
                    var imagePath = Path.Combine(_baseDir, "Resources", "Images", "LogoB.png");
                    row.ConstantItem(10);
                    row.ConstantItem(7, Unit.Millimetre).AlignMiddle().Image(imagePath);
                    row.RelativeItem()
                        .PaddingBottom(4)
                        .AlignBottom()
                        .Text($"eformas RAP | {doc.InfoDocument.Tipo}")
                        .FontColor(Colors.White).Bold();
                });

            col.Item().Height(10);
            col.Item().Row(InfoHeader);

            col.Item().Height(10);
            col.Item().Row(InfoFactura);
        });
    }

    private void InfoHeader(RowDescriptor row)
    {
        var company = doc.CompanyInfo;
        var client = doc.ClientInfo;

        row.RelativeItem()
            .PaddingLeft(20)
            .PaddingRight(10)
            .Column(c =>
            {
                c.Item().Text(company.Name).Bold();
                c.Item().IconText(ImagePath( "phone"), company.Phone);
                c.Item().IconText(ImagePath("mail"), company.Email);
                c.Item().IconText(ImagePath("address"), company.Address);
                c.Item().PaddingLeft(16).Text(company.City);
                c.Item().IconText(ImagePath("web"), company.Web);
            });

        row.RelativeItem()
            .PaddingRight(20)
            .PaddingLeft(10)
            .Column(c =>
            {
                c.Item().Text(client.Name).Bold();
                c.Item().IconText(ImagePath("phone"), client.Phone);
                c.Item().IconText(ImagePath("mail"), client.Email);
                c.Item().IconText(ImagePath("address"), client.Address);
                c.Item().PaddingLeft(16).Text(client.City);
                if (!string.IsNullOrEmpty(client.Nif))
                {
                    c.Item().IconText(ImagePath("id"), client.Nif);
                }
            });
        return;

        string ImagePath(string icon) => Path.Combine(_baseDir, "Resources", "Images", $"{icon}.png");
    }
    
    private void InfoFactura(RowDescriptor row)
    {
        row.RelativeItem().Column(col =>
        {
            col.Item()
                .Height(8, Unit.Millimetre)
                .Border(Border, Unit.Millimetre)
                .BorderColor(DarkGreen)
                .Background(Green)
                .AlignCenter()
                .AlignMiddle()
                .Text($"Nº {doc.InfoDocument.Tipo}")
                .FontColor(Colors.White);

            col.Item()
                .Height(8, Unit.Millimetre)
                .Border(Border, Unit.Millimetre)
                .BorderColor(DarkGreen)
                .AlignCenter().AlignMiddle()
                .Text(doc.InfoDocument.Numero);
        });

        row.RelativeItem().Column(col =>
        {
            col.Item()
                .Height(8, Unit.Millimetre)
                .Border(Border, Unit.Millimetre)
                .BorderColor(DarkGreen)
                .Background(Green)
                .AlignCenter()
                .AlignMiddle()
                .Text("Fecha")
                .FontColor(Colors.White);

            col.Item()
                .Height(8, Unit.Millimetre)
                .Border(Border, Unit.Millimetre)
                .BorderColor(DarkGreen)
                .AlignCenter().AlignMiddle()
                .Text(doc.InfoDocument.Fecha.ToShortDateString());
        });

        if (doc.InfoDocument.Iva)
        {
            row.RelativeItem().Column(col =>
            {
                col.Item()
                    .Height(8, Unit.Millimetre)
                    .Border(Border, Unit.Millimetre)
                    .BorderColor(DarkGreen)
                    .Background(Green)
                    .AlignCenter()
                    .AlignMiddle()
                    .Text("DNI")
                    .FontColor(Colors.White);

                col.Item()
                    .Height(8, Unit.Millimetre)
                    .Border(Border, Unit.Millimetre)
                    .BorderColor(DarkGreen)
                    .AlignCenter().AlignMiddle()
                    .Text(doc.InfoDocument.Nif);
            });
        }
    }

    private void Content(IContainer container)
    {
        container.Column(col =>
        {
            col.Item().Element(Header);
            col.Item().Height(1, Unit.Centimetre);
            col.Item().Element(CreateTable);
            col.Item().Element(CreateTableTotals);
            col.Item().Element(Condiciones);
        });
    }

    private void CreateTable(IContainer container)
    {
        container
            .Border(Border, Unit.Millimetre)
            .BorderColor(DarkGreen)
            .Table(table =>
            {
                table.ColumnsDefinition(columns =>
                {
                    columns.RelativeColumn(1.5F);
                    columns.RelativeColumn(0.4F);
                    columns.RelativeColumn(0.2F);
                    columns.RelativeColumn(0.4F);
                });

                table.Header(h =>
                {
                    h.Cell().Element(CellStyle).Text("Descripción").FontColor(Colors.White);
                    h.Cell().Element(CellStyle).Text("Precio").FontColor(Colors.White);
                    h.Cell().Element(CellStyle).Text("Ud.").FontColor(Colors.White);
                    h.Cell().Element(CellStyleEnd).Text("Importe").FontColor(Colors.White);
                    return;

                    static IContainer CellStyle(IContainer container) =>
                        container
                            .DefaultTextStyle(t => t.SemiBold())
                            .Height(8, Unit.Millimetre)
                            .Background(Green)
                            .BorderRight(Border, Unit.Millimetre)
                            .BorderColor(DarkGreen)
                            .AlignCenter()
                            .AlignMiddle();

                    static IContainer CellStyleEnd(IContainer container) =>
                        container
                            .DefaultTextStyle(t => t.SemiBold())
                            .Height(8, Unit.Millimetre)
                            .Background(Green)
                            .BorderColor(DarkGreen)
                            .AlignCenter()
                            .AlignMiddle();
                });

                foreach (var item in doc.Items)
                {
                    table.Cell().Element(CellStyle).AlignLeft().Text(item.Description);
                    table.Cell().Element(CellStyle).Text(FormatCurrency(item.Price));
                    table.Cell().Element(CellStyle).AlignCenter().Text(item.Quantity.ToString());
                    table.Cell().Element(CellStyleEnd).Text(FormatCurrency(item.Total));
                    continue;

                    static IContainer CellStyle(IContainer container) =>
                        container
                            .BorderBottom(Border, Unit.Millimetre)
                            .BorderRight(Border, Unit.Millimetre)
                            .BorderColor(DarkGreen)
                            .Padding(5)
                            .AlignRight();

                    static IContainer CellStyleEnd(IContainer container) =>
                        container
                            .BorderBottom(Border, Unit.Millimetre)
                            .BorderColor(DarkGreen)
                            .Padding(5)
                            .AlignRight();
                }
            });
    }

    private void CreateTableTotals(IContainer container)
    {
        container
            .BorderBottom(Border, Unit.Millimetre)
            .BorderColor(DarkGreen).Table(table =>
            {
                table.ColumnsDefinition(columns =>
                {
                    columns.RelativeColumn();
                    columns.RelativeColumn(0.4F);
                });

                table.Cell().Element(FilaTotalsL).Text("BASE IMPONIBLE").Bold();
                table.Cell().Element(FilaTotalsR).AlignRight().Text(FormatCurrency(doc.Totals.Subtotal)).Bold();
                table.Cell().Element(FilaTotalsL).Text("21% IVA").Bold();
                table.Cell().Element(FilaTotalsR).AlignRight().Text(FormatCurrency(doc.Totals.Iva)).Bold();
                table.Cell().Element(FilaTotalsL).Text("TOTAL").Bold();
                table.Cell().Element(FilaTotalsR).AlignRight().Text(FormatCurrency(doc.Totals.Total)).Bold();

                return;

                static IContainer FilaTotalsL(IContainer container) =>
                    container
                        .BorderBottom(Border, Unit.Millimetre)
                        .BorderLeft(Border, Unit.Millimetre)
                        .BorderColor(DarkGreen)
                        .PaddingVertical(5)
                        .PaddingHorizontal(5);

                static IContainer FilaTotalsR(IContainer container) =>
                    container
                        .BorderBottom(Border, Unit.Millimetre)
                        .BorderRight(Border, Unit.Millimetre)
                        .BorderColor(DarkGreen)
                        .PaddingVertical(5)
                        .PaddingHorizontal(5);
            });
    }

    private void Condiciones(IContainer container)
    {
        container
            .Height(1, Unit.Centimetre)
            .BorderLeft(Border, Unit.Millimetre)
            .BorderRight(Border, Unit.Millimetre)
            .BorderBottom(Border, Unit.Millimetre)
            .BorderColor(DarkGreen)
            .PaddingHorizontal(5)
            .AlignMiddle()
            .Text(t =>
            {
                t.Span("Condiciones de pago: ").Bold();
                t.Span("Se abonara el 40% al inicio de la obra y el resto al final de la misma.");
            });
    }

    private void Footer(IContainer container)
    {
        container.AlignCenter().Text(t =>
        {
            t.CurrentPageNumber();
            t.Span("/");
            t.TotalPages();
        });
    }

    private static string FormatCurrency(decimal value) => $"{Math.Round(value, 2)} €";
}