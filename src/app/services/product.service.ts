import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, firstValueFrom, map, single } from 'rxjs';
import { Product } from '../classes/product';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  async getProducts(){
    const endpoint = `${environment.apiUrl}/products`;
    const response$ = this.http.get(endpoint).pipe<Product[]>(map((r: any) => r.data));
    return await firstValueFrom(response$);
  }
  async createProduct(product: IProduct){
    const endpoint = `${environment.apiUrl}/products`;
    const response$ = this.http.post(endpoint, product).pipe<any>(map((r: any) => r));
    return await firstValueFrom(response$);
  }
  async editProduct(product: IProduct){
    const endpoint = `${environment.apiUrl}/products/${product.id}`;
    const response$ = this.http.put(endpoint, product).pipe<any>(map((r: any) => r));
    return await firstValueFrom(response$);
  }
  async deleteProduct(product: IProduct){
    const endpoint = `${environment.apiUrl}/products/${product.id}`;
    const response$ = this.http.delete(endpoint).pipe<any>(map((r: any) => r));
    return await firstValueFrom(response$);
  }
  public verificationID(id: string): Observable<boolean>{
    const endpoint = `${environment.apiUrl}/products/verification/${id}`
    const response$ = this.http.get(endpoint, {
      headers: {
        'X-Loader': 'none'
      }
    }).pipe<boolean>(map((r: any) => r));
    return response$;
  }
}
