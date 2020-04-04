// http://curric.rithmschool.com/springboard/exercises/js-timers/

function countDown(start) {
    if (start >= 1) {
        console.log(start);
        setTimeout(function () {
            countDown(--start);
        }, 1000);
    } else {
        console.log("\"DONE!\"");
    }
}

function countDown2(start) {
    if (start >= 1) {
        console.log(start);
        setTimeout(countDown2(--start), 1000);
    } else {
        console.log("\"DONE!\"");
    }
}