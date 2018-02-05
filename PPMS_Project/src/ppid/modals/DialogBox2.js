import {inject,ObserverLocator,bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class DialogBox2
{
	message="Sample Message";
	title="Sample Title";
	constructor(controller){
		this.controller = controller;	
	}

	//comment
	activate(info){
		this.message = info.message;
		this.title = info.title;		
	}
}