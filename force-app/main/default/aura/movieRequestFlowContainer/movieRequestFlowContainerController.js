({
    handleRequestButtonClick : function (component) {
        component.set('v.isModalOpen', true);
        let flow = component.find("movieRequest");
        flow.startFlow("Movie_Request");
    },

    handleModalCloseClick : function (component) {
        component.set('v.isModalOpen', false);
    },

    handleStatusChange : function (component, event) {
        
        var toastEvent = $A.get("e.force:showToast");
        
        if (event.getParam("status") === "FINISHED") {
            toastEvent.setParams({
                "title": "Request Submitted!",
                "message": "Your request will be processed by our Acquisitions Team.",
                "type": "success"
            });
            toastEvent.fire();
            component.set('v.isModalOpen', false);
        } else if (event.getParam("status") === "ERROR") {
            toastEvent.setParams({
                "title": "Request Submission Failed",
                "message": "An unknown error occured.",
                "type": "error"
            });
            toastEvent.fire();
            component.set('v.isModalOpen', false);
        }
        else;
    }
})
