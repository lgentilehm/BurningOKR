import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoImprintComponent } from './demo-imprint.component';

describe('DemoImprintComponent', () => {
  let component: DemoImprintComponent;
  let fixture: ComponentFixture<DemoImprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoImprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
