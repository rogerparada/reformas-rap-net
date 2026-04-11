using System.ComponentModel.DataAnnotations;

namespace ReformasRapBackend.Models;

public class Company
{
    [Key] public Guid id { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string Web { get; set; }
    public string Nif { get; set; }
}