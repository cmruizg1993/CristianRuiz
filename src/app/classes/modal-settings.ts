import { Observable, Subject } from "rxjs";

export class ModalSettings {
    title: string = '';
    content: string = '';
    confirmButton = false;
    cancelButton = false;
    confirmButtonLabel: string = '';
    cancelButtonLabel: string = '';
    
    confirmAction?: CallableFunction;
    cancelAction?: CallableFunction; 

    showModal$ = new Subject<boolean>();
    get show$(): Observable<boolean>{
        return this.showModal$.asObservable();
    }
    open(){
        this.showModal$.next(true)
    }
    close(){
        this.showModal$.next(false);
    }
}
