import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { IContextMenu, IContextMenuItem } from '../../interfaces/i-context-menu';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subscription, filter, fromEvent, take } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';
import { IEventContextMenu } from '../../interfaces/i-event-context-menu';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {

  @Input() contextMenu!: IContextMenu;

  @Input() showContextMenu$!: Observable<IEventContextMenu> ;
  
  @ViewChild('context')
  context!: TemplateRef<any>;

  overlayRef: OverlayRef | null = null;

  sub!: Subscription;
  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {}
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.showContextMenu$.subscribe(({event, data}) =>{
      this.open(event, data);
    })
  }

  open({ x, y , target}: MouseEvent, data: any){
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });
    
    this.overlayRef.attach(new TemplatePortal(this.context, this.viewContainerRef, {
      $implicit: data
    }));
    
    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          //console.log(clickTarget, this.overlayRef)
          //return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
          return clickTarget != target
        })/*,
        take(1)*/
      ).subscribe(() => this.close())
      
  }
  executeCallBack(item: IContextMenuItem){
    item.action(this.contextMenu.data);
    this.close();
  }
  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
