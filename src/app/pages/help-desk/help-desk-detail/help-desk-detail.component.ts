import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/service/get-data.service';

@Component({
  selector: 'app-help-desk-detail',
  templateUrl: './help-desk-detail.component.html',
  styleUrls: ['./help-desk-detail.component.scss'],
})
export class HelpDeskDetailComponent implements OnInit {
  ticketId: any;
  dataArr: any = [];
  inp: any;
  mobileno: any;
  smtoken: any;
  ticketDetail: any;
  constructor(
    private DataService: GetDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.ticketDetail = history.state.ticketData;
  }

  ionViewWillEnter() {
    this.ticketId = this.route.snapshot.params.id;
    this.getDetails();
  }

  getDetails() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.inp = {
      reqid: 40975036,
      mobileno: this.mobileno,
      smtoken: this.smtoken,
      ticketId: this.ticketId
    };
    
    this.DataService.getDetails(this.inp)
      .subscribe((res: any) => {
        if (res && res.length) {
          this.dataArr = res;
          this.dataArr.sort((a, b) => {
            return (new Date(b.conversationDate) as any) - (new Date(a.conversationDate) as any);
          });
        }
      }, error => {
        alert('http err');
      });
  }

  replyTicket() {
    this.router.navigate(['help-desk/add-ticket'], { state: { ticketId: this.ticketId } });
  }
}
