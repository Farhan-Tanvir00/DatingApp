import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Photo } from '../../../types/photo';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected photos$?: Observable<Photo[]>;

  ngOnInit(): void {
    this.photos$ = this.loadMemberPhotos();
  }

  private loadMemberPhotos() {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (!memberId) {
      return EMPTY;
    }
    return this.memberService.getMemberPhotos(memberId);
  }

  get fakePhotos() {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      url: `/user.png`,
      memberId: 'member1',
    }));
  }
}
