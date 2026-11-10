const bdayInput = document.getElementById("bday");
const checkBtn = document.getElementById("checkBtn");

const daysEl = document.getElementById("daysEl");
const hoursEl = document.getElementById("hoursEl");
const minutesEl = document.getElementById("minutesEl");
const secondsEl = document.getElementById("secondsEl");

let timer;

// Helper function para sa leading zero (halimbawa: 8 -> "08")
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateCountdown() {
    if (!bdayInput.value) return;

    const selectedDate = new Date(bdayInput.value);
    const now = new Date();

    let targetYear = now.getFullYear();
    let nextBirthday = new Date(targetYear, selectedDate.getMonth(), selectedDate.getDate());

    // Kung nakalipas na ang petsa ngayong taon, kalkulahin para sa susunod na taon
    if (now > nextBirthday) {
        nextBirthday.setFullYear(targetYear + 1);
    }

    const diff = nextBirthday - now;

    if (diff <= 0) {
        clearInterval(timer);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = formatTime(days);
    hoursEl.textContent = formatTime(hours);
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
}

// Paganahin agad pagka-load
updateCountdown();
timer = setInterval(updateCountdown, 1000);

// Pag clinic ang Check button
checkBtn.addEventListener("click", () => {
    if (!bdayInput.value) {
        alert("Please select a birthday.");
        return;
    }

    clearInterval(timer);
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
});