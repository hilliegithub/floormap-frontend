import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorMapSelectComponent } from './floor-map-select.component';

describe('FloorMapSelectComponent', () => {
  let component: FloorMapSelectComponent;
  let fixture: ComponentFixture<FloorMapSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloorMapSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloorMapSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
