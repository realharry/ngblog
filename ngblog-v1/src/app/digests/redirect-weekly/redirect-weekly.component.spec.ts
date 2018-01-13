import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectWeeklyComponent } from './redirect-weekly.component';

describe('RedirectWeeklyComponent', () => {
  let component: RedirectWeeklyComponent;
  let fixture: ComponentFixture<RedirectWeeklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectWeeklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
