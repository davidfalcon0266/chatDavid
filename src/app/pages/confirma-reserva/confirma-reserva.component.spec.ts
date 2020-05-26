import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaReservaComponent } from './confirma-reserva.component';

describe('ConfirmaReservaComponent', () => {
  let component: ConfirmaReservaComponent;
  let fixture: ComponentFixture<ConfirmaReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
