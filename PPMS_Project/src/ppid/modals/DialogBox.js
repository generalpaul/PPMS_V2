import {inject,ObserverLocator,bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class DialogBox
{
	message="Sample Message";
	title="Sample Title";
	constructor(controller){
		this.controller = controller;	
	}

	activate(info){
		this.message = info.message;
		this.title = info.title;		
	}
}