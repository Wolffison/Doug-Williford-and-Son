document.addEventListener('DOMContentLoaded', function() {
    // Initialize slick carousel
    $(document).ready(function(){
        $('.testimonial-carousel').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: true
        });
    });

    // Form submission for service request form
    const serviceRequestForm = document.getElementById('service-request-form');
    const contactForm = document.getElementById('quick-contact-form');

    if (serviceRequestForm) {
        serviceRequestForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(serviceRequestForm);

            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message')
            };

            console.log('Service Request Submitted:', data);

            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            alert('Thank you for your submission! We will get back to you soon.');
            serviceRequestForm.reset();
        });
    }

    // Form submission for quick contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const contactFormData = new FormData(contactForm);

            const contactData = {
                name: contactFormData.get('contact-name'),
                email: contactFormData.get('contact-email'),
                message: contactFormData.get('contact-message')
            };

            console.log('Contact Form Submitted:', contactData);

            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            alert('Thank you for contacting us! We will get back to you soon.');
            contactForm.reset();
        });
    }
});
