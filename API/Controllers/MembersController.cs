using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class MembersController : BaseApiController
    {
        private readonly IMemberRepository _memberRepository;
        public MembersController(IMemberRepository memberRepository)
        {
            _memberRepository = memberRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            var members = await _memberRepository.GetMembersAsync();
            return Ok(members);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await _memberRepository.GetMemberByIdAsync(id);
            
            if(member == null)
            {
                return NotFound();
            }

            return member;
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetPhotosByMemberId(string id)
        {
            var photos = await _memberRepository.GetPhotosByMemberIdAsync(id);
            return Ok(photos);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDTO memberUpdateDTO)
        {
           var memberId = User.GetMemberID();
        //    if(memberId == null) return BadRequest("No id found in token");

           var member = await _memberRepository.GetMemberForUpdateAsync(memberId);
           if(member == null) return BadRequest("Member not found");

           member.DisplayName = memberUpdateDTO.DisplayName ?? member.DisplayName;
           member.Description = memberUpdateDTO.Description ?? member.Description;
           member.City = memberUpdateDTO.City ?? member.City;
           member.Country = memberUpdateDTO.Country ?? member.Country;

           member.User.DisplayName = memberUpdateDTO.DisplayName ?? member.User.DisplayName;

           _memberRepository.Update(member); //Optional -- for no changes;
              if(await _memberRepository.SaveAllAsync()) return NoContent();
              return BadRequest("Failed to update member");
        }
    }
}
