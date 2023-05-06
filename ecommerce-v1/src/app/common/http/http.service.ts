import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OdataParams, OdataResponse, HttpOptions } from './http.model';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public baseUrl = 'https://freshie-nrvr.onrender.com';

  constructor(protected _http: HttpClient) { }


  protected getItems<T>(url: string, headers?: HttpHeaders | null, params?: OdataParams | null) {
    const reqOptions: HttpOptions = {}
    if (headers) {
      reqOptions['headers'] = headers;
    }
    if (params) {
      reqOptions['params'] = params;
    }
    return this._http.get<OdataResponse<T[]>>(url, reqOptions);
  }

  protected getItem<T>(url: string, headers?: HttpHeaders | null, params?: any | null) {
    const reqOptions: HttpOptions = {}
    if (headers) {
      reqOptions['headers'] = headers;
    }
    if (params) {
      reqOptions['params'] = params;
    }
    return this._http.get<OdataResponse<T>>(url, reqOptions);
  }

  protected submitItem<T>(url: string, body: T, headers?: HttpHeaders | null) {
    const reqOptions: HttpOptions = {}
    if (headers) {
      reqOptions['headers'] = headers;
    }
    return this._http.post<OdataResponse<T>>(url, body, reqOptions);
  }

  protected updateItem<T>(url: string, body: T, headers?: HttpHeaders | null) {
    const reqOptions: HttpOptions = {}
    if (headers) {
      reqOptions['headers'] = headers;
    }
    return this._http.patch(url, body, reqOptions);
  }


  protected editItem<T>(url: string, body: T, headers?: HttpHeaders | null) {
    const reqOptions: HttpOptions = {}
    if (headers) {
      reqOptions['headers'] = headers;
    }
    return this._http.put(url, body, reqOptions);
  }

  protected deleteItem<T>(url: string, headers?: HttpHeaders | null) {
    const reqOptions: HttpOptions = {}
    if (headers) {
      reqOptions['headers'] = headers;
    }

    return this._http.delete(url, reqOptions);
  }
}
