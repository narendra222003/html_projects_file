document.addEventListener('DOMContentLoaded', () => {
    const monthYear = document.getElementById('month-year');
    const dates = document.getElementById('dates');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentDate = new Date();
    let selectedDate = null;

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        dates.innerHTML = '';

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('date');
            dates.appendChild(emptyDiv);
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date');
            dateDiv.textContent = i;
            const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            if (isToday) {
                dateDiv.classList.add('today');
            }
            dateDiv.addEventListener('click', () => {
                if (selectedDate) {
                    selectedDate.classList.remove('selected');
                }
                dateDiv.classList.add('selected');
                selectedDate = dateDiv;
            });
            dates.appendChild(dateDiv);
        }
    }

    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
