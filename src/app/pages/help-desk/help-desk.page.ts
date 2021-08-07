import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/service/get-data.service';
// import { TimeAgoPipe } from 'time-ago-pipe';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.page.html',
  styleUrls: ['./help-desk.page.scss'],
})
export class HelpDeskPage implements OnInit {

  items = [];
  ticketTypeData: any = [];
  inp: any;
  mobileno: any;
  smtoken: any;
  type = '0';
  opendTicketArr: any = [];
  closedTicketArr: any = [];
  constructor(
    private DataService: GetDataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getTicketList();
  }

  getTicketList() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.inp = {
      reqid: 40975034,
      mobileno: this.mobileno,
      smtoken: this.smtoken
    };
    this.DataService.getDetails(this.inp)
      .subscribe((res: any) => {
        if (res.Success === '1') {
          this.items = res.ticket_data;
          this.items.sort((a, b) => {
            return (new Date(b.ticketDate) as any) - (new Date(a.ticketDate) as any);
          });
          this.ticketTypeData = res.ticket_type_data;
          this.opendTicketArr = this.items.filter(item => item.status === '0');
          this.closedTicketArr = this.items.filter((item) => item.status === '1');
        }
      }, error => {
        alert('http err');
      });
  }

  addTicket() {
    this.router.navigate(['help-desk/add-ticket'], { state: { data: this.ticketTypeData } });
  }

  navigateToDetail(data) {
    this.router.navigate(['help-desk/details/' + data.ticketId], { state: { ticketData: data } });
  }
}
