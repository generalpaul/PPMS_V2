
import { inject } from 'aurelia-framework';
import { objBudget } from 'objBudget';
import settings from './settings';
@inject(objBudget)
export class actual_cost{
    _objBudget;
    constructor(objBudget) {
        this._objBudget = objBudget;
        //console.log(this._objBudget.USER);
    //  window.location.href="http://absppms2:8084/";
      //window.location.href="http://localhost:15253/";
  }

}
