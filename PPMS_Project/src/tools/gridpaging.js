import {bindable, inject} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-binding';
import {  objBudget } from 'objBudget';

@inject(ObserverLocator,objBudget)
export class gridpaging{
	
	@bindable to;
	@bindable pageindex;
	@bindable divby;
	showing=false;
	_buttonTitle = 'Search';
	_isDisableElement=true;
	_Pages = [[]];
	_PagesShow = [];
	_currentIndex=0;
	_objBudget;
	constructor(observerLocator,objBudget){
		this._objBudget=objBudget;

		 var subscription = observerLocator
      .getObserver(this, 'to')
      .subscribe(()=>{ this.onChange(); });

      	this._objBudget.OBSERVERS.enable_modal_button.push((id, val) => {
			this.enableButton(id,val);
		});

	}

  onChange() 
  {
		try 
		{
			this._Pages = [];
			this._PagesShow = [];
			if (this.to != undefined && this.to != null) {
				
				var intByTmp = 0;
				var intDivTmp = 0;
				this._Pages.push([]);
				
				for (var i = 0; i <= Math.ceil(this.to / this.divby) - 1; ++i) {

					if (intDivTmp >= 10) {

						this._Pages.push([]);
						++intByTmp;
						intDivTmp = 1;

					} else
						++intDivTmp;

					this._Pages[intByTmp].push(i + 1);

				}
				
				this._PagesShow=this._Pages[0];
				this._currentIndex=0;
				this.pageindex=0;
				// console.log(this._Pages.length);
				// console.log(this.to);
			}

		} catch (e) {
			console.log(e);
		}
  }

	endClick(endValue) {

		if (endValue == 0 && this._currentIndex > 0) {
			--this._currentIndex;
		} else if (endValue == 1 && this._currentIndex < this._Pages.length-1) {
			++this._currentIndex;
		}
		else
		{
			return;
		}

		this._PagesShow = this._Pages[this._currentIndex];


		this.pageindex = this._Pages[this._currentIndex][0] - 1

	}
  selectedClick(endValue){
  	this.pageindex=this._Pages[this._currentIndex][endValue]-1;
  }
  

	//@handle('init.modal')
    InitializeModal() {

   //  		this._buttonTitle = this.to.buttonTitle;
			// this._setTitle = this.to.title;
			// this._id = this.to.id;
    }


	//@handle('enable.modal.button')
	enableButton(id ,isEnabled){
		if(this._id==id)
		this._isDisableElement=!isEnabled;
	}
}