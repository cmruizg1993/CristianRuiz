import { TestBed } from '@angular/core/testing';
import { LoaderService } from '../../src/app/services/loader.service';
import { Observable, firstValueFrom } from 'rxjs';



describe('TestService', () => {
  let service: LoaderService;
  let loader$: Observable<boolean>;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    //TestBed.inject(HttpClient);
    service = TestBed.inject(LoaderService);
    
  });

  it('Se debe crear el servicio LoaderServices', () => {
    expect(service).toBeTruthy();
  });
  it('Se debe emitir true', (done) => {
    loader$ = service.loaderStatus;
    firstValueFrom(loader$).then(value =>{
        expect(value).toBeTruthy();
        done();
    } )
    service.showLoader();
  });
  it('Se debe emitir false', (done) => {
    loader$ = service.loaderStatus;
    firstValueFrom(loader$).then(value =>{
        expect(value).toBeFalsy();
        done();
    } )
    service.closeLoader();
  });
  

});
