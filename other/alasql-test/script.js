let db = new alasql.Database();
db.exec('CREATE TABLE one (two INT)');
let res = db.exec("SELECT * FROM one");

db.exec('INSERT INTO one (?,?)', [5, 6]);
res = db.exec("SELECT * FROM one");

// res == [2015,2016]

let data = [{
    a: 1,
    b: 1,
    c: 1
}, {
    a: 1,
    b: 2,
    c: 1
}, {
    a: 1,
    b: 3,
    c: 1
}, {
    a: 2,
    b: 1,
    c: 1
}];

res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a', [data]);
console.log(res);

data = [
    [2014, 1, 1],
    [2015, 2, 1],
    [2016, 3, 1],
    [2017, 4, 2],
    [2018, 5, 3],
    [2019, 6, 3]
];
res = alasql('SELECT SUM([1]) FROM ? d WHERE [0]>2016', [data]);

let res2 = data.filter(function (a) {
    return a[0] > 2016
});
