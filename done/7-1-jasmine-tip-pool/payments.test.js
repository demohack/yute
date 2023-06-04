"use strict"

describe("Test: submitPaymentInfo", function () {
    let allPaymentsSaved = deepCopyFunction(allPayments);

    let billAmtInputSaved = billAmtInput.value;
    let tipAmtInputSaved = tipAmtInput.value;
    let paymentTbodyinnerHTML = paymentTbody.innerHTML;
    let paymentIdSaved = paymentId;

    let allServersSaved = deepCopyFunction(allServers);
    let serverTbodyinnerHTML = serverTbody.innerHTML;

    let summaryTds0 = summaryTds[0].innerHTML;
    let summaryTds1 = summaryTds[1].innerHTML;
    let summaryTds2 = summaryTds[2].innerHTML;

    beforeEach(function () {
        // initialization logic
        let allPayments = {};

        billAmtInput.value = '50';
        tipAmtInput.value = '10';
        paymentTbody.innerHTML = '';
        paymentId = 0;

        allServers = {
            server1: {
                serverName: "ChesterTest"
            }
        };

        serverTbody.innerHTML = '<tr id="server1"><td>ChesterTest</td><td>$0.00</td></tr>';

        summaryTds[0].innerHTML = "";
        summaryTds[1].innerHTML = "";
        summaryTds[2].innerHTML = "";
    });

    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
        submitPaymentInfo();

        let payment = allPayments['payment1'];
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(payment.billAmt).toEqual('50');
        expect(payment.tipAmt).toEqual('10');
        expect(payment.tipPercent).toEqual(20);

        let tdList = paymentTbody.querySelectorAll("#payment1 td");
        expect(tdList[0].innerText).toEqual('$50');
        expect(tdList[1].innerText).toEqual('$10');
        expect(tdList[2].innerText).toEqual('20%');

        expect(Object.keys(allServers).length).toEqual(1);
        expect(allServers['server1'].serverName).toEqual('ChesterTest');
        expect(serverTbody.childElementCount).toEqual(1);

        tdList = serverTbody.querySelectorAll("#server1 td");
        expect(tdList[0].innerText).toEqual('ChesterTest');
        expect(tdList[1].innerText).toEqual('$10.00');

        expect(summaryTds[0].innerHTML).toEqual('$50');
        expect(summaryTds[1].innerHTML).toEqual('$10');
        expect(summaryTds[2].innerHTML).toEqual('20%');
    });

    afterEach(function () {
        // teardown logic
        allPayments = allPaymentsSaved;

        billAmtInput.value = billAmtInputSaved;
        tipAmtInput.value = tipAmtInputSaved;
        paymentTbody.innerHTML = paymentTbodyinnerHTML;
        paymentId = paymentIdSaved;

        allServers = allServersSaved;
        serverTbody.innerHTML = serverTbodyinnerHTML;

        summaryTds[0].innerHTML = summaryTds0;
        summaryTds[1].innerHTML = summaryTds1;
        summaryTds[2].innerHTML = summaryTds2;
    });
});

describe("Test: createCurPayment", function () {
    let billAmtInputSaved = billAmtInput.value;
    let tipAmtInputSaved = tipAmtInput.value;

    beforeEach(function () {
        // initialization logic
        billAmtInput.value = '50';
        tipAmtInput.value = '10';
    });

    it('should return a new payment on createCurPayment()', function () {
        let payment = createCurPayment();

        expect(payment.billAmt).toEqual('50');
        expect(payment.tipAmt).toEqual('10');
        expect(payment.tipPercent).toEqual(20);
    });

    afterEach(function () {
        // teardown logic

        billAmtInput.value = billAmtInputSaved;
        tipAmtInput.value = tipAmtInputSaved;
    });
});

describe("Test: appendPaymentTable", function () {
    let allPaymentsSaved = deepCopyFunction(allPayments);

    let paymentTbodyinnerHTML = paymentTbody.innerHTML;
    let paymentIdSaved = paymentId;

    beforeEach(function () {
        // initialization logic
        let allPayments = {};

        paymentTbody.innerHTML = '';

        paymentId = 1; // we're defining one payment, so paymentId is assigned 1
    });

    it('should append a new row to paymentTbody on appendPaymentTable()', function () {
        let curPayment = {
            billAmt: 50,
            tipAmt: 10,
            tipPercent: 20
        };

        appendPaymentTable(curPayment, 'payment1');

        allPayments['payment1'] = curPayment;

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(curPayment.billAmt).toEqual(50);
        expect(curPayment.tipAmt).toEqual(10);
        expect(curPayment.tipPercent).toEqual(20);

        let tdList = paymentTbody.querySelectorAll("#payment1 td");
        expect(tdList[0].innerText).toEqual('$50');
        expect(tdList[1].innerText).toEqual('$10');
        expect(tdList[2].innerText).toEqual('20%');
    });

    afterEach(function () {
        // teardown logic
        allPayments = allPaymentsSaved;
        paymentTbody.innerHTML = paymentTbodyinnerHTML;
        paymentId = paymentIdSaved;
    });
});

