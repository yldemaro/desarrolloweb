import { Component, OnInit } from '@angular/core';
import { WebServicesService } from './services/web-services.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'desarrolloWeb';

	visible: number;
	ramMaxValue: number = 0;
	peso: number;
	numPersonas: number;

	abajo: any;
	arriba: any;
	tipo: string = '';
	mant: number;

	constructor(private services: WebServicesService) { }



	ngOnInit() {
		// console.log(this.abajo);
		this.observable();

	}

	observable() {
		setInterval(() => {
			this.getvisible();
			this.mantenimiento();
			this.cantidadP();
			this.cantidadPersonas();
			this.posicionar();
		}, 5000);
	}


	async mantenimiento() {
		this.services.getMant().subscribe((data: any) => {
			console.log(data[0].mantenimiento);
			if (data[0].mantenimiento === '0') {
				this.mant = 0;
			} else {
				this.mant = 1;
			}

		});
	}


	async getvisible() {

		await this.services.getVisible().subscribe((data: any) => {
			// console.log(data[0].visible);
			if (data[0].visible === '0') {
				let e2 = document.getElementById('visible');
				(<HTMLInputElement>e2).checked = false;
				this.visible = 0;
			} else {
				let e2 = document.getElementById('visible');
				(<HTMLInputElement>e2).checked = true;
				this.visible = 1;
			}
		});
	}

	async cantidadP() {
		await this.services.getcantPersonas().subscribe((data: any) => {
			// console.log(data);
			this.numPersonas = data[0].cantPersonas;
		});
	}


	async delay(ms: number) {
		await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => console.log("fired"));
	}

	async posicionar() {
		document.getElementById('ascensor').style.position = 'absolute';


		await this.services.getArriba().subscribe(async data => {
			// console.log(data[0].arriba);
			this.arriba = data[0].arriba;
			if (this.visible === 1) {
				if (this.mant === 1) {
					if (this.ramMaxValue < 600) {
						document.getElementById('ascensor').style.top = `${this.arriba}%`;
					}
				}
			}

		});

		await this.services.getAbajo().subscribe(async data2 => {
			this.abajo = data2[0].abajo;

			if (this.visible === 1) {
				if (this.mant === 1) {
					if (this.ramMaxValue < 600) {
						document.getElementById('ascensor').style.bottom = `${this.abajo}%`;
					}
				}
			}
		});


	}


	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}


	async cantidadPersonas() {
		this.ramMaxValue = 0;
		if (this.visible === 1) {
			if (this.mant === 1) {
				for (let i = 0; i < this.numPersonas; i++) {
					this.peso = Math.floor(Math.random() * (120 - 40 + 1)) + 60;
					// console.log(this.peso);
					this.ramMaxValue = await this.ramMaxValue + this.peso;
				}
			}
		}
		return this.ramMaxValue;
	}

}
