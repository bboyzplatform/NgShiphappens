import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMainFieldComponent } from './game-main-field.component';

describe('GameMainFieldComponent', () => {
  let component: GameMainFieldComponent;
  let fixture: ComponentFixture<GameMainFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMainFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMainFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
