import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentPagePage } from './rent-page.page';

describe('RentPagePage', () => {
  let component: RentPagePage;
  let fixture: ComponentFixture<RentPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RentPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
