
import { inject } from 'aurelia-framework';
import { cache_obj } from 'cache_obj';
import settings from 'settings';
@inject(cache_obj)
export class actual_cost{
    _cache_obj;
    constructor(cache_obj) {
        this._cache_obj = cache_obj;
        //console.log(this._cache_obj.USER);
    //  window.location.href="http://absppms2:8084/";
      //window.location.href="http://localhost:15253/";
  }

}
