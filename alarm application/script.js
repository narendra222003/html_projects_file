document.addEventListener('DOMContentLoaded', function() {
    // Display current time
    updateTime();
    setInterval(updateTime, 1000);

    // Load existing alarms from localStorage
    loadAlarms();

    // Set alarm button
    const setAlarmButton = document.getElementById('set-alarm');
    setAlarmButton.addEventListener('click', function() {
        const alarmTime = document.getElementById('alarm-time').value;
        saveAlarm(alarmTime);
    });
});

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timeString;

    // Check if any alarms match the current time
    const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    storedAlarms.forEach(alarm => {
        const [alarmHours, alarmMinutes] = alarm.time.split(':').map(Number);
        if (now.getHours() === alarmHours && now.getMinutes() === alarmMinutes && now.getSeconds() === 0) {
            alert(`Alarm! It's time for ${alarm.time}`);
        }
    });
}

function saveAlarm(alarmTime) {
    const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    storedAlarms.push({ time: alarmTime, active: true });
    localStorage.setItem('alarms', JSON.stringify(storedAlarms));
    displayAlarms();
}

function loadAlarms() {
    const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    storedAlarms.forEach(alarm => {
        addAlarmToUI(alarm.time, alarm.active);
    });
}

function displayAlarms() {
    const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    const alarmsList = document.getElementById('alarms-list');
    alarmsList.innerHTML = ''; // Clear previous list

    storedAlarms.forEach(alarm => {
        addAlarmToUI(alarm.time, alarm.active);
    });
}

function addAlarmToUI(alarmTime, isActive) {
    const alarmsList = document.getElementById('alarms-list');
    const alarmItem = document.createElement('div');
    alarmItem.classList.add('alarm-item');

    const timeSpan = document.createElement('span');
    timeSpan.classList.add('time');
    timeSpan.textContent = alarmTime;

    const toggleButton = document.createElement('button');
    toggleButton.textContent = isActive ? 'Turn Off' : 'Turn On';
    toggleButton.addEventListener('click', function() {
        toggleAlarm(alarmTime);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteAlarm(alarmTime);
    });

    alarmItem.appendChild(timeSpan);
    alarmItem.appendChild(toggleButton);
    alarmItem.appendChild(deleteButton);
    alarmsList.appendChild(alarmItem);
}

function toggleAlarm(alarmTime) {
    let storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    storedAlarms = storedAlarms.map(alarm => {
        if (alarm.time === alarmTime) {
            alarm.active = !alarm.active;
        }
        return alarm;
    });
    localStorage.setItem('alarms', JSON.stringify(storedAlarms));
    displayAlarms();
}

function deleteAlarm(alarmTime) {
    let storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    storedAlarms = storedAlarms.filter(alarm => alarm.time !== alarmTime);
    localStorage.setItem('alarms', JSON.stringify(storedAlarms));
    displayAlarms();
}
