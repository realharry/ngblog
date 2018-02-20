import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBlogPermalinkComponent } from './ngblog-permalink.component';

describe('NgblogPermalinkComponent', () => {
  let component: NgBlogPermalinkComponent;
  let fixture: ComponentFixture<NgBlogPermalinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBlogPermalinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBlogPermalinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
