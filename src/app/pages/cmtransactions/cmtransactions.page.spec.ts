import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CmtransactionsPage } from './cmtransactions.page';

describe('CmtransactionsPage', () => {
  let component: CmtransactionsPage;
  let fixture: ComponentFixture<CmtransactionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmtransactionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CmtransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
