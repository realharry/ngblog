import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectMonthlyComponent } from './redirect-monthly.component';

describe('RedirectMonthlyComponent', () => {
  let component: RedirectMonthlyComponent;
  let fixture: ComponentFixture<RedirectMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
