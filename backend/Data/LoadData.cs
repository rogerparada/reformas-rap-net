using Microsoft.AspNetCore.Identity;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Data;

public class LoadData
{
    public static async Task InsertarData(AppDbContext context, UserManager<ApplicationUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new ApplicationUser()
            {
                UserName = "pruebas",
                Email = "pruebas@mail.com",
            };
            
            await userManager.CreateAsync(user, "PasswordLargo123456$");
        }

        if (!context.Clientes.Any())
        {
            context.Clientes.Add(new()
            {
                Email = "roger.parada10@gmail.com",
                Name = "Roger Parada",
                City = "Majadahonda",
                Address = "Calle de Santa Catalina 28",
                Phone = "663546064"
            });
            
            context.SaveChanges();
        }
    }
}