import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapGenComponent } from './sitemap-gen.component';

describe('SitemapGenComponent', () => {
  let component: SitemapGenComponent;
  let fixture: ComponentFixture<SitemapGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
