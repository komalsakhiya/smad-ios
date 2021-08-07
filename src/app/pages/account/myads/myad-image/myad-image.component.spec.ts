import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyadImageComponent } from './myad-image.component';

describe('MyadImageComponent', () => {
  let component: MyadImageComponent;
  let fixture: ComponentFixture<MyadImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyadImageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
