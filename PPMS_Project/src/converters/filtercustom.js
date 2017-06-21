export class FiltercustomValueConverter {
    toView(array, propertyName, value, signal) {
            
            //this filter is reverse in condition
			var varResult = [];
    		array.forEach((all)=>{

                        if(propertyName.indexOf(',')>0)
                        {
                            var varCheck = propertyName.split(',').find((allFilter)=>all[allFilter]!=value
                            );
                        
                            if(varCheck==undefined)
                            {
                                varResult.push(all);    
                            }
                        }
                        else
    					if(all[propertyName]==value)						
    						 varResult.push(all);	
					 });


    		// for (var i = array.length - 1; i >= 0; i--) {
    		// 	console.log(propertyName);
    		// 	console.log((array[i])[propertyName]);
    		// 	console.log(value);
    		// 	if(array[propertyName]==value)
    		// 	{
    		// 		array.splice(i,1);
    		// 	}
    		// };

    		array = varResult;
		return array;
    }
}