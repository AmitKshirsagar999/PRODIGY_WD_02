document.addEventListener('DOMContentLoaded', function() {
    let tensEl = document.getElementById('tens');
    let secondsEl = document.getElementById('seconds');
    let minEl = document.getElementById('min');
    let hourEl = document.getElementById('hour');
    let buttonDiv = document.getElementById('btn-div');
    let lapTimesContainer = document.getElementById('lapTimesContainer');

    let startBtn;
    let stopBtn;
    let lapBtn;

    let hour = 0;
    let minute = 0;
    let seconds = 0;
    let tens = 0;
    let timer;
    let lapCounter = 1;
    let interval;

    function createStopBtn() {
        removeButtons();
        startBtn.style.display = 'none';
        stopBtn = document.createElement('button');
        stopBtn.textContent = "STOP";
        buttonDiv.appendChild(stopBtn);
        stopBtn.onclick = function () {
            stopTimer();
            startBtn.style.display = 'block';
            removeButtons();
        };
    }

    function createLapBtn() {
        lapBtn = document.createElement('button');
        lapBtn.textContent = "LAP";
        buttonDiv.appendChild(lapBtn);
        lapBtn.onclick = function () {
            lap();
        };
    }

    function removeButtons() {
        if (stopBtn) {
            stopBtn.remove();
        }
        if (lapBtn) {
            lapBtn.remove();
        }
    }

    function startTimer() {
        timer = setInterval(stopWatch, 10);
        createStopBtn();
        createLapBtn();
    }

    function stopTimer() {
        clearInterval(timer);
    }

    window.resetTimer = function() {
        clearInterval(timer);
        tens = 0;
        minute = 0;
        seconds = 0;
        hour = 0;
        tensEl.textContent = "00";
        minEl.textContent = "00";
        hourEl.textContent = "00";
        secondsEl.textContent = "00";
        lapCounter = 1;
        lapTimesContainer.innerHTML = '';
    };

    function lap() {
        // Create a new div for each lap time                                                                                                                                                      
        const lapTimeDiv = document.createElement('div');
        lapTimeDiv.classList.add('lap-time-box');

        // Create a span for the lap time text
        const lapTimeText = document.createElement('p');
        lapTimeText.textContent = `Lap ${lapCounter} :  ${formatTime((hour * 3600 + minute * 60 + seconds) * 1000 + tens * 10)}`;

        // Append the span to the lap time div
        lapTimeDiv.appendChild(lapTimeText);

        // Append the lap time div to the lap times container
        lapTimesContainer.appendChild(lapTimeDiv);

        // Increment lap counter
        lapCounter++;
    }

    function stopWatch() {
        tens++;
        if (tens <= 9) {
            tensEl.textContent = "0" + tens;
        } else {
            tensEl.textContent = tens;
        }

        if (tens === 99) {
            tens = 0;
            seconds++;
            if (seconds <= 9) {
                secondsEl.textContent = "0" + seconds;
            } else {
                secondsEl.textContent = seconds;
            }

            if (seconds === 59) {
                seconds = 0;
                minute++;
                if (minute <= 9) {
                    minEl.textContent = "0" + minute;
                } else {
                    minEl.textContent = minute;
                }

                if (minute === 59) {
                    minute = 0;
                    hour++;
                    if (hour <= 9) {
                        hourEl.textContent = "0" + hour;
                    } else {
                        hourEl.textContent = hour;
                    }
                }
            }
        }
    }

    function formatTime(milliseconds) {
        const date = new Date(milliseconds);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');

        return `${hours}:${minutes}:${seconds}.${millisecondsFormatted}`;
    }

    window.buttonOp = function() {
        startBtn = document.getElementById('start');
        createStopBtn();
        createLapBtn();
        startTimer();
    };
});
