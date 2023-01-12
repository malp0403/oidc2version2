
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/common/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private anonHeaders: HttpHeaders;
  private authHeaders: HttpHeaders;
  private authHeadersFile: HttpHeaders;
  private authOptions: any;
  public authToken: any;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.anonHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.authToken = this.auth.accessToken;
    console.log("accessToken: ", this.auth.accessToken);

    this.authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.accessToken
    });
    this.authHeadersFile = new HttpHeaders({

      'Authorization': 'Bearer ' + this.auth.accessToken
    });
    this.authOptions = { headers: this.authHeaders };
  }

  public get(path: string, options?: any): Observable<any> {
    options = Object.assign({}, this.authOptions, options)
    return this.http
      .get(path, options)
    // .share()
    // .catch((error: any) => {
    //   return this.handleError(error);
    // });
  }

  public post(path: string, model: any, options?: any): Observable<any> {
    options = Object.assign({}, this.authOptions, options)
    return this.http
      .post(path, model, options)
    // .share()
    // .catch((error: any) => {
    //   return this.handleError(error);
    // });
  }
}