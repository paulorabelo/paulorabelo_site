let isSending = false;

function setSubmitState(disabled) {
    const submitButton = document.getElementById("contact-submit-btn");
    if (submitButton) {
        submitButton.disabled = disabled;
        submitButton.style.opacity = disabled ? "0.7" : "1";
        submitButton.style.pointerEvents = disabled ? "none" : "auto";
    }
}

function sendMail(event) {
    event.preventDefault();

    if (isSending) {
        return;
    }

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const params = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput ? subjectInput.value : "",
        message: messageInput.value
    };

    const serviceID = "contact_service";
    const templateID = "template_3rk81os";

    isSending = true;
    setSubmitState(true);

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            nameInput.value = "";
            emailInput.value = "";
            if (subjectInput) {
                subjectInput.value = "";
            }
            messageInput.value = "";
            console.log(res);
            alert("Your message sent successfully");
        })
        .catch((err) => console.log(err))
        .finally(() => {
            isSending = false;
            setSubmitState(false);
        });
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

