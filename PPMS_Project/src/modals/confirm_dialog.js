import {bindable, inject} from 'aurelia-framework';
import {ModalWizard} from 'modals/modal-wizard';
import { MultiObserver }from 'multi-observer';
import {objBudget} from 'objBudget';
import {DialogController} from 'aurelia-dialog';

@inject(MultiObserver,ModalWizard,objBudget,DialogController)
export class confirm_dialog{
	@bindable _setContent;
	@bindable _setTitle;
	@bindable to;
	@bindable _id;
	showing=false;
	_buttonTitle = 'Search'
	_isDisableElement=true;
	_ModalWizard;
	_width="500";
	_message="";
	_objBudget;
	controller=null;
	constructor(multiObserver,ModalWizard,objBudget,controller){
		
		this.controller=controller;
		
		this._ModalWizard=ModalWizard;
		this._objBudget=objBudget;


		//this._objBudget.OBSERVERS.init_modal.push(() => {
		//	this.InitializeModal();
		//});

		this._objBudget.OBSERVERS.close_modal.push((val) => {
			this.CloseModal(val);
		});

		this._objBudget.OBSERVERS.open_modal_message.push((val1,val2,val3) => {
			this.OpenModal(val1,val2,val3);
		});

		this._objBudget.OBSERVERS.enable_modal_button.push((val1,val2) => {
			this.OpenModal(val1,val2);
		});
		
	}


  activate(message)
  {
    this._message=message;
  }

  /////cannot use this
	//@handle('init.modal')
    InitializeModal() {
			//this._setTitle = this.to.title;
			//this._id = this.to.id;
			//this._width= this.to.width;

			//if(this.to.display=="none")
			//{
			//	$(this.btnRef).css("visibility","hidden");
			//	this._buttonTitle = "";
			//}
    }


	//@handle('close.modal')
    CloseModal(id) {
    	if(this._id==id)
    		this.showing=false;

    	this._ModalWizard.ids.pop();
        //this.messages.push(message);
        //this.dispatcher.dispatch('message.sent', message);
    }

    //@handle('open.modal.message')
    OpenModal(id, title, message) {
    	if(this._id==id)
    	{	
    		this._setTitle=title;
    		this._message=message;
    		this.showDialog();
    		this._ModalWizard.ids.push(this._id);
    	}
    }

    confirm(){

  //   	this._objBudget.OBSERVERS.confirm_dialog.forEach((all)=>{
		// 	all(this._message);
		// });
		this.controller.ok();
		//this._dispatcher.dispatch('confirm.dialog',this._message);
	}


	showDialog() {
		this._setContent = this.to.content;
		//have to do this because theres a problem clicking the modal outside.
		//no sure why this have to be the soltn.
		this.showing = false;
		setTimeout(() => {
			this.showing = true;
			this._ModalWizard.ids.push(this._id);

			if(this.to.cleardispatch!==undefined)
			this._objBudget.OBSERVERS[this.to.cleardispatch].forEach((all) => {
				all();
			});

			//this._dispatcher.dispatch(this.to.cleardispatch);

		}, 10);

	}

	continue(){

	}

	closeModal(){
		this.showing=false;
	}
	
	//@handle('enable.modal.button')
	enableButton(id ,isEnabled){
		if(this._id==id)
		this._isDisableElement=!isEnabled;
	}
}