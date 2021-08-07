import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayCmCoinComponent } from './pay-cm-coin.component';

describe('PayCmCoinComponent', () => {
  let component: PayCmCoinComponent;
  let fixture: ComponentFixture<PayCmCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayCmCoinComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayCmCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
