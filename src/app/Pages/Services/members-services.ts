import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
export interface Member {
  name: string;
  id: string;
  status: 'Active' | 'pending' | 'Expired';
  isTrainer?: boolean;
}  

@Injectable({
  providedIn: 'root',
})
export class MembersServices {
   membersSig = signal<Member[]>([
    { name: 'Sarah Jenkins', id: '#99-281', status: 'Active' },
    { name: 'Marcus Thorne', id: '#99-342', status: 'Active' },
    { name: 'James Doe', id: '#99-321', status: 'pending' },
    { name: 'Emily Watson', id: '#99-882', status: 'Expired' }
  ]);

  // ⭐ OBSERVABLE (for charts / other pages)
  private _members$ = new BehaviorSubject(this.membersSig());
  members$ = this._members$.asObservable();

  // ⭐ DERIVED VALUES
  activeCount = computed(
    () => this.membersSig().filter(m => m.status === 'Active').length
  );

  trainers = computed(
    () => this.membersSig().filter(m => m.isTrainer && m.status === 'Active')
  );

  // ⭐ CRUD OPERATIONS
  add(member: Member) {
    this.membersSig.update(list => [...list, member]);
    this._members$.next(this.membersSig());
  }

  update(member: Member) {
    this.membersSig.update(list =>
      list.map(m => m.id === member.id ? member : m)
    );
    this._members$.next(this.membersSig());
  }

  remove(id: string) {
    this.membersSig.update(list => list.filter(m => m.id !== id));
    this._members$.next(this.membersSig());
  }
}
