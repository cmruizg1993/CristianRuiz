import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.css'
})
export class PagerComponent {
  @Output() pagerUpdate =  new EventEmitter<PagerProperties>();
  @Input() dataLength = 0;
  
  pagerProperties = new PagerProperties();
  
  pages: Page[] = [];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if(this.dataLength > 0){
      const numberOfPages = Math.ceil(this.dataLength/this.pagerProperties.pageSize);
      this.pages = Array(numberOfPages).fill(null).map((x,i)=>{
        const page = new Page();
        page.number = i+1;
        page.isActive = i == 0 ;
        return page;
      });
      //console.log(this.pages)
    }
  }
  updatePage(page: Page){
    this.pagerProperties.page = page.number;
    this.updatePager();
  }
  updatePageSize(event: any){
    this.pagerProperties.page = 1;
    this.pagerProperties.pageSize = event.value;
    this.updatePager();
  }
  updatePager(){
    this.pagerUpdate.emit(this.pagerProperties);
  }
  
}
class PagerProperties{
  page: number = 1;
  pageSize = 5;
}
class Page{
  number: number = 0;
  isActive: boolean = false;
}
