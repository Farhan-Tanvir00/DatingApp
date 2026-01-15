using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedData(ApplicationDbContext context)
    {
        if(context.Users.AnyAsync().Result) return;

        var path = Path.Combine(
            AppContext.BaseDirectory,
            "Data",
            "UserSeedData.json"
        );

        var memberData = await File.ReadAllTextAsync(path);
        var members = JsonSerializer.Deserialize<List<SeedUserDto>>(memberData);

        if(members == null)
        {
            Console.WriteLine("Failed to deserialize member data.");
            return;
        }


        foreach(var member in members)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Id = member.Id,
                Email = member.Email,
                DisplayName = member.DisplayName,
                ImageUrl = member.ImageUrl,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                
                Member = new Member
                {
                    UserId = member.Id,
                    DisplayName = member.DisplayName,
                    DateOfBirth = member.DateOfBirth,
                    City = member.City,
                    Country = member.Country,
                    Gender = member.Gender,
                    Created = member.Created,
                    Description = member.Description,
                    ImageUrl = member.ImageUrl,
                    LastActive = member.LastActive
                }
            };

            user.Member.Photos.Add(new Photo
            {
                Url = member.ImageUrl!,
                MemberId = member.Id,
            });

            context.Users.Add(user);
        }

        await context.SaveChangesAsync();

    }
}
