import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtHomePageComponent } from './rt-home-page.component';

describe('RtHomePageComponent', () => {
  let component: RtHomePageComponent;
  let fixture: ComponentFixture<RtHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
