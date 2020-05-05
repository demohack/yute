describe("Test: submitPaymentInfo", function () {
    let allPaymentsSaved = allPayments;

    let billAmtInputSaved = billAmtInput.value;
    let tipAmtInputSaved = tipAmtInput.value;
    let paymentTbodyinnerHTML = paymentTbody.innerHTML;

    let allServersSaved = allServers;
    let serverTbodyinnerHTML = serverTbody.innerHTML;
    let allPaymentsSaved = allPayments;

    beforeEach(function () {
        // initialization logic
        let allPayments = {};

        billAmtInput.value = '50';
        tipAmtInput.value = '10';
        serverTbody.innerHTML = '';

        allServers = {
            server1: {
                serverName: "ChesterTest"
            }
        };

        serverTbody.innerHTML = '<tr id="server2"><td>ChesterTest</td><td>$0.00</td></tr>';
    });

    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment' + paymentId].billAmt).toEqual('50');
        expect(allPayments['payment' + paymentId].tipAmt).toEqual('10');
        expect(allPayments['payment' + paymentId].tipPercent).toEqual('20%');

        expect(Object.keys(allServers).length).toEqual(1);
        expect(allServers['server1'].serverName).toEqual('ChesterTest');
        expect(serverTbody.childElementCount).toEqual(1);

        let tdList = serverTbody.querySelectorAll("#server1 td");
        expect(tdList[0].innerText).toEqual('ChesterTest');
        expect(tdList[1].innerText).toEqual('$10.00');
    });

    afterEach(function () {
        // teardown logic
        allPayments = allPaymentsSaved;

        billAmtInput.value = billAmtInputSaved;
        tipAmtInput.value = tipAmtInputSaved;
        paymentTbody.innerHTML = paymentTbodyinnerHTML;

        allServers = allServersSaved;
        serverTbody.innerHTML = serverTbodyinnerHTML;
    });
});


describe("Test: updateServerTable", function () {
    let allServersSaved = allServers;
    let serverTbodyinnerHTML = serverTbody.innerHTML;
    let allPaymentsSaved = allPayments;

    beforeEach(function () {
        // initialization logic
        allServers = {
            server1: {
                serverName: "JasmineTest"
            },
            server2: {
                serverName: "BillTest"
            },
            server3: {
                serverName: "ChesterTest"
            }
        };

        serverTbody.innerHTML = '';

        allPayments = {
            payment1: {
                billAmt: 10,
                tipAmt: 1,
                tipPercent: .1
            },
            payment2: {
                billAmt: 10,
                tipAmt: 1,
                tipPercent: .1
            },
            payment3: {
                billAmt: 10,
                tipAmt: 1,
                tipPercent: .1
            }
        }
    });

    it('should append a row of Server name and Earnings, for each server', function () {
        updateServerTable();

        expect(Object.keys(allServers).length).toEqual(3);
        expect(allServers['server1'].serverName).toEqual('JasmineTest');
        expect(allServers['server2'].serverName).toEqual('BillTest');
        expect(allServers['server3'].serverName).toEqual('ChesterTest');

        expect(serverTbody.childElementCount).toEqual(3);

        let tdList = serverTbody.querySelectorAll("#server1 td");
        expect(tdList[0].innerText).toEqual('JasmineTest');
        expect(tdList[1].innerText).toEqual('$1.00');

        tdList = serverTbody.querySelectorAll("#server2 td");
        expect(tdList[0].innerText).toEqual('BillTest');
        expect(tdList[1].innerText).toEqual('$1.00');

        tdList = serverTbody.querySelectorAll("#server3 td");
        expect(tdList[0].innerText).toEqual('ChesterTest');
        expect(tdList[1].innerText).toEqual('$1.00');
    });

    afterEach(function () {
        // teardown logic
        allServers = allServersSaved;
        serverTbody.innerHTML = serverTbodyinnerHTML;
        allPayments = allPaymentsSaved;
    });
});