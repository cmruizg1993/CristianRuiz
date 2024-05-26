import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CristianRuiz';
  subscription = new Subscription();
  loading = true;
  constructor(private loaderService: LoaderService){
    this.subscription = this.loaderService.loaderStatus.subscribe(state => this.loading = state);
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(()=>{
      this.loaderService.currentStatus();
    }, 0)
    
  }
}
