class Constants {
    static conString = "mongodb+srv://root:poi098poi@employeeportal.xu127.azure.mongodb.net/empPortal?retryWrites=true&w=majority";

    static flashEvents = {
        success: "success",
        failure: 'failure',
        error: 'error'
    };

    static messages = {
        openingAdded: 'New opening added succesfully',
        updateSuccess: 'Opening modified succesfully.',
        addFailed: 'Failed to save the opening, please try after some time.',
        updateFailed: 'Unable to update the opening, Please try again later.'
    };
}

// now we export the class, so other modules can create Cat objects
module.exports = Constants