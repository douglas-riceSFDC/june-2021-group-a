({

    handleRequestButtonClick : function (component) {
        let flow = component.find("movieRequest");
        flow.startFlow("Movie_Request")
        component.set('v.isClosed', false);
    },

    handleStatusChange : function (component, event, handler) {
        
        let toastTitle, toastMessage, toastType;
        
        if (event.getParam("status" === "FINISHED")) {
            toastTitle = "Request Submitted!"
            toastMessage = "Your request will be processed by our Acquisitions Team."
            toastType = "success"
        } else if (event.getParam("status" === "ERROR")) {
            toastTitle = "Request Submission Failed"
            toastMessage = "An unknown error occured."
            toastType = "error"
        }
        else;

        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": toastTitle,
            "message": toastMessage,
            "type": toastType
        });
        toastEvent.fire();
    }
})
