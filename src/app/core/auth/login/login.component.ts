import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthServices } from '../auth.service';
import { MovieService } from '../../home/movie.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sub: Subscription;
  visible: boolean = false;
  subr: Subscription;
  id: any = null;

  constructor(private auth: AuthServices, 
              private router: Router, 
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });

    this.subr = this.route.queryParams.subscribe((params: Params)=>{
      if(params['registered']){
        this.id = setTimeout(() => this.snackBar.open('You have successfully registered! Now log in!', 'Close', {
          duration: 2000,
          panelClass: 'green-snackbar',
          verticalPosition: 'top'
        }));
      }else if(params['accessDenied']){
        this.id = setTimeout(() => this.snackBar.open('Access Denied!', 'Close', {
          duration: 2000,
          panelClass: 'red-snackbar'
        }));
      }
    });
  }


  onSubmit() {
    this.visible = true;
    this.form.disable();
    this.sub = this.auth.login(this.form.value)
      .subscribe(
        (data)=>{
          this.router.navigate(['/profile']);
        },
        (error)=>{
          this.form.enable();
          this.snackBar.open(error, 'Close', {
            duration: 2000,
            panelClass: 'red-snackbar'
          });
        },
        ()=>{
          this.visible = false;
        }
      )
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
    this.subr.unsubscribe();
    clearTimeout(this.id);
  }

}
