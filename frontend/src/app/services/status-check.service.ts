import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import ICheck from '../types/check';

@Injectable({
  providedIn: 'root'
})
export class StatusCheckService {
  public endpoint =
    environment.functionEndpoint || 'http://localhost:4200/api/';

  constructor(private httpClient: HttpClient) {}

  public async getLatestCheck(): Promise<ICheck> {
    return (await this.httpClient
      .get(this.endpoint + 'GetLatestCheck')
      .toPromise()) as Promise<ICheck>;
  }

  public async getIncidentsByTimeRange(
    from: Date,
    to: Date
  ): Promise<ICheck[]> {
    return (await this.httpClient
      .get(
        this.endpoint +
          'GetIncidents?fromDate=' +
          from.toISOString() +
          '&toDate=' +
          to.toISOString()
      )
      .toPromise()) as Promise<ICheck[]>;
  }
}
