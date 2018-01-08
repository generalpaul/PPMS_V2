import 'bootstrap';
import {inject} from 'aurelia-framework';
//import 'bootstrap/css/bootstrap.css!';
import toastr from "toastr";
@inject(toastr)
export class App {
  configureRouter(config, router){
    config.title = 'PPMS';
    config.map([
      { route: ['', 'blankpage'], name: 'blankpage', moduleId: 'blankpage', nav: true, title: 'PPMS' },
      { route: 'mainpage', name: 'mainpage', moduleId: 'mainpage', nav: true, title: 'Main Page' },
      { route: 'mainview', name: 'mainview', moduleId: 'ppfcs/budget/mainview', nav: true, title: 'Budget Template' },
      { route: 'group_individual', name: 'group_individual', moduleId: 'group_individual', nav: true, title:'Talent Groups' },
      { route: 'actual_cost', name: 'actual_cost', moduleId: 'ppfcs/actual_cost/actual_cost', nav: true, title:'Actual Cost' },
      { route: 'buh', name: 'buh', moduleId: 'buh', nav: true, title:'BUH' },
      { route: 'ppid', name: 'ppid', moduleId: 'ppid/ppid', nav: true, title: 'Program Personnel Information' },
      { route: 'contract_form', name: 'contract_form', moduleId: 'ppid/contract/contract_form', nav: true, title:'Utilization' },
      { route: 'talent_search', name: 'talent_search', moduleId: 'ppid/talent_search/talent_search', nav: true, title:'Talent Search' },
      { route: 'ppid_group', name: 'ppid_group', moduleId: 'ppid/ppid_group', nav: true, title: 'PPID GROUP'}
    ]);

    this.router = router;

    toastr.options = {
      "closeButton": true,
      "debug": false,
      "positionClass": "toast-bottom-right",
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      //"timeOut": "300000",
      //"extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
  }
}
