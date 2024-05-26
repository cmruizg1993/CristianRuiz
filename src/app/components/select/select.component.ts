import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() data: any[] = [];
  @Input() label = '';
  default: any;
  @Output() modelUpdate =  new EventEmitter<any>();
  private privateModel: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.default = this.data.find( d => d.isSelected );
    if(this.default)
        this.model = this.default;
  }
  set model(newModel: any){
    this.privateModel = newModel;
    this.emitUpdate();
  }
  get model(){
    return this.privateModel;
  }
  
  emitUpdate(){
    //console.log(this.model)
    this.modelUpdate.emit(this.model);
  }
}
