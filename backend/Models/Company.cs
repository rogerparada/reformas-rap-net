using System.ComponentModel.DataAnnotations;

namespace ReformasRapBackend.Models;

public class Company
{
    [Key] public Guid id { get; set; }
    public required string Name { get; set; }
    public required string Phone { get; set; }
    public required string Email { get; set; }
    public required string Address { get; set; }
    public required string City { get; set; }
    public required string Web { get; set; }
    public required string Nif { get; set; }
}