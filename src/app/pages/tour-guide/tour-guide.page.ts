import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/service/get-data.service';

@Component({
  selector: 'app-tour-guide',
  templateUrl: './tour-guide.page.html',
  styleUrls: ['./tour-guide.page.scss'],
})
export class TourGuidePage implements OnInit {
  success;
  tourData: any = [];
  inp;
  mobileno = localStorage.getItem('mobileno');
  smtoken = localStorage.getItem('smtoken');
  sliderType: any;
  constructor(
    private DataService: GetDataService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.sliderType = this.route.snapshot.params.id;
    this.getDetails();
    // localStorage.setItem('guide', '0');
  }

  getDetails() {
    this.inp = {
      reqid: 40975022,
      slider_type: this.sliderType,
      smtoken: this.smtoken,
      mobileno: this.mobileno
    };
    this.DataService.getDetails(this.inp)
      .subscribe(res => {
        this.tourData = res;
        if (this.tourData && this.tourData.length === 1) {
          this.router.navigate(['/tour-guide/slider/' + this.tourData[0].sliderId], {
            state: {
              data: this.tourData[0].sliderName
            }
          });
        }
      }, error => {
        alert('http err');
      });
  }

  completeTour() {
    if (this.mobileno) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  moveToSlider(data) {
    this.router.navigate(['/tour-guide/slider/' + data.sliderId], {
      state: {
        data: data.sliderName
      }
    });
  }
}
