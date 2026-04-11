using Microsoft.EntityFrameworkCore;
using ReformasRapBackend.Data;
using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Companies;

public class CompanyRepository(AppDbContext context) : ICompanyRepository
{
    public async Task<Company> GetCompanyInfo() => await context.Companies.FirstOrDefaultAsync();
}