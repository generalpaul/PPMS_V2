export class SorttextValueConverter {
    toView(array, propertyName, direction) {
   //      array.forEach((a)=>{
			// 		console.log(a[propertyName]);

			// });
        if(direction=="ascending")
		{	

			return array.sort(function(a, b) {
				//console.log(a[propertyName]);
				if (a[propertyName] > b[propertyName]) {
					return 1;
				}
				if (a[propertyName] < b[propertyName]) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
        }
        else
        {
        	return array.sort(function(a, b) {
				if (a[propertyName] > b[propertyName]) {
					return -1;
				}
				if (a[propertyName] < b[propertyName]) {
					return 1;
				}
				// a must be equal to b
				return 0;
			});	
        }

    }
}