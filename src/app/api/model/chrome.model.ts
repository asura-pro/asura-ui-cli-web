export interface ChromeTargetPage {
  id: string
  type: string
  title: string
  url: string
  parentId: string
  description: string
  devtoolsFrontendUrl: string
  webSocketDebuggerUrl: string
}

export interface CtdCommand {
  id: number
  method: string
  params?: object
}

export interface ScreencastFrame {
  data: string // Base64-encoded compressed image
  sessionId: number
  metadata: {
    offsetTop: number
    pageScaleFactor: number
    deviceWidth: number
    deviceHeight: number
    scrollOffsetX: number
    scrollOffsetY: number
    timestamp?: number
  }
}
