using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<AppUser> Users {get; set;}
    public DbSet<Member> Members { get; set; }
    public DbSet<Photo> Photos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        modelBuilder.Entity<Member>()
        .HasKey(m => m.UserId);

        modelBuilder.Entity<AppUser>()
            .HasOne(u => u.Member)
            .WithOne(m => m.User)
            .HasForeignKey<Member>(m => m.UserId)
            .IsRequired();

        modelBuilder.Entity<Member>()
            .HasMany(m => m.Photos)
            .WithOne(p => p.Member)
            .HasForeignKey(p => p.MemberId)
            .IsRequired();
    }
}
