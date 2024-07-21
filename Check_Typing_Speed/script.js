const quoteElement = document.getElementById('quote');
const userInput = document.getElementById('userInput');
const startButton = document.getElementById('startButton');
const timerElement = document.getElementById('time');
const resultElement = document.getElementById('result');
const wordCountSelect = document.getElementById('wordCount');
const durationSelect = document.getElementById('duration');

let timer;
let startTime;
let endTime;
let testDuration; // Duration of the test in seconds
let targetWords; // Number of words to type

// Quotes based on different word counts
const quotes = {
    110: "Through it all, the city endures, evolving and thriving amidst the ebb and flow of time. It is a mosaic of memories, each piece contributing to a grand tapestry of history and progress. Its historic landmarks, weathered yet steadfast, stand as reminders of the past, while modern marvels rise in testament to contemporary innovation. Together, they form a vivid narrative of resilience and transformation. The city’s enduring spirit reflects human ingenuity and creativity, celebrating the achievements of those who have shaped it and embracing the future with boundless potential. This dynamic interplay of old and new underscores its timeless essence.",
    100: "Yet, beneath the surface, whispers of untold stories linger. Dreams deferred, challenges faced, and silent triumphs subtly weave into the city's fabric. Each street and building holds a piece of this complex tapestry, reflecting the myriad experiences of its inhabitants. Behind every door, a unique narrative waits to unfold, rich with personal histories and quiet victories. These hidden tales form the undercurrent of urban life, shaping the city’s essence in ways that remain largely unseen but deeply felt, adding depth and intrigue to the ever-evolving urban landscape.",
    90: "The skyline transforms with the setting sun, bathed in hues of orange and pink that gradually deepen into twilight. As darkness falls, lights flicker on, casting a warm, inviting glow upon the streets below. Cafés buzz with lively conversation, their windows glowing softly, while the music from vibrant bars spills out into the night. The city comes alive with a renewed energy, as people gather to enjoy the evening, creating a rich tapestry of sounds and sights that define the city's nocturnal charm.",
    80: "As the night descends, the city transforms into a different realm. Neon lights shimmer and dance against the darkness, casting enigmatic shadows that whisper tales of intrigue. The hum of nightlife fills the air, a symphony of voices and sounds rising and falling like rhythmic waves. Music spills from bars and clubs, blending with laughter and conversations, creating a vibrant and captivating nocturnal melody that pulses through the streets, revealing a hidden layer of urban life.",
    70: "In the heart of the bustling city, where skyscrapers loom like giants and streets pulse with life, a vibrant tapestry is woven from countless stories. Each person, building, and speeding car contributes to the intricate weave of urban existence, creating a dynamic, ever-changing mosaic. This urban symphony, with its diverse rhythms and colors, captures the essence of city life, reflecting its constant evolution and energy.",
    60: "Amidst the chaos of honking horns and hurried footsteps, moments of tranquility emerge. Parks dotted with trees offer a peaceful sanctuary, their branches swaying gently in the breeze. Children laugh joyfully as they chase butterflies, while elderly couples stroll hand in hand, reminiscing about days gone by, enjoying nature’s serene beauty and the soothing sounds of chirping birds.",
    50: "As night descends, the city assumes a new persona. Neon lights dance against the darkness, casting shadows that whisper tales of intrigue. The hum of nightlife fills the air, a symphony of voices rising and falling like waves. Above, the sky holds a canvas of endless possibilities, reflecting dreams and aspirations.",
    40: "At the heart of the city lies its beating pulse: the people. Diverse in culture, background, and aspirations, they form the lifeblood coursing through its veins. From artists and bankers to students and CEOs, each plays a role in shaping the city’s identity.",
    30: "Down narrow alleyways, hidden gems await discovery. Artisan shops filled with handcrafted treasures beckon the curious wanderer. The rich scent of freshly brewed coffee mingles with the aroma of freshly baked bread, creating an irresistible allure.",   
};

startButton.addEventListener('click', startTest);

function startTest() {
    const selectedWords = parseInt(wordCountSelect.value);
    const quoteText = quotes[selectedWords];

    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    startButton.disabled = true;
    resultElement.textContent = '';

    quoteElement.textContent = quoteText;
    targetWords = selectedWords;
    testDuration = parseInt(durationSelect.value) * 60;
    userInput.addEventListener('input', checkTyping);
    startTime = new Date().getTime();
    endTime = startTime + testDuration * 1000; // Calculate end time
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const remainingTime = Math.max(0, endTime - currentTime);
    timerElement.textContent = Math.ceil(remainingTime / 1000);

    if (remainingTime <= 0) {
        endTest();
    }
}

function endTest() {
    clearInterval(timer);
    userInput.disabled = true;
    startButton.disabled = false;

    const typedText = userInput.value.trim();

    // Calculate words typed
    const typedWords = typedText.split(/\s+/).filter(word => word !== '').length;

    // Calculate accuracy percentage
    const accuracyPercentage = ((typedWords / targetWords) * 100).toFixed(2);

    // Display result
    let resultText = '';
    if (typedWords >= targetWords) {
        resultText = `Your typing speed: ${Math.round((typedWords / testDuration) * 60)} WPM`;
    } else {
        resultText = `You typed ${typedWords} words. Try again to reach ${targetWords} words.`;
    }
    resultText += `\nAccuracy: ${accuracyPercentage}%`;
    resultElement.textContent = resultText;
}

function checkTyping() {
    const typedText = userInput.value.trim();
    const typedWords = typedText.split(/\s+/).filter(word => word !== '').length;
    // Display the current count of words typed
    console.log(`Total words typed: ${typedWords}`);
    
    const currentTime = new Date().getTime();
    if (currentTime > endTime) {
        endTest();
        return;
    }
}
