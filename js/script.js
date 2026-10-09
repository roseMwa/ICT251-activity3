// Wait for the DOM content to fully load before attaching event handlers
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Feature 1: Theme Switch (Light / Dark Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeToggleBtn.textContent = 'Switch to Light Theme';
            } else {
                themeToggleBtn.textContent = 'Switch to Dark Theme';
            }
        });
    }

    /* ==========================================================================
       Feature 2: Expandable Project Details
       ========================================================================== */
    const toggleButtons = document.querySelectorAll('.toggle-details-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const detailsDiv = document.getElementById(targetId);

            if (detailsDiv) {
                detailsDiv.classList.toggle('hidden');
                
                if (detailsDiv.classList.contains('hidden')) {
                    button.textContent = 'Show Details';
                } else {
                    button.textContent = 'Hide Details';
                }
            }
        });
    });

    /* ==========================================================================
       Feature 3: Study Hours Calculator
       ========================================================================== */
    const calcForm = document.getElementById('study-calc-form');
    const calcResult = document.getElementById('calc-result');

    if (calcForm) {
        calcForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const hoursInput = parseFloat(document.getElementById('hours-per-day').value);
            const daysInput = parseInt(document.getElementById('days-per-week').value, 10);

            // Input Validation Logic
            if (isNaN(hoursInput) || hoursInput <= 0) {
                showCalcResult('Please enter a valid positive number for planned hours per day.', true);
                return;
            }

            if (isNaN(daysInput) || daysInput < 1 || daysInput > 7) {
                showCalcResult('Please enter days per week between 1 and 7.', true);
                return;
            }

            const totalHours = hoursInput * daysInput;
            showCalcResult(`Target Confirmed: You plan to study ${totalHours} hours per week (${hoursInput} hrs/day × ${daysInput} days).`, false);
        });
    }

    function showCalcResult(message, isError) {
        calcResult.textContent = message;
        calcResult.classList.remove('hidden');
        if (isError) {
            calcResult.style.borderColor = '#dc2626';
            calcResult.style.backgroundColor = '#fef2f2';
        } else {
            calcResult.style.borderColor = '#16a34a';
            calcResult.style.backgroundColor = '#f0fdf4';
        }
    }

    /* ==========================================================================
       Compulsory Feature: Contact Form Validation & Preview
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formPreview = document.getElementById('form-preview');
    const previewContent = document.getElementById('preview-content');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Prevent actual browser form submission to keep execution local
            event.preventDefault();

            // Clear previous error messages
            document.getElementById('name-error').textContent = '';
            document.getElementById('email-error').textContent = '';
            document.getElementById('message-error').textContent = '';

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const topic = document.getElementById('contact-topic').value;
            const message = document.getElementById('contact-message').value.trim();

            let isValid = true;

            // Name Validation (Reject whitespace-only)
            if (name === '') {
                document.getElementById('name-error').textContent = 'Please enter your name.';
                isValid = false;
            }

            // Email Validation (Basic Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Message Validation (Reject whitespace-only)
            if (message === '') {
                document.getElementById('message-error').textContent = 'Please write a message.';
                isValid = false;
            }

            if (!isValid) {
                formPreview.classList.add('hidden');
                return;
            }

            // Safe DOM creation using textContent to display local summary preview
            previewContent.innerHTML = ''; // Clear container

            const statusPara = document.createElement('p');
            statusPara.textContent = 'Data locally validated successfully (Browser demonstration only — no message sent to a server).';
            statusPara.style.fontWeight = 'bold';
            statusPara.style.color = '#16a34a';

            const namePara = document.createElement('p');
            namePara.textContent = `Name: ${name}`;

            const emailPara = document.createElement('p');
            emailPara.textContent = `Email: ${email}`;

            const topicPara = document.createElement('p');
            topicPara.textContent = `Topic: ${topic}`;

            const msgPara = document.createElement('p');
            msgPara.textContent = `Message: ${message}`;

            previewContent.appendChild(statusPara);
            previewContent.appendChild(namePara);
            previewContent.appendChild(emailPara);
            previewContent.appendChild(topicPara);
            previewContent.appendChild(msgPara);

            formPreview.classList.remove('hidden');
        });
    }

});