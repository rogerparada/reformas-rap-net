using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Data;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Items;

public class ItemsRepository(AppDbContext context) : IItemsRepository
{
    public bool SaveChanges() => context.SaveChanges() >= 0;

    public async Task<IEnumerable<Item>> GetItemsByDocumentId(Guid documentId) =>
        await context.Items.Where(i => i.IdDocumento == documentId).ToListAsync();

    public Item? GetItem(Guid id) => context.Items.FirstOrDefault(i => i.Id == id);

    public async Task AddItem(Item item)
    {
        ArgumentNullException.ThrowIfNull(item);
        await context.Items.AddAsync(item);
    }

    public void UpdateItem(Item item)
    {
        throw new NotImplementedException();
    }

    public void DeleteItem(Guid id)
    {
        var item = GetItem(id);
        if (item != null) context.Remove(item);
    }

    public async Task<int> AddItems(Guid documentId, IEnumerable<Item> items)
    {
        foreach (var item in items)
        {
            item.IdDocumento = documentId;
            item.Created = DateTime.UtcNow;
            await context.AddAsync(item);
        }

        return await context.SaveChangesAsync();
    }

    public async Task DeleteItemsByDocumentId(Guid documentId)
    {
        var items = context.Items.Where(i => i.IdDocumento == documentId);
        context.RemoveRange(items);
        await context.SaveChangesAsync();
    }

    public async Task UpdateItems(Guid documentId, IEnumerable<Item> items)
    {
        var currentItems = await context.Items.Where(i => i.IdDocumento == documentId).ToListAsync();
        var itemsList = items.ToList();
        var ids = itemsList.Select(i => i.Id);
        var itemsToDelete = currentItems.Where(i => !ids.Contains(i.Id));
        context.RemoveRange(itemsToDelete);
        
        foreach (var item in items)
        {
            var exist = currentItems.FirstOrDefault(i => i.Id == item.Id);
            if (exist is null)
            {
                item.IdDocumento = documentId;
                item.Created = DateTime.UtcNow;
                context.Add(item);
            }
            else
            {
                exist.Description = item.Description;
                exist.Price = item.Price;
                exist.Quantity = item.Quantity;
                exist.Updated = DateTime.UtcNow;
            }
        }
        
        await context.SaveChangesAsync();
    }
}