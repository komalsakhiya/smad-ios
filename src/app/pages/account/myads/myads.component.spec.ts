import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyadsComponent } from './myads.component';

describe('MyadsComponent', () => {
  let component: MyadsComponent;
  let fixture: ComponentFixture<MyadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyadsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
