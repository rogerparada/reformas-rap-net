using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Items;

public interface IItemsRepository
{
    bool SaveChanges();
    Task<IEnumerable<Item>> GetItemsByDocumentId(Guid documentId);
    Item? GetItem(int id);
    Task AddItem(Item item);
    void UpdateItem(Item item);
    void DeleteItem(int id);
    Task<int> AddItems(Guid documentId, IEnumerable<Item> items);
    Task DeleteItemsByDocumentId(Guid documentId);
    Task UpdateItems(Guid documentId, IEnumerable<Item> items);
    
}