import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown'
import { ChromeTargetPage, CtdCommand, ScreencastFrame } from 'src/app/api/model/chrome.model'
import { TaskDriver } from 'src/app/api/model/task.model'
import { WebService } from 'src/app/api/service/web.service'
import { newWS } from 'src/app/util/ws'

@Component({
  selector: 'app-web',
  templateUrl: `./web.component.html`,
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvas: ElementRef
  ctx: CanvasRenderingContext2D
  width = 0
  height = 0
  timer: number

  @HostListener('window:resize')
  _resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    if (this.canvas && this.drivers && this.drivers.length > 0) {
      this.canvas.nativeElement.width = this.width
      this.canvas.nativeElement.height = this.height
    }
  }

  id: string
  drivers: TaskDriver[] = []
  ws: WebSocket
  cmdId = 0
  pageId: string

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private route: ActivatedRoute,
    private webService: WebService,
  ) { }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent) {
    this.nzContextMenuService.create($event, menu);
  }

  startScreenCast(page: ChromeTargetPage) {
    this._resize()
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.ws = newWS(`/devtools/page/${page.id}`)
    this.ws.onopen = (_) => {
      this.pageId = page.id
      const cmd: CtdCommand = { id: ++this.cmdId, method: 'Page.startScreencast', params: { "format": "jpeg", "quality": 75, "maxWidth": 1266, "maxHeight": 746 } }
      this.ws.send(JSON.stringify(cmd))
    }
    this.ws.onmessage = (msg) => {
      try {
        const cmd: CtdCommand = JSON.parse(msg.data)
        if ('Page.screencastFrame' === cmd.method) {
          const frame = cmd.params as ScreencastFrame
          if (this.ctx) {
            const image = new Image()
            image.onload = () => {
              this.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.width, this.height)
              if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(`{"id":${++this.cmdId},"method":"Page.screencastFrameAck","params":{"sessionId":${frame.sessionId}}}`)
              }
            }
            image.src = `data:image/jpeg;base64,${frame.data}`
          } else {
            console.error('canvas ctx is null')
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  load(init: boolean) {
    if (this.id) {
      this.webService.getTask(this.id).subscribe(res => {
        const task = res.data
        if (task.drivers && task.drivers.length > 0) {
          this.drivers = task.drivers
          if (init) {
            let page: ChromeTargetPage
            for (let d of this.drivers) {
              if (d.targets && d.targets.length > 0) {
                page = d.targets[0]
                break
              }
            }
            if (page) {
              this.startScreenCast(page)
            }
          }
          this.timer = window.setTimeout((() => { this.load(false) }).bind(this), 5000)
        } else {
          if (this.drivers.length > 0) {
            this.drivers = []
            if (this.canvas) {
              this.ngOnDestroy()
              this.canvas.nativeElement.width = 0
              this.canvas.nativeElement.height = 0
            }
          } else {
            this.timer = window.setTimeout((() => { this.load(true) }).bind(this), 5000)
          }
        }
      })
    }
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params
    this.id = params.id
    this.load(true)
  }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext("2d")
    }

  }

  ngOnDestroy(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    if (this.timer) {
      window.clearInterval(this.timer)
    }
  }

}
