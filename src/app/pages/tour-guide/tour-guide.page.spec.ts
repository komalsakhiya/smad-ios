import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TourGuidePage } from './tour-guide.page';

describe('TourGuidePage', () => {
  let component: TourGuidePage;
  let fixture: ComponentFixture<TourGuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourGuidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TourGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
