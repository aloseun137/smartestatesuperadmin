import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationExpairiedComponent } from './verification-expairied.component';

describe('VerificationExpairiedComponent', () => {
  let component: VerificationExpairiedComponent;
  let fixture: ComponentFixture<VerificationExpairiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationExpairiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationExpairiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
