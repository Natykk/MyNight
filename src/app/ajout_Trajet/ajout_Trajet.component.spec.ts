import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajout_TrajetComponent } from './ajout_Trajet.component';

describe('CovoitComponent', () => {
  let component: Ajout_TrajetComponent;
  let fixture: ComponentFixture<Ajout_TrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ajout_TrajetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ajout_TrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