describe("Test: updatePaymentTable", function () {
    let allPaymentsSaved = deepCopyFunction(allPayments);
    let paymentTbodyinnerHTML = paymentTbody.innerHTML;

    beforeEach(function () {
        // initialization logic
        paymentTbody.innerHTML = '';

        allPayments = {
            payment1: {
                billAmt: 10,
                tipAmt: 1,
                tipPercent: 10
            },
            payment2: {
                billAmt: 10,
                tipAmt: 1,
                tipPercent: 10
            },
            payment3: {
                billAmt: 10,
                tipAmt: 1,
                tipPercent: 10
            }
        }
    });

    it('should update the payment table', function () {
        updatePaymentTable();

        expect(Object.keys(allPayments).length).toEqual(3);

        let tdList = paymentTbody.querySelectorAll("#payment1 td");
        expect(tdList[0].innerText).toEqual('$10');
        expect(tdList[1].innerText).toEqual('$1');
        expect(tdList[2].innerText).toEqual('10%');

        tdList = paymentTbody.querySelectorAll("#payment2 td");
        expect(tdList[0].innerText).toEqual('$10');
        expect(tdList[1].innerText).toEqual('$1');
        expect(tdList[2].innerText).toEqual('10%');

        tdList = paymentTbody.querySelectorAll("#payment3 td");
        expect(tdList[0].innerText).toEqual('$10');
        expect(tdList[1].innerText).toEqual('$1');
        expect(tdList[2].innerText).toEqual('10%');
    });

    afterEach(function () {
        // teardown logic
        allPayments = allPaymentsSaved;
        paymentTbody.innerHTML = paymentTbodyinnerHTML;
    });
});


describe("Test: removePayment", function () {
    let allPaymentsSaved = deepCopyFunction(allPayments);
    let paymentTbodyinnerHTML = paymentTbody.innerHTML;

    beforeEach(function () {
        // initialization logic
        paymentTbody.innerHTML = '';

        allPayments = {
            payment1: {
                billAmt: 10,
                tipAmt: 1,
                tipPercent: 10
            },
            payment2: {
                billAmt: 10,
                tipAmt: 1,
                tipPercent: 10
            },
            payment3: {
                billAmt: 10,
                tipAmt: 1,
                tipPercent: 10
            }
        };

        updatePaymentTable();
    });

    it('should update the payment table', function () {
        removePayment('payment1');

        expect(Object.keys(allPayments).length).toEqual(2);
        expect(allPayments['payment1']).toEqual(undefined);
        expect(allPayments['payment2']).not.toEqual(undefined);
        expect(allPayments['payment3']).not.toEqual(undefined);

        let tdList = paymentTbody.querySelectorAll("#payment1 td");
        expect(tdList.length).toEqual(0);

        tdList = paymentTbody.querySelectorAll("#payment2 td");
        expect(tdList[0].innerText).toEqual('$10');
        expect(tdList[1].innerText).toEqual('$1');
        expect(tdList[2].innerText).toEqual('10%');

        tdList = paymentTbody.querySelectorAll("#payment3 td");
        expect(tdList[0].innerText).toEqual('$10');
        expect(tdList[1].innerText).toEqual('$1');
        expect(tdList[2].innerText).toEqual('10%');
    });

    afterEach(function () {
        // teardown logic
        allPayments = allPaymentsSaved;
        paymentTbody.innerHTML = paymentTbodyinnerHTML;
    });
});

describe("Test: updateSummary", function () {
    let allPaymentsSaved = deepCopyFunction(allPayments);
    let paymentIdSaved = paymentId;

    let paymentTbodyinnerHTML = paymentTbody.innerHTML;

    let summaryTds0 = summaryTds[0].innerHTML;
    let summaryTds1 = summaryTds[1].innerHTML;
    let summaryTds2 = summaryTds[2].innerHTML;

    beforeEach(function () {
        // initialization logic
        let allPayments = {};

        paymentTbody.innerHTML = '';
        paymentId = 0;

        summaryTds[0].innerHTML = "";
        summaryTds[1].innerHTML = "";
        summaryTds[2].innerHTML = "";
    });

    it('should add a new payment to allPayments on submitPaymentInfo()', function () {

        paymentId = 1;
        allPayments['payment1'] = {
            billAmt: 50,
            tipAmt: 10,
            tipPercent: 20
        };

        appendPaymentTable(allPayments['payment1'], 'payment1');

        let tdList = paymentTbody.querySelectorAll("#payment1 td");
        expect(tdList[0].innerText).toEqual('$50');
        expect(tdList[1].innerText).toEqual('$10');
        expect(tdList[2].innerText).toEqual('20%');

        paymentId = 2;
        allPayments['payment2'] = {
            billAmt: 50,
            tipAmt: 10,
            tipPercent: 20
        };

        appendPaymentTable(allPayments['payment2'], 'payment2');

        tdList = paymentTbody.querySelectorAll("#payment2 td");
        expect(tdList[0].innerText).toEqual('$50');
        expect(tdList[1].innerText).toEqual('$10');
        expect(tdList[2].innerText).toEqual('20%');

        updateSummary();

        expect(summaryTds[0].innerHTML).toEqual('$100');
        expect(summaryTds[1].innerHTML).toEqual('$20');
        expect(summaryTds[2].innerHTML).toEqual('20%');
    });

    afterEach(function () {
        // teardown logic
        allPayments = allPaymentsSaved;
        paymentId = paymentIdSaved;

        paymentTbody.innerHTML = paymentTbodyinnerHTML;

        summaryTds[0].innerHTML = summaryTds0;
        summaryTds[1].innerHTML = summaryTds1;
        summaryTds[2].innerHTML = summaryTds2;
    });
});