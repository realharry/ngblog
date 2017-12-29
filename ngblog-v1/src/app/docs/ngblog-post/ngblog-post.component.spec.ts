import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBlogPostComponent } from './ngblog-post.component';

describe('NgBlogPostComponent', () => {
  let component: NgBlogPostComponent;
  let fixture: ComponentFixture<NgBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
