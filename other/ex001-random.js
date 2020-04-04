// http://curric.rithmschool.com/springboard/exercises/js-timers/

function randomGame() {
    let count = 0;
    let r = 0;

    let rr = function () {
        if (r < 0.75) {
            r = Math.random();
            console.log(`${++count}: ${r}`);
            setTimeout(rr, 1000);
        }
    };

    rr();
}

function randomGame2() {
    let count = 0;
    let r = 0;
    while (true) {
        r = Math.random();
        console.log(`${++count}: ${r}`);
        if (r < 0.75)
        setTimeout(function () { let i = 0; }, 1000);
        else
            break;
    };

    console.log(count);
}