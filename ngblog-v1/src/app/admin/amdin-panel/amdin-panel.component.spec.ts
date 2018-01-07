import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmdinPanelComponent } from './amdin-panel.component';

describe('AmdinPanelComponent', () => {
  let component: AmdinPanelComponent;
  let fixture: ComponentFixture<AmdinPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmdinPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmdinPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
