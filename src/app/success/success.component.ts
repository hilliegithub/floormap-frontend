import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {

  constructor(private router: Router){}

  goToHome($event: MouseEvent) {
    this.router.navigate(['/floor-map'])
}

}
