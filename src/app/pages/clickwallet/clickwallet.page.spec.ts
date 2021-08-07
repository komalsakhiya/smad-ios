import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClickwalletPage } from './clickwallet.page';

describe('ClickwalletPage', () => {
  let component: ClickwalletPage;
  let fixture: ComponentFixture<ClickwalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickwalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClickwalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
