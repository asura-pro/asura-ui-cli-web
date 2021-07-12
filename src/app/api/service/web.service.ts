import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ApiRes } from '../model/api.model'
import { TaskInfo } from '../model/task.model'
import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class WebService extends BaseService {

  constructor(private http: HttpClient) { super() }

  getTask(id: string) {
    return this.http.get<ApiRes<TaskInfo>>(`${this.API_BASE}/web/${id}`)
  }

}
