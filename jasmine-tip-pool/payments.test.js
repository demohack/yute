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

        expect(Object.keys(allServers).length).toEqual(1);
        expect(allServers['server1'].serverName).toEqual('ChesterTest');
        expect(serverTbody.childElementCount).toEqual(1);

        let tdList = serverTbody.querySelectorAll("#server1 td");
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
    let curPaymentSaved = deepCopyFunction(curPayment);

    let paymentTbodyinnerHTML = paymentTbody.innerHTML;
    let paymentIdSaved = paymentId;

    beforeEach(function () {
        // initialization logic
        let allPayments = {};

        paymentTbody.innerHTML = '';
        paymentId = 0;

        curPayment = {
            billAmt: 50,
            tipAmt: 10,
            tipPercent: 20
        };
    });

    it('should append a new row to paymentTbody on appendPaymentTable()', function () {
        appendPaymentTable();

        let payment = allPayments['payment1'];
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(payment.billAmt).toEqual('50');
        expect(payment.tipAmt).toEqual('10');
        expect(payment.tipPercent).toEqual(20);

        expect(Object.keys(allServers).length).toEqual(1);
        expect(allServers['server1'].serverName).toEqual('ChesterTest');
        expect(serverTbody.childElementCount).toEqual(1);

        let tdList = serverTbody.querySelectorAll("#server1 td");
        expect(tdList[0].innerText).toEqual('ChesterTest');
        expect(tdList[1].innerText).toEqual('$10.00');

        expect(summaryTds[0].innerHTML).toEqual('$50');
        expect(summaryTds[1].innerHTML).toEqual('$10');
        expect(summaryTds[2].innerHTML).toEqual('20%');
    });

    afterEach(function () {
        // teardown logic
        allPayments = allPaymentsSaved;
        curPayment = curPaymentSaved;
        paymentTbody.innerHTML = paymentTbodyinnerHTML;
        paymentId = paymentIdSaved;
    });
});