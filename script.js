// ==========================================
// 2-ОЮН: КРЕСТИКИ-НОЛИКИ (НИЧЬЯ ЖАНА КАЙРА БАШТОО)
// ==========================================
let player = "X", state = ["","","","","","","","",""], win = false;

function makeMove(cell, idx) {
    if (state[idx] === "" && !win) {
        state[idx] = player;
        cell.innerText = player;
        cell.style.color = (player === "X") ? "#e74c3c" : "#2980b9";

        if (checkWin()) {
            document.getElementById('status').innerText = player + " ЖЕҢДИ! 🎉";
            win = true;
            document.getElementById('toG3').classList.remove('hidden');
        } else if (!state.includes("")) {
            alert("ТЕҢ ЧЫГУУ! Кайра башталат.");
            resetTTT(); // Нөлдөө
        } else {
            player = (player === "X") ? "O" : "X";
            document.getElementById('status').innerText = player + " кезеги";
        }
    }
}

function checkWin() {
    const w = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return w.some(c => state[c[0]] && state[c[0]] === state[c[1]] && state[c[1]] === state[c[2]]);
}

function resetTTT() {
    state = ["","","","","","","","",""];
    player = "X"; win = false;
    document.getElementById('status').innerText = "X кезеги";
    document.querySelectorAll('.cell').forEach(c => c.innerText = "");
}

// ==========================================
// 3-ОЮН: ЖЫЛАН (ЧЕТКЕ ТИЙГЕНДЕ ОШОЛ ЭЛЕ ЖЕРДЕН КАЙРА БАШТОО)
// ==========================================
let snakeGame; // Интервалды сактоо үчүн

function startSnake() {
    if (snakeGame) clearInterval(snakeGame); // Эски оюнду толук өчүрүү

    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("snakeScore");
    
    // Баштапкы маалыматтар
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 0, dy = 0;
    let score = 0;

    // Башкаруу (Жебелер)
    document.onkeydown = (e) => {
        if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
        if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
        if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
        if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
    };

    snakeGame = setInterval(() => {
        let head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // 1. ЧЕТКЕ ТИЙГЕНДИ ТЕКШЕРҮҮ (КҮЙДҮ)
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
            clearInterval(snakeGame);
            alert("КҮЙДҮҢҮЗ! Четке тийдиңиз. Кайра баштаңыз.");
            startSnake(); // Ошол замат 3-оюнду кайра баштайт
            return;
        }

        // 2. ӨЗҮН ТИШТЕГЕНДИ ТЕКШЕРҮҮ
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y && (dx !== 0 || dy !== 0)) {
                clearInterval(snakeGame);
                alert("КҮЙДҮҢҮЗ! Өзүңүздү тиштедиңиз.");
                startSnake();
                return;
            }
        }

        snake.unshift(head);

        // 3. ТАМАК ЖЕДИБИ?
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.innerText = "Упай: " + score;
            food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
            if (score >= 5) document.getElementById('toG4').classList.remove('hidden');
        } else {
            if (dx !== 0 || dy !== 0) snake.pop();
        }

        // ЭКРАНГА ЧИЙҮҮ
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * 15, food.y * 15, 14, 14);
        ctx.fillStyle = "lime";
        snake.forEach(s => ctx.fillRect(s.x * 15, s.y * 15, 14, 14));
    }, 150);
}

// 1-Оюндун логикасы (керек болсо)
function showGame(num) {
    for(let i=1; i<=4; i++) document.getElementById('game'+i).classList.add('hidden');
    document.getElementById('game'+num).classList.remove('hidden');
    if(num === 3) startSnake();
}