using System;
using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static string GetMemberID(this ClaimsPrincipal user)
    {
        return user.FindFirstValue(ClaimTypes.NameIdentifier) ??
        throw new Exception("No NameIdentifier claim found");

        // return user.FindFirstValue(ClaimTypes.NameIdentifier) ?? null;
       
    }
}
