import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import RFB from '@novnc/novnc/core/rfb.js'

@Component({
  selector: 'app-vnc',
  templateUrl: `./vnc.component.html`,
})
export class VncComponent implements AfterViewInit, OnDestroy {

  rfb: RFB

  @ViewChild('vnc') vncELe!: ElementRef
  height = window.innerHeight

  @HostListener('window:resize')
  _resize() {
    this.height = window.innerHeight
  }

  constructor(
    private route: ActivatedRoute,
  ) { }

  connectRfb(url: string, password: string) {
    if (this.rfb) {
      this.rfb.disconnect()
    }
    this.rfb = new RFB(
      this.vncELe.nativeElement,
      url, {
      credentials: { password: password },
    })
    this.rfb.scaleViewport = true
    this.rfb.background = 'transparent'
    this.rfb.addEventListener('connect', () => {
    })
    this.rfb.addEventListener('disconnect', () => {
    })
    this.rfb.addEventListener('credentialsrequired', () => {
    })
    this.rfb.addEventListener('desktopname', (e: any) => {
    })
  }

  ngAfterViewInit(): void {
    const params = this.route.snapshot.queryParams
    const url = `ws://${location.host}/websockify`
    this.connectRfb(url, params.password)
  }

  ngOnDestroy(): void {
    if (this.rfb) {
      this.rfb.disconnect()
    }
  }

}
