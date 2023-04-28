import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payload} from './models/payload';
import {map, Observable, tap} from 'rxjs';
import {Completions} from './models/completions.response';
import {Data, Models} from './models/models';
import {API_URL} from './tokens';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  private apiUrl = inject(API_URL);
  private httpClient = inject(HttpClient)

  constructor(
    // private httpClient: HttpClient,
    // @Inject(API_URL) private apiUrl: string
  ) { }

  getCompletions(payload: Payload): Observable<string[]> {
    // let headers = new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   'Authorization': 'Bearer ' + this.apiKey
    // });
    // // headers.append('Content-Type', 'application/json');
    // // headers.append('Authorization', `Bearer ${this.apiKey}`);
    // // console.log(headers)
    return this.httpClient.post<Completions>(`${this.apiUrl}completions`, payload, {
      // headers: {},
      // params: {},
      // observe: 'body'
    }).pipe(
      map(r => r.choices.map(c => c.text))
    )
  }

  getModels(): Observable<Data[]> {
    // let headers = new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   'Authorization': 'Bearer ' + this.apiKey
    // });
    return this.httpClient.get<Models>(`${this.apiUrl}models`, {
      // observe: 'response',
      // responseType: 'text'
    }).pipe(
      tap(console.log),
      map(m => m.body!.data)
    )
  }
}
