import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member } from '../../types/member';
import { Photo } from '../../types/photo';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  public editMode = signal<boolean>(false);
  public member = signal<Member | null>(null);

  getMembers() {
    return this.httpClient.get<Member[]>(this.baseUrl + 'members');
  }
  getMember(id: string) {
    return this.httpClient.get<Member>(this.baseUrl + 'members/' + id).pipe(
      tap((member) => {
        this.member.set(member);
      }),
    );
  }
  getMemberPhotos(id: string) {
    return this.httpClient.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');
  }
  updateMember(editableMember: EditableMember) {
    return this.httpClient.put(this.baseUrl + 'members', editableMember);
  }
}
