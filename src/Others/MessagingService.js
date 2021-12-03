import axios from "axios";

const sendConfirmationMail = (user,order) => {
    let message = "Hello " + user.firstName + "\nYour Booking with Reference No. " + order.referenceId + " has been confirmed.\nThe same can be reviewed in your dashboard.";
    let to = user.email;
    let subject = "Booking Confirmation with Car Parking Solutions";

    axios.get("http://localhost:8080/sendMessage/send",{params:{
        to:to,
        sub:subject,
        body:message
    }}).then(res => console.log(res.data));
}

export default sendConfirmationMail;