import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from './../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from './../shared/models/user.model';
@Component({
    selector: 'app-login-form',
    templateUrl: './login.component.html',
    // styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loading = false;
    userForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }
    get formInValid() {
        return this.userForm.invalid || this.loading;
    }
    login(user: User) {
        
        this.loading = true;
        this.userService.login(user).subscribe((data) => {
            if (data.access_token === true) this.router.navigateByUrl('/');
            else this.router.navigateByUrl('/login');
          
        }, err => {
            this.loading = false;
        }); 
    }

}

