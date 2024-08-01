let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsDiv = document.getElementById('laps');

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startBtn.textContent = 'Pause';
    } else {
        clearInterval(timer);
        isRunning = false;
        startBtn.textContent = 'Resume';
    }
}

function lap() {
    if (isRunning) {
        laps.push(elapsedTime);
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsDiv.appendChild(lapElement);
    }
}

function stop() {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = 'Start';
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    lapsDiv.innerHTML = '';
    startBtn.textContent = 'Start';
}

startBtn.addEventListener('click', start);
lapBtn.addEventListener('click', lap);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

updateDisplay();