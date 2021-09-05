import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDialogueComponent } from './dev-dialogue.component';

describe('DevDialogueComponent', () => {
  let component: DevDialogueComponent;
  let fixture: ComponentFixture<DevDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
