import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from '../../../service/get-data.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  slideId: any;
  tourData: any = [];
  inp;
  mobileno = localStorage.getItem('mobileno');
  smtoken = localStorage.getItem('smtoken');
  // imgArr = [
  //   "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
  //   "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bmlnaHR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
  // ];
  slideOpts = {
    initialSlide: 0,
    speed: 300,
  };
  guide: any = localStorage.getItem('guide');
  isFirstTime = false;
  sliderName;
  constructor(
    private route: ActivatedRoute,
    private DataService: GetDataService,
    private router: Router,
    private sanitizer: DomSanitizer

  ) {
    this.slideId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.guide == 1) {
      this.isFirstTime = true;
    }
    this.getDetails();
    this.sliderName = history.state.data;
  }

  getDetails() {
    this.inp = {
      reqid: 40975023,
      smtoken: this.smtoken,
      mobileno: this.mobileno,
      sliderId: this.slideId
    };
    this.DataService.getDetails(this.inp)
      .subscribe(res => {
        this.tourData = res;
      }, error => {
        alert('http err');
      });
  }

  backToHome() {
    this.router.navigate(['/home']);
  }

  getUrl(code) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + code);
  }
}
