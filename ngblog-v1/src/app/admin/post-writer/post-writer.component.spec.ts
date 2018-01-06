import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWriterComponent } from './post-writer.component';

describe('PostWriterComponent', () => {
  let component: PostWriterComponent;
  let fixture: ComponentFixture<PostWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostWriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
