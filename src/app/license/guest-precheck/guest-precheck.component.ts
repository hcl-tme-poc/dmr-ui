import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { OnlineService } from '../../services/online.service';

@Component({
  selector: 'app-guest-precheck',
  templateUrl: './guest-precheck.component.html',
  styleUrls: ['./guest-precheck.component.css']
})
export class GuestPrecheckComponent implements OnInit {

  dlMask = [/\D/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/];

  guestForm: FormGroup;

  @Input()
  driverLicenseNumber: string;

  @Input()
  trilliumNumber: string;

  @Input()
  postCode: string;

  @Input()
  dateOfBirth: string;

  @Output()
  doPreCheck = new EventEmitter();

  @Output()
  valueChanged = new EventEmitter();

  constructor(private fb: FormBuilder, public onlineService: OnlineService) { }

  ngOnInit() {

    this.guestForm = this.initGuestForm();

    if(this.driverLicenseNumber) {
      this.guestForm.get('dlNumber').setValue(this.driverLicenseNumber);
    }
    if(this.trilliumNumber) {
      this.guestForm.get('triulliumNumber').setValue(this.trilliumNumber);
    }
    if(this.postCode) {
      this.guestForm.get('postalCode').setValue(this.postCode);
    }
    if(this.dateOfBirth) {
      this.guestForm.get('dob').setValue(this.dateOfBirth);
    }


    this.guestForm.valueChanges.subscribe(val => {
      this.valueChanged.emit(val);
    });
  }

  submitForm() {

    this.doPreCheck.emit(this.guestForm.value);

  }


  private initGuestForm(): FormGroup {

    return this.fb.group({
      dlNumber:  ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      triulliumNumber: ['', [Validators.required, Validators.minLength(7), Validators.minLength(7)]],
      postalCode: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });

  }

  get dlNumber(): AbstractControl { 
    return this.guestForm.get('dlNumber'); 
  }

  get triulliumNumber(): AbstractControl { 
    return this.guestForm.get('triulliumNumber'); 
  }

  get postalCode(): AbstractControl { 
    return this.guestForm.get('postalCode'); 
  }

  get dob(): AbstractControl { 
    return this.guestForm.get('dob'); 
  }

}
