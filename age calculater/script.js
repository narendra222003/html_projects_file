const ageForm = document.getElementById('ageForm');
const resultElement = document.getElementById('result');

ageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const birthdate = new Date(document.getElementById('birthdate').value);
    const today = new Date();

    if (birthdate >= today) {
        resultElement.textContent = 'Please enter a valid birthdate.';
        return;
    }

    let ageYears = today.getFullYear() - birthdate.getFullYear();
    let ageMonths = today.getMonth() - birthdate.getMonth();
    let ageDays = today.getDate() - birthdate.getDate();

    // Adjust age if birthdate month is ahead of current month or same month but birthdate day is ahead of current day
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12; // Convert negative months to positive by adding 12
    }

    // Calculate age in weeks and remaining days
    const ageWeeks = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24 * 7));
    ageDays = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24)) % 7;

    // Construct the age string
    let ageString = `Your age is ${ageYears} years, ${ageMonths} months, ${ageWeeks} weeks, and ${ageDays} days.`;

    resultElement.textContent = ageString;
});
