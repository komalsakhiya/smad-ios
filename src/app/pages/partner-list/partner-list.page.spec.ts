import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartnerListPage } from './partner-list.page';

describe('PartnerListPage', () => {
  let component: PartnerListPage;
  let fixture: ComponentFixture<PartnerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
