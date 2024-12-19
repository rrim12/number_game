let result = document.querySelector("#result"),
    chance = document.querySelector("#chance"),
    user = document.querySelector("#user"),
    playBtn = document.querySelector("#play"),
    resetBtn = document.querySelector("#reset");
let chances = 5;
let gameOver = false;
let history = [];

function randomNum() {
    computerNum = Math.floor(Math.random() * 100 + 1);
    //숫자 랜덤으로 생성하기
    console.log(computerNum);
}
randomNum();

playBtn.addEventListener("click", play);
//함수명만 넣어야함 괄호 넣으면 안됨

function play() {
    let userNum = user.value; //입력값
    // console.log(userNum);

    if (userNum < 1 || userNum > 100) {
        document.querySelector("#imgBox").src = "img/countdown.gif";
        result.textContent = "1부터 100까지의 숫자를 입력하세요";
        return;
    }

    if (history.includes(userNum)) {
        document.querySelector("#imgBox").src = "img/countdown.gif";
        result.innerHTML =
            "이미 입력한 숫자입니다.<br>다른 숫자를 입력해주세요.";
        return;
    }
    if (userNum < computerNum) {
        result.textContent = "Up";
        document.querySelector("#imgBox").src = "img/up.gif";
    } else if (userNum > computerNum) {
        result.textContent = "Down";
        document.querySelector("#imgBox").src = "img/down.gif";
    } else {
        result.textContent = "BingGo!";
        document.querySelector("#imgBox").src = "img/audiences.gif";
        user.disabled = true;
        playBtn.disabled = true;
    }
    chances = chances - 1;

    // console.log(chances);
    chance.textContent = `남은찬스: ${chances}번`;

    history.push(userNum);
    // console.log(history);

    if (chances < 1) {
        if (userNum == computerNum) {
            result.textContent = "BingGo!";
            document.querySelector("#imgBox").src = "img/audiences.gif";
            user.disabled = true;
            playBtn.disabled = true;
        } else {
            gameOver = true;
            result.textContent = "Game Over!";
            document.querySelector("#imgBox").src = "img/game-over.gif";
        }
    }
    if (gameOver == true) {
        playBtn.disabled = true;
        user.disabled = true;
    }
    resetBtn.addEventListener("click", reset);
    function reset() {
        user.value = "";
        chances = 5;
        chance.textContent = `남은찬스: ${chances}번`;
        result.textContent = "결과화면 : up / down /bingo";

        gameOver = false;
        if (gameOver == false) {
            playBtn.disabled = false;
            user.disabled = false;
        }
        document.querySelector("#imgBox").src = "img/countdown.gif";

        history = [];
        randomNum();
    }
    user.addEventListener("focus", () => {
        user.value = "";
    });
}
