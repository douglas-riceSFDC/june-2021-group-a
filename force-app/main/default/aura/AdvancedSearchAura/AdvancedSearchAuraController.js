({
    handleClick : function(component, event, helper) {
        var searchKey = component.get('v.searchKey');
        console.log('searchKey'+searchKey)
        var action = component.get('c.getMovieList');
        action.setParams({searchKey: searchKey});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var ids = response.getReturnValue();
                component.set("v.recordIds" , ids);
                console.log(ids);
            }
        });
        
        $A.enqueueAction(action);
    }

})
