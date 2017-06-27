import {bindable, inject} from 'aurelia-framework';
import {ModalWizard} from 'modals/modal-wizard';
import {MultiObserver}from 'multi-observer';
import {  cache_obj } from 'cache_obj';

@inject(ModalWizard,MultiObserver,cache_obj)
export class modalcontainer{
	@bindable _setContent;
	@bindable _setTitle;
	@bindable to;
	@bindable _id;
	showing=false;
	_buttonTitle = 'Search'
	_isDisableElement=true;
	_ModalWizard;
	_width="900";
	multiObserver;
	_cache_obj = null;
	constructor(ModalWizard,multiObserver,cache_obj){
		this._cache_obj=cache_obj;

		this._ModalWizard=ModalWizard;
		this.multiObserver=multiObserver;

		
		this._cache_obj.OBSERVERS.init_modal.push(() => {
			this.InitializeModal();
		});

		this._cache_obj.OBSERVERS.close_modal.push((val) => {
			this.CloseModal(val);
		});
    	
    	this._cache_obj.OBSERVERS.open_modal.push((val) => {
			this.OpenModal(val);
		});

		this._cache_obj.OBSERVERS.enable_modal_button.push((val1,val2) => {
			this.enableButton(val1,val2);
		});
	}



	//@handle('init.modal')
    InitializeModal() {

    		//console.log(this.to);
    		this._buttonTitle = this.to.buttonTitle;
			this._setTitle = this.to.title;
			this._id = this.to.id;
			this._width= this.to.width;

			if(this.to.display=="none")
			{
				$(this.btnRef).css("visibility","hidden");
				this._buttonTitle = "";
			}
    }


	//@handle('close.modal')
    CloseModal(id) {
    	if(this._id==id)
    		this.showing=false;

    	this._ModalWizard.ids.pop();
        //this.messages.push(message);
        //this.dispatcher.dispatch('message.sent', message);
    }

    //@handle('open.modal')
    OpenModal(id) {

    	// console.log(this._id);
    	// 	console.log(id);
    	if(this._id==id)
    	{
    		//console.log(id);
    		this.showDialog();
    		this._ModalWizard.ids.push(this._id);
    	}
    }

	showDialog() {

		 //console.log(this.multiObserver);
    // this.multiObserver.observe(
    //   [
    //     [this._cache_obj, 'TEST1']
    //   ], (newValue, oldValue) => {

    //   	console.log(2);
    //  	this.showing=false;
    // 	this._ModalWizard.ids.pop();

    //   });

		this._setContent = this.to.content;
		//have to do this because theres a problem clicking the modal outside.
		//no sure why this have to be the soltn.
		this.showing = false;

		// window.setTimeout(() => {
		// 	console.log("Passed dialog3");
		// 	this.showing = true;
		// 	this._ModalWizard.ids.push(this._id);
		// 	this._dispatcher.dispatch(this.to.cleardispatch);
		// }, 1000);

		setTimeout(() => {
			this.showing = true;
			this._ModalWizard.ids.push(this._id);

			//this._cache_obj.CALLER.ACTION=this.to.cleardispatch;

			if(this.to.cleardispatch!==undefined)
			this._cache_obj.OBSERVERS[this.to.cleardispatch].forEach((all) => {
				all();
			});


			//this._dispatcher.dispatch(this.to.cleardispatch);
		}, 500);

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