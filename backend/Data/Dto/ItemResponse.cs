namespace ReformasRapBackend.Data.Dto;

public class ItemResponse
{
    public int Id { get; set; }
    public required string Descripcion { get; set; }
    public decimal? Precio { get; set; }
    public decimal? Importe { get; set; }
    public int? Cantidad { get; set; }

    public decimal Total => GetTotal();

    private decimal GetTotal()
    {
        if(!Importe.HasValue && Precio.HasValue && Cantidad.HasValue)
        {
            return Precio.Value * Cantidad.Value;
        }
        
        return Importe ?? 0.0M;
    }
}