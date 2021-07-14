({
    handleClick : function(component, event, helper) {
        helper.populateSearchList(component,event,helper);
    },

    onEnterPressed : function(component,event,helper){
        if(event.code == "Enter"){
            helper.populateSearchList(component,event,helper);
        }
    }
})
