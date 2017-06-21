import moment from 'moment';

export class DatepatternValueConverter {
    toView(value) {
    	if(value===undefined || value==null)
    		return moment(new Date(),'MM-DD-YYYY').format('MM-DD-YYYY');
    	else
    	{
    		if(moment(value,'MM-DD-YYYY',true).isValid())
    		{
    			return moment(value,'MM-DD-YYYY').format('MM-DD-YYYY');
    		}
    		else
    			return moment(new Date(),'MM-DD-YYYY').format('MM-DD-YYYY');
    	}
	    	
        //return new Date(value).toLocaleDateString();
    }
}