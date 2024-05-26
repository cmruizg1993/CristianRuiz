import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalSettings } from '../../classes/modal-settings';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  
  @Input() modalSettings!: ModalSettings;
  @Input() class?: string;
  show = false;
  ngOnInit(): void {
    this.modalSettings.show$.subscribe(s => {
      this.show = s      
    });
  }
  onCancel(){
    if(this.modalSettings.cancelAction)
      this.modalSettings.cancelAction();
  }
  onConfirm(){
    if(this.modalSettings.confirmAction)
      this.modalSettings.confirmAction();
  }
}
