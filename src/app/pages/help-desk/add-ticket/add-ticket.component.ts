import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../service/toast.service';
import { GetDataService } from '../../../service/get-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss'],
})
export class AddTicketComponent implements OnInit {
  ticketForm: FormGroup;
  mobileno: any;
  smtoken: any;
  inp: any;
  ticketTypeArr: any = [];
  ticketId: any;
  subject: any;
  constructor(
    private DataService: GetDataService,
    private toastService: ToastService,
    public router: Router
  ) {
    this.ticketForm = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      ticketTypeId: new FormControl('', [Validators.required])
    });
    this.ticketTypeArr = history.state.data;
    this.ticketId = history.state.ticketId;
    this.subject = history.state?.subject;
    if (this.subject) {
      this.ticketForm.controls.subject.setValue(this.subject);
    }
  }

  ngOnInit() {
    if (!this.ticketTypeArr) {
      this.ticketForm.get('ticketTypeId').setValidators([Validators.nullValidator]);
      this.ticketForm.get('subject').setValidators([Validators.nullValidator]);
      this.ticketForm.controls.ticketTypeId.updateValueAndValidity();
      this.ticketForm.controls.subject.updateValueAndValidity();

    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.ticketForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  addTicket(data) {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    const controls = this.ticketForm.controls;
    // check form
    if (this.ticketForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.inp = {
      reqid: 40975035,
      mobileno: this.mobileno,
      smtoken: this.smtoken,
      ticketId: (this.ticketTypeArr && this.ticketTypeArr.length) ? 0 : this.ticketId,
      ticketTypeId: (!this.ticketTypeArr) ? 0 : data.value.ticketTypeId,
      subject: (!this.ticketTypeArr) ? 0 : data.value.subject,
      description: data.value.description,
    };
    this.DataService.getDetails(this.inp)
      .subscribe((res: any) => {
        if (res.Success === '1') {
          if (!this.ticketTypeArr) {
            this.router.navigate(['help-desk/details/' + this.ticketId]);
          } else {
            this.router.navigate(['help-desk']);
          }
          this.toastService.presentToast('Added Successfully.');
        }
      }, error => {
        alert('http err');
      });
  }
}
