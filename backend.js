$(document).ready(function() {
    // Timer variables
    let workDuration = 15;
    let breakDuration = 5;
    let longBreakDuration = 15;
    let longBreakInterval = 4;
    let currentLanguage = 'en';
    let currentTheme = 'light';

    // Timer state variables
    let isTimerRunning = false;
    let isWorkTime = true;
    let pomodoroCount = 0;

    // Timer elements
    const timerElement = $('#timer');
    const startButton = $('#start-btn');
    const resetButton = $('#reset-btn');

    // Language elements
    const englishButton = $('#english');
    const latvianButton = $('#latvian');
    const russianButton = $('#russian');

    // Theme elements
    const themeSelect = $('#theme');

    // Update timer display
    function updateTimerDisplay(minutes, seconds) {
        timerElement.text(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }

    // Start timer
    function startTimer() {
        isTimerRunning = true;
        startButton.text('Pause');

        let totalSeconds = isWorkTime ? workDuration * 60 : breakDuration * 60;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let timerInterval = setInterval(function() {
            if (!isTimerRunning) {
                clearInterval(timerInterval);
                return;
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    isWorkTime = !isWorkTime;
                    pomodoroCount++;

                    if (isWorkTime && pomodoroCount % longBreakInterval === 0) {
                        totalSeconds = longBreakDuration * 60;
                    } else {
                        totalSeconds = breakDuration * 60;
                    }
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }

            updateTimerDisplay(minutes, seconds);
        }, 1000);
    }

    // Pause timer
    function pauseTimer() {
        isTimerRunning = false;
        startButton.text('Resume');
    }

    // Reset timer
    function resetTimer() {
        isTimerRunning = false;
        isWorkTime = true;
        pomodoroCount = 0;
        startButton.text('Start');
        updateTimerDisplay(workDuration, 0);
    }

    // Update language
    function updateLanguage(language) {
        currentLanguage = language;

        if (currentLanguage === 'en') {
            englishButton.addClass('active');
            latvianButton.removeClass('active');
            russianButton.removeClass('active');
        } else if (currentLanguage === 'lv') {
            englishButton.removeClass('active');
            latvianButton.addClass('active');
            russianButton.removeClass('active');
        } else if (currentLanguage === 'ru') {
            englishButton.removeClass('active');
            latvianButton.removeClass('active');
            russianButton.addClass('active');
        }
    }

    // Update theme
    function updateTheme(theme) {
        currentTheme = theme;

        if (currentTheme === 'light') {
            $('body').removeClass('dark-theme');
            themeSelect.val('light');
        } else if (currentTheme === 'dark') {
            $('body').addClass('dark-theme');
            themeSelect.val('dark');
        }
    }

    // Event listeners
    startButton.click(function() {
        if (!isTimerRunning) {
            startTimer();
        } else {
            pauseTimer();
        }
    });

    resetButton.click(function() {
        resetTimer();
    });

    englishButton.click(function() {
        updateLanguage('en');
    });

    latvianButton.click(function() {
        updateLanguage('lv');
    });

    russianButton.click(function() {
        updateLanguage('ru');
    });

    themeSelect.change(function() {
        updateTheme($(this).val());
    });

    // Initial setup
    updateTimerDisplay(workDuration, 0);
    updateLanguage(currentLanguage);
    updateTheme(currentTheme);
});