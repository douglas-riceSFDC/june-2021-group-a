({
    getTitles : function(component, event, helper) {

        //step 1: set action variable
        let action = component.get('c.getOutOfStockTitles');

        //step 2: set parameters
        action.setParams({});

        //step 3: set callback
        action.setCallback(this, (response) => {
            if(response.getState() === 'SUCCESS'){
                component.set('v.titles', response.getReturnValue());
                console.log(response.getReturnValue());
            }else if(response.getState() === 'ERROR'){
                console.log('error');
            }
        });

        //step 4: call method
        $A.enqueueAction(action);

    }
})