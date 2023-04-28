import {InjectionToken} from '@angular/core';
import {environment} from '../../environments/environment';

export const API_URL = new InjectionToken('api url from environment', {
  providedIn: 'root',
  factory: () => environment.apiUrl
});
