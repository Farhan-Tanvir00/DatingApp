using System;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class MemberRepository : IMemberRepository
{
    private readonly ApplicationDbContext _context;
    public MemberRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Member?> GetMemberByIdAsync(string id)
    {
        return await _context.Members.FindAsync(id);
    }

    public async Task<IReadOnlyList<Member>> GetMembersAsync()
    {
        return await _context.Members.ToListAsync();
    }

    public async Task<Member?> GetMemberForUpdateAsync(string userId)
    {
        return await _context.Members
                     .Include(m=> m.User)
                     .SingleOrDefaultAsync(m => m.UserId == userId);
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosByMemberIdAsync(string memberId)
    {
        // return await _context.Photos
        //     .Where(p => p.MemberId == memberId)
        //     .ToListAsync();

        return await _context.Members
            .Where(m => m.UserId == memberId)
            .SelectMany(m => m.Photos)
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Update(Member member)
    {
        _context.Entry(member).State = EntityState.Modified;
    }
}
 