import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectPermalinkComponent } from './redirect-permalink.component';

describe('RedirectPermalinkComponent', () => {
  let component: RedirectPermalinkComponent;
  let fixture: ComponentFixture<RedirectPermalinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectPermalinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectPermalinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
