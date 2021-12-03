import axios from "axios";

class MessagingService
{
    static sendConfirmationMail = (user,order) => {
        let message = "Hello " + user.firstName + "\nYour Booking with Reference No. " + order.referenceId + " has been confirmed.\nThe same can be reviewed in your dashboard.";
        let to = user.email;
        let subject = "Booking Confirmation with Car Parking Solutions";
    
        axios.get("http://localhost:8080/sendMessage/send",{params:{
            to:to,
            sub:subject,
            body:message
        }}).then(res => console.log(res.data));
    }
    
    static sendCheckoutMail = (user,order) => {
        let message = "Hello " + user.firstName + "\nYour Booking with Reference No. " + order.referenceId + " has been completed succsesfully.\nOrder amount: " + order.amount + " has been deducted from your wallet.\n Current Balance: " + user.balance + ".";
        let to = user.email;
        let subject = "Car Parking Solutions Checkout";
    
        axios.get("http://localhost:8080/sendMessage/send",{params:{
            to:to,
            sub:subject,
            body:message
        }}).then(res => console.log(res.data));
    
    }
}

export default MessagingService;