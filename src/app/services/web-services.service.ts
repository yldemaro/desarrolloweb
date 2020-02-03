import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class WebServicesService {

	urlVisible = 'http://localhost/desarrolloWeb/public/api/visible';
	urlpesoMax = 'http://localhost/desarrolloWeb/public/api/pesoMax';
	urlcantPer = 'http://localhost/desarrolloWeb/public/api/cantP';
	urlposArriba = 'http://localhost/desarrolloWeb/public/api/arriba';
	urlposAbajo = 'http://localhost/desarrolloWeb/public/api/abajo';
	urlpostMant = 'http://localhost/desarrolloWeb/public/api/mantenimiento';

	constructor(private http: HttpClient) { }




	getVisible() {
		return this.http.get(this.urlVisible);
	}

	getpesoMax() {
		return this.http.get(this.urlpesoMax);
	}

	getcantPersonas() {
		return this.http.get(this.urlcantPer);
	}

	getArriba() {
		return this.http.get(this.urlposArriba);
	}
	getAbajo() {
		return this.http.get(this.urlposAbajo);
	}


	getMant() {
		return this.http.get(this.urlpostMant);
	}



}
