import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheTrajetComponent } from './affiche-trajet.component';

describe('AfficheTrajetComponent', () => {
  let component: AfficheTrajetComponent;
  let fixture: ComponentFixture<AfficheTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficheTrajetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficheTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
