import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDigestComponent } from './monthly-digest.component';

describe('MonthlyDigestComponent', () => {
  let component: MonthlyDigestComponent;
  let fixture: ComponentFixture<MonthlyDigestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDigestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDigestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
