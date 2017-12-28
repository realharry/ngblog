import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBlogSiteComponent } from './ngblog-site.component';

describe('SetupDocComponent', () => {
  let component: NgBlogSiteComponent;
  let fixture: ComponentFixture<NgBlogSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBlogSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBlogSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
