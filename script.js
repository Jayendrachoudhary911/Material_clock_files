// Switch Tab
function switchTab(tabIndex) {
    var tabs = document.getElementsByClassName('tab');
    var tabPanes = document.getElementsByClassName('tab-pane');
  
    // Hide all tab panes and remove active class from tabs
    for (var i = 0; i < tabPanes.length; i++) {
      tabPanes[i].classList.remove('active');
      tabs[i].classList.remove('active');
    }
  
    // Show selected tab pane and add active class to tab
    tabPanes[tabIndex].classList.add('active');
    tabs[tabIndex].classList.add('active');
  }
  
  // Clock
  function updateDigitalClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
  
    var clockTime = document.getElementById('clock-time');
    clockTime.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
  
    var clockDate = document.getElementById('clock-date');
    clockDate.textContent = now.toDateString();
  }
  
  // Stopwatch
  var stopwatchInterval;
  var stopwatchMilliseconds = 0;
  var stopwatchSeconds = 0;
  var isStopwatchRunning = false;
  
  function toggleStopwatch() {
    if (!isStopwatchRunning) {
      stopwatchInterval = setInterval(updateStopwatch, 10);
      isStopwatchRunning = true;
      document.getElementById('start-button').textContent = 'Pause';
      document.getElementById('lap-button').style.display = 'inline';
      document.getElementById('reset-button').style.display = 'none';
    } else {
      clearInterval(stopwatchInterval);
      isStopwatchRunning = false;
      document.getElementById('start-button').textContent = 'Resume';
      document.getElementById('reset-button').style.display = 'inline';
    }
  }
  
  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchMilliseconds = 0;
    stopwatchSeconds = 0;
    isStopwatchRunning = false;
    document.getElementById('start-button').textContent = 'Start';
    document.getElementById('lap-button').style.display = 'none';
    document.getElementById('reset-button').style.display = 'none';
    document.getElementById('stopwatch-time').textContent = '00:00:00.000';
    document.getElementById('lap-list').innerHTML = '';
  }
  
  function recordLap() {
    var lapTime = formatTime(stopwatchSeconds) + '.' + formatTime(stopwatchMilliseconds, 3);
    var lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    document.getElementById('lap-list').appendChild(lapItem);
  }
  
  function updateStopwatch() {
    stopwatchMilliseconds += 10;
  
    if (stopwatchMilliseconds >= 1000) {
      stopwatchMilliseconds = 0;
      stopwatchSeconds++;
    }
  
    var stopwatchTime =
      formatTime(stopwatchSeconds) +
      ':' +
      formatTime(Math.floor(stopwatchMilliseconds / 10), 2) +
      '.' +
      formatTime(stopwatchMilliseconds % 10);
  
    document.getElementById('stopwatch-time').textContent = stopwatchTime;
  }
  
// Timer
var timerInterval;
var timerSeconds = 0;
var isTimerRunning = false;
var beepSound = document.getElementById('beep-sound');

function toggleTimer() {
  if (!isTimerRunning) {
    var hoursInput = document.getElementById('hours-input');
    var minutesInput = document.getElementById('minutes-input');
    var secondsInput = document.getElementById('seconds-input');

    var totalSeconds =
      parseInt(hoursInput.value) * 3600 +
      parseInt(minutesInput.value) * 60 +
      parseInt(secondsInput.value);

    if (totalSeconds <= 0) {
      alert('Please enter a positive value for the timer.');
      return;
    }

    timerSeconds = totalSeconds;
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
    document.getElementById('start-timer-button').textContent = 'Pause';
    document.getElementById('reset-timer-button').style.display = 'none';
  } else {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('start-timer-button').textContent = 'Resume';
    document.getElementById('reset-timer-button').style.display = 'inline';
    stopBeepSound(); // Stop the beep sound when pausing the timer
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  document.getElementById('start-timer-button').textContent = 'Start';
  document.getElementById('reset-timer-button').style.display = 'none';

  var hoursInput = document.getElementById('hours-input');
  var minutesInput = document.getElementById('minutes-input');
  var secondsInput = document.getElementById('seconds-input');

  hoursInput.value = '0';
  minutesInput.value = '0';
  secondsInput.value = '0';

  document.getElementById('timer-time').textContent = '00:00:00';

  stopBeepSound(); // Stop the beep sound when resetting the timer
}

function updateTimer() {
  timerSeconds--;

  if (timerSeconds < 0) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('start-timer-button').textContent = 'Start';
    document.getElementById('reset-timer-button').style.display = 'inline';
    document.getElementById('timer-time').textContent = '00:00:00';
    playBeepSound(); // Play the beep sound when the timer completes
    return;
  }

  var hours = Math.floor(timerSeconds / 3600);
  var minutes = Math.floor((timerSeconds % 3600) / 60);
  var seconds = timerSeconds % 60;

  document.getElementById('timer-time').textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function playBeepSound() {
  beepSound.play();
}

function stopBeepSound() {
  beepSound.pause();
  beepSound.currentTime = 0;
}

  
  // Utility Functions
  function formatTime(time, digits = 2) {
    return String(time).padStart(digits, '0');
  }
  
  // Initial setup
  switchTab(0);
  setInterval(updateDigitalClock, 1000);
  
  // Function to make the section movable
function makeMovable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(element.id + "-header")) {
    // If a header is present, use it as the drag handle
    document.getElementById(element.id + "-header").onmousedown = dragMouseDown;
  } else {
    // Otherwise, use the whole section as the drag handle
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // Get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // Call a function whenever the cursor moves
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Set the element's new position
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // Stop moving when the mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Make the movable section
makeMovable(document.getElementById("movable-section"));

