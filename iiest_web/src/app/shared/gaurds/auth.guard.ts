import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router)
  let issLoggedIn = sessionStorage.getItem('isLoggedIn');
  let issToken =  sessionStorage.getItem('token');
  if(issLoggedIn == 'false' || issToken == '' || issToken == null){
    _route.navigate(['/main']);
    return false;
  }else{
    return true;
  }
};

export const consumerAuthGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  let consumerAuthToken = localStorage.getItem('consumerAuthToken');
  let consumer = JSON.parse(localStorage.getItem('consumer') || '{}');
  if (consumerAuthToken && consumer && consumer.userType === 'consumer') {
    return true;
  } else {
    _route.navigate(['/main']);
    return false; 
  }
};