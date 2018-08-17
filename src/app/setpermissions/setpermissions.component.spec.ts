import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpermissionsComponent } from './setpermissions.component';

describe('SetpermissionComponent', () => {
  let component: SetpermissionsComponent;
  let fixture: ComponentFixture<SetpermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
