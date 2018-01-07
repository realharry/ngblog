import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgblogPermalinkComponent } from './ngblog-permalink.component';

describe('NgblogPermalinkComponent', () => {
  let component: NgblogPermalinkComponent;
  let fixture: ComponentFixture<NgblogPermalinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgblogPermalinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgblogPermalinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
