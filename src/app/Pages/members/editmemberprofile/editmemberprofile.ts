import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editmemberprofile',
  imports:  [FormsModule],
  templateUrl: './editmemberprofile.html',
  styleUrl: './editmemberprofile.css',
})
export class Editmemberprofile {
  profile: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router) {

    const id = this.route.snapshot.params['id'];


    this.profile = {
      id,
      name: 'Sarah Jenkins',
      location: 'NYC Downtown',
      age: 28,
      membership: 'Platinum'
    };
  }

  save() {
    // TODO: Update service / API
    console.log('Updated Profile', this.profile);
    this.router.navigate(['/profile', this.profile.id]); // back to profile page
  }

  back() {
    this.router.navigate(['/profile', this.profile.id]);
  }
}

