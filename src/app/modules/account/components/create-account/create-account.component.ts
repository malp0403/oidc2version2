import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,private accountSrv:AccountService,private router:Router) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control(null),
      password: this.fb.control(null),

    })
  }

  createAccount(){
    this.accountSrv.createAccount().subscribe(()=>{
      this.router.navigate(["/"]);
    })
    // this.router.navigate(["/"]);

  }



}
