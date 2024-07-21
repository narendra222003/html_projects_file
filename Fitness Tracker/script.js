document.addEventListener('DOMContentLoaded', () => {
    const stepsCount = document.getElementById('stepsCount');
    const caloriesCount = document.getElementById('caloriesCount');
    const workoutList = document.getElementById('workoutList');

    // Initialize local storage if not exists
    if (!localStorage.getItem('fitnessData')) {
        localStorage.setItem('fitnessData', JSON.stringify({
            steps: 0,
            calories: 0,
            workouts: []
        }));
    }

    // Retrieve data from localStorage
    let fitnessData = JSON.parse(localStorage.getItem('fitnessData'));
    updateUI();

    // Add Steps Button
    const addStepsButton = document.getElementById('addStepsButton');
    addStepsButton.addEventListener('click', () => {
        // Increment steps
        fitnessData.steps += 1000; // Simulating steps increment

        // Calculate calories burned based on steps
        const caloriesBurned = Math.floor(fitnessData.steps / 100); // Simulating calories burned per 100 steps
        fitnessData.calories += caloriesBurned;

        // Update localStorage immediately
        updateLocalStorage();

        // Update UI immediately
        updateUI();
    });

    // Add Workout Button
    const addWorkoutButton = document.getElementById('addWorkoutButton');
    addWorkoutButton.addEventListener('click', () => {
        const workoutTime = new Date().toLocaleTimeString();
        fitnessData.workouts.push(workoutTime);

        // Update localStorage immediately
        updateLocalStorage();

        // Update UI immediately
        updateUI();
    });

    // Update local storage with current data
    function updateLocalStorage() {
        localStorage.setItem('fitnessData', JSON.stringify(fitnessData));
    }

    // Update UI with current data
    function updateUI() {
        stepsCount.textContent = fitnessData.steps;
        caloriesCount.textContent = fitnessData.calories;
        renderWorkouts();
        renderChart();
    }

    // Render workout sessions list
    function renderWorkouts() {
        workoutList.innerHTML = '';
        fitnessData.workouts.forEach(workout => {
            const li = document.createElement('li');
            li.textContent = workout;
            workoutList.appendChild(li);
        });
    }

    // Render chart using Chart.js
    function renderChart() {
        const chartData = {
            labels: ['Steps', 'Calories'],
            datasets: [{
                label: 'Fitness Tracker',
                backgroundColor: ['#007bff', '#dc3545'],
                data: [fitnessData.steps, fitnessData.calories]
            }]
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        const chart = new Chart(document.getElementById('chart').getContext('2d'), {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
    }
});
