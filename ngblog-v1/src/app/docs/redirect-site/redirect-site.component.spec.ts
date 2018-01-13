import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectSiteComponent } from './redirect-site.component';

describe('RedirectSiteComponent', () => {
  let component: RedirectSiteComponent;
  let fixture: ComponentFixture<RedirectSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
