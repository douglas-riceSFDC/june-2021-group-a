({

    handleRequestButtonClick : function (component) {
        let flow = component.find("movieRequest");
        flow.startFlow("Movie_Request")
        component.set('v.isClosed', false);
    },

    handleStatusChange : function (component, event, handler) {
        
        var toastEvent = $A.get("e.force:showToast");
        
        if (event.getParam("status") === "FINISHED") {
            toastEvent.setParams({
                "title": "Request Submitted!",
                "message": "Your request will be processed by our Acquisitions Team.",
                "type": "success"
            });
        } else if (event.getParam("status") === "ERROR") {
            toastEvent.setParams({
                "title": "Request Submission Failed",
                "message": "An unknown error occured.",
                "type": "error"
            });
        }
        else;

        toastEvent.fire();
    }
})
