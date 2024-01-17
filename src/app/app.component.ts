import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FloorMapComponent } from './floor-map/floor-map.component';
import { FloorMapSelectComponent } from './floor-map-select/floor-map-select.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FloorMapComponent, ReactiveFormsModule, FloorMapSelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'maplayout';
}
