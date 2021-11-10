import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateInfo } from '../models/updateInfo.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() updateInfo: UpdateInfo;
  @Input() users: User[];
  @Output() submitHandler = new EventEmitter<User>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'email': [this.updateInfo.comingFromUpdate ? this.users[this.updateInfo.id].email : '', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[A-Za-z0-9]{8,}$/)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
      'nickname': [this.updateInfo.comingFromUpdate ? this.users[this.updateInfo.id].nickname : '', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]{1,}$/)]],
      'phone': [this.updateInfo.comingFromUpdate ? this.users[this.updateInfo.id].phone : '', [Validators.required, Validators.pattern(/^\+380\d{9}$/)]],
      'website': [this.updateInfo.comingFromUpdate ? this.users[this.updateInfo.id].website : '', [Validators.required, Validators.pattern(/^((https:\/\/)?([\w-]+\.))+[\w]{2,4}$/)]],
      'agreement': [this.updateInfo.comingFromUpdate ? true : false, Validators.requiredTrue]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    })
  }

  private MustMatch(controlName: string, matchingControlName: string) {    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  onSubmit() {
    this.submitHandler.emit({
      updateId: this.updateInfo.id,
      comingFromUpdate: this.updateInfo.comingFromUpdate,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      confirmPassword: this.form.get('confirmPassword')?.value,
      nickname: this.form.get('nickname')?.value,
      phone: this.form.get('phone')?.value,
      website: this.form.get('website')?.value
    })
  }
}
