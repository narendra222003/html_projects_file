let currentStep = 1;

function showStep(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((stepElement, index) => {
        if (index < step) {
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
        }
    });
    
    document.getElementById('prevBtn').disabled = step === 1;
    document.getElementById('nextBtn').disabled = step === steps.length;
}

function nextStep() {
    const steps = document.querySelectorAll('.step');
    if (currentStep < steps.length) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

showStep(currentStep);
