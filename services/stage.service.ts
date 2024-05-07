import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  add(data: any) {
    return this.httpClient.post(this.url + '/stage/add/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  update(data: any) {
    return this.httpClient.patch(this.url + '/stage/update/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  getStages() {
    return this.httpClient.get(this.url + '/stage/get/');
  }

  updateStatus(data: any) {
    return this.httpClient.patch(this.url + '/stage/updateStatus/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  delete(id: any) {
    return this.httpClient.delete(this.url + '/stage/delete/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getStagesByCategory(id: any) {
    return this.httpClient.get(this.url + '/stage/getByCategory/' + id);
  }

  getById(id: any) {
    return this.httpClient.get(this.url + '/stage/getById/' + id);
  }
}
