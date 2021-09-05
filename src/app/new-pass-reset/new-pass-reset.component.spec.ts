import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassResetComponent } from './new-pass-reset.component';

describe('NewPassResetComponent', () => {
  let component: NewPassResetComponent;
  let fixture: ComponentFixture<NewPassResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPassResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPassResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
