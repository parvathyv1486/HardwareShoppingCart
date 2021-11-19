import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error;
  public form : FormGroup;
  constructor(private loginService : LoginService,private route:Router) { }
  
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
          if(res[0]['role'] == 'ADMIN'){
            this.route.navigate(['/addProduct']);
          }
          else{
          this.route.navigate(['/productList']);
          }

        }
        else{
          this.error = "Not a valid user";
        }
      })
    }
  }

}
