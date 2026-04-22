using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace ReformasRapBackend.Utils;

public static class QuestPdfCustomExtensions
{
    public static void IconText(this IContainer container, string icon, string text)
    {
        container.Row(row =>
            {
                row.ConstantItem(4, Unit.Millimetre).AlignMiddle().Image(icon);
                row.ConstantItem(5);
                row.RelativeItem().AlignMiddle().Text(text);
            }
        );
    }
}