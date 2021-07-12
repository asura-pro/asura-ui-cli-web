import { ChromeTargetPage } from './chrome.model'

export interface TaskMeta {
  group: string
  project: string
  taskId: string
  reportId: string
  day: string
  creator: string
}

export interface TaskParams {
  type: number
  params: object
}

export interface TaskDriver {
  host: string
  port: number
  driver: number
  targets: ChromeTargetPage[]
}

export interface TaskInfo {
  meta: TaskMeta
  params: TaskParams
  drivers: TaskDriver[]
  startAt: number
}
