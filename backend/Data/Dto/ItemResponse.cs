namespace ReformasRapBackend.Data.Dto;

public class ItemResponse
{
    public int Id { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }

    public decimal Total => GetTotal();

    public int Quantity { get; set; }

    public decimal Value => GetTotal();

    private decimal GetTotal() => Quantity == 0 ? Price : Price * Quantity;
}