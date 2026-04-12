namespace ReformasRapBackend.Data.Dto;

public class ItemResponse
{
    public int Id { get; set; }
    public required string Description { get; set; }
    public decimal? Price { get; set; }
    public decimal? Total { get; set; }
    public int? Quantity { get; set; }

    //public decimal Value => GetTotal();

    // private decimal GetTotal()
    // {
    //     if(!Importe.HasValue && Price.HasValue && Quantity.HasValue)
    //     {
    //         return Price.Value * Quantity.Value;
    //     }
    //     
    //     return Importe ?? 0.0M;
    // }
}