using System;
using API.DTOs;
using API.Entities;
using API.Services.TokenService;

namespace API.Entensions;

public static class AppUserExtension
{
    public static UserDTO ToDTO(this AppUser user, ITokenService tokenService)
    {
        return new UserDTO
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user)
        };
    }
}
