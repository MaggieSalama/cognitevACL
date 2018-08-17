import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpermissionsComponent } from './checkpermissions.component';

describe('CheckpermissionsComponent', () => {
  let component: CheckpermissionsComponent;
  let fixture: ComponentFixture<CheckpermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckpermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
