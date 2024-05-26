import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label = 'Botón'
  @Input() primary?: boolean;
  @Input() disabled?: boolean ;
  @Input() class = '';
  @Output() onClick = new EventEmitter();

  click(){
    this.onClick.emit();
  }
}
