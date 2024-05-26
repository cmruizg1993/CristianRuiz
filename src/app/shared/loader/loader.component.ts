import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  loading = false;
  constructor(private loaderService: LoaderService){
    loaderService.loaderStatus.subscribe(status => this.loading = status)
  }
}
