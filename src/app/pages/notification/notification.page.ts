import { Component, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { GetDataService } from '../../service/get-data.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notificationArr = [
    // {
    //   title: 'demo',
    //   notiDate: new Date(),
    //   notiImage: 'noimage',
    //   notificationsId: '1'
    // },
    // {
    //   title: 'demo',
    //   notiDate: new Date(),
    //   notiImage: 'noimage',
    //   notificationsId: '2'
    // },
    // {
    //   title: 'demo',
    //   notiDate: new Date(),
    //   notiImage: 'noimage',
    //   notificationsId: '3'
    // },
    // {
    //   title: 'demo',
    //   notiDate: new Date(),
    //   notiImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLecBCpMMLXmjlAvzkB6RFl5LNF6mN4kHoA&usqp=CAU',
    //   notificationsId: '4'
    // }
  ];
  mobileno: any;
  smtoken: any;
  inp: any;
  success: any;
  selection: boolean = false;
  selectedItem: any = [];
  constructor(
    private DataService: GetDataService,
    private toastService: ToastService,
    private events: EventService
  ) { }

  ngOnInit() {
    this.getNotification();

  }

  removeItem() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    const obj = {
      reqid: 40975021,
      mobileno: this.mobileno,
      smtoken: this.smtoken,
      notiid: this.selectedItem.toString()
    };
    this.DataService.getDetails(obj)
      .subscribe((res: any) => {
        if (res.Success === '1') {
          this.getNotification();
          this.toastService.presentToast('Deleted Successfully');
        }
      }, error => {
        alert('http err');
      });
  }

  getNotification() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.inp = {
      reqid: 40975020,
      mobileno: this.mobileno,
      smtoken: this.smtoken
    };
    this.httpserv();
  }
  async httpserv() {
    this.DataService.getDetails(this.inp)
      .subscribe((data: any) => {
        if (data && data.length) {
          this.notificationArr = data;
        }
        this.events.publish('notiCountEvent', { count: 0 });
      }, error => {
        alert('http err');
      });
  }

  selectItem(index: number, data) {
    this.selection = true;
    data.isSelected = !data.isSelected;
    this.notificationArr[index] = data;
    if (this.selectedItem.indexOf(data.notificationsId) === -1) {
      this.selectedItem.push(data.notificationsId);
    } else {
      this.selectedItem.splice(this.selectedItem.indexOf(data.notificationsId), 1);
    }
  }
}
