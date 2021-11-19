import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router'; 
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error;
  public form : FormGroup;
  constructor(private loginService : LoginService,private route:Router,private dataService : DataService) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  
  submit() {
    if (this.form.valid) {
      this.loginService.getUserDetails(this.form.value['email']).subscribe(res=>{
        console.log(res)
        if(res && res.length > 0){
          console.log('sucess');
          localStorage.setItem('userDetails',JSON.stringify(res[0]));
          
          this.route.navigate(['/productList']);
          
          this.dataService.notifySignIn.emit();
        }
        else{
          this.error = "Not a valid user";
        }
      })
    }
  }

}
