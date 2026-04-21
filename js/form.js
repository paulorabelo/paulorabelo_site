function sendMail(event) {
    event.preventDefault();

    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    const serviceID = "contact_service";
    const templateID = "template_3rk81os";

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your message sent successfully");
        })
        .catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof emailjs !== "undefined") {
        emailjs.init("nHCVVJbiTjjD1PbiR");
    }

    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", sendMail);
    }
});

