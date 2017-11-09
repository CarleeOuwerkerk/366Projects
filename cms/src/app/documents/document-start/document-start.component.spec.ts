import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStartComponent } from './document-start.component';

describe('DocumentStartComponent', () => {
  let component: DocumentStartComponent;
  let fixture: ComponentFixture<DocumentStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
