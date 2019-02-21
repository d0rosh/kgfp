import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthServices } from '../auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup
  sub: Subscription

  constructor(private auth: AuthServices, 
              private router: Router, 
              private route: ActivatedRoute,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });

    this.route.queryParams.subscribe((params: Params)=>{
      console.log(params);
    });
  }

  onSubmit() {
    this.form.disable();
    this.sub = this.auth.signUp(this.form.value)
      .subscribe(
        (data)=>{
          this.router.navigate(['/auth/login'],{
            queryParams: {
              registered: true
            }
          });
        },
        (error)=>{
          this.form.enable();
          this.snackBar.open(error, 'Cancel', {
            duration: 2000,
            panelClass: 'red-snackbar'
          });
        }
      )
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
