using API.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API.Services.TokenService;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration; 
    public TokenService(IConfiguration configuration)
    {    
        _configuration = configuration;
    }
    public string CreateToken(AppUser user)
    {
        var tokenKey = _configuration["TokenKey"] ?? string.Empty;

        if (string.IsNullOrEmpty(tokenKey))
        {
            throw new InvalidOperationException("TokenKey is not configured.");
        }
        else if(tokenKey.Length < 64)
        {
            throw new InvalidOperationException("TokenKey must be at least 64 characters long.");
        }

        var key  = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenKey)); //generate a key from the token key

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); //signing credentials using the key and algorithm

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
