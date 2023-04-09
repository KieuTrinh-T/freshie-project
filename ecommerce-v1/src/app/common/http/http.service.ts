import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OdataParams, OdataResponse, HttpOptions } from './http.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
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
    return this._http.post(url, body, reqOptions);
  }

  protected updateItem<T>(url: string, body: T, headers?: HttpHeaders | null) {
    const reqOptions: HttpOptions = {}
    if (headers) {
      reqOptions['headers'] = headers;
    }
    return this._http.patch(url, body, reqOptions);
  }

  protected deleteItem(url: string, headers?: HttpHeaders | null) {
    const reqOptions: HttpOptions = {}
    if (headers) {
      reqOptions['headers'] = headers;
    }
    return this._http.delete(url, reqOptions);
  }
}
