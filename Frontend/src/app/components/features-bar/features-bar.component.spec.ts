import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesBarComponent } from './features-bar.component';

describe('FeaturesBarComponent', () => {
  let component: FeaturesBarComponent;
  let fixture: ComponentFixture<FeaturesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
