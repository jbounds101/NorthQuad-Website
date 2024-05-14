import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private userSubject = new BehaviorSubject<User>(new User());
	public userObservable:Observable<User>;
	
	constructor(private http:HttpClient) {
		this.userObservable = this.userSubject.asObservable();
	}

	login(userLogin:IUserLogin):Observable<User> {
		return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
			tap({
				next: (user) => {
					// User login was succesful
					this.userSubject.next(user);
				},
				error: (errorResponse) => {
					// User login was not succesful
					alert('User not available!');
				}
			})
		);
	}

	logout() {
		window.location.reload();
	}
}
