import {getLookups} from '../masterfiles';
import {inject, bindable} from 'aurelia-framework';
import {getFilter} from '../helpers';
import _ from 'underscore';
import $ from 'jquery';
//import {Dispatcher, handle} from 'aurelia-flux';  
import {EntityManager, EntityQuery} from '../entity-manager-factory';
import toastr from "toastr";
import {DialogController} from 'aurelia-dialog';

@inject(Element, DialogController)
export class paymentterm {

	varFilterArray = [];
	controller=null;
	constructor(Element, controller) {

		this.controller=controller;
		
		this.varFilterArray=getLookups().PAYMENT_TERM;

	}

	selectedTerm(item){
		
		this.controller.ok(item);

	}

	fnKeyup(evt,item){
		console.log(evt.keyCode);
		if(evt.keyCode==13){
			if(this.varFilterArray.length==1)
			{
				this.selectedIndiv(this.varFilterArray[0])
			}
		}
	}
}
