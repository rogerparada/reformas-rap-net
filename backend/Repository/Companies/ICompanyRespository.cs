using ReformasRapBackend.Models;

namespace ReformasRapBackend.Repository.Companies;

public interface ICompanyRepository
{
    Task<Company?> GetCompanyInfo();
}