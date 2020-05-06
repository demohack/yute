"use strict"

describe("Test: sumPaymentTotal", function () {
    let allPaymentsSaved = deepCopyFunction(allPayments);
    let paymentIdSaved = paymentId;

    beforeEach(function () {
        // initialization logic
        paymentId = 1;
        allPayments['payment1'] = {
            billAmt: 50,
            tipAmt: 10,
            tipPercent: 20
        };

        paymentId = 2;
        allPayments['payment2'] = {
            billAmt: 50,
            tipAmt: 10,
            tipPercent: 20
        };

    });

    it('should return a payment total', function () {
        expect(sumPaymentTotal('billAmt')).toEqual(100);
        expect(sumPaymentTotal('tipAmt')).toEqual(20);
    });

    afterEach(function () {
        // teardown logic
        allPayments = allPaymentsSaved;
        paymentId = paymentIdSaved;
    });
});


describe("Test: calculateTipPercent", function () {
    let allPaymentsSaved = deepCopyFunction(allPayments);
    let paymentIdSaved = paymentId;

    beforeEach(function () {
        // initialization logic
        paymentId = 1;
        allPayments['payment1'] = {
            billAmt: 50,
            tipAmt: 10,
            tipPercent: 20
        };

        paymentId = 2;
        allPayments['payment2'] = {
            billAmt: 50,
            tipAmt: 10,
            tipPercent: 20
        };

    });

    it('should calculate a tip percent', function () {
        expect(calculateTipPercent(sumPaymentTotal('billAmt'), sumPaymentTotal('tipAmt'))).toEqual(20);
    });

    afterEach(function () {
        // teardown logic
        allPayments = allPaymentsSaved;
        paymentId = paymentIdSaved;
    });
});


describe("Test: appendTd", function () {
    beforeEach(function () {
        // initialization logic
    });

    it('should append a couple of td to a row', function () {
        let newTr = document.createElement('tr');
        newTr.id = 'server1'

        appendTd(newTr, 'ChesterTest');
        appendTd(newTr, '$0.00');

        expect(newTr.outerHTML).toEqual('<tr id="server1"><td>ChesterTest</td><td>$0.00</td></tr>');
    });


    afterEach(function () {
        // teardown logic
    });
});


describe("Test: appendDeleteBtn", function () {
    beforeEach(function () {
        // initialization logic
    });

    it('should append a delete button wrapped in a td to a row', function () {
        let newTr = document.createElement('tr');
        newTr.id = 'server1'

        appendDeleteBtn(newTr);

        expect(newTr.outerHTML).toEqual('<tr id="server1"><td><button>X</button></td></tr>');
    });


    afterEach(function () {
        // teardown logic
    });
});


describe("Test: deepCopyFunction", function () {
    let objectA = {
        billAmt: 50,
        tipAmt: 10,
        tipPercent: 20
    };

    let objectB = deepCopyFunction(objectA);

    beforeEach(function () {
        // initialization logic
    });

    it('should show that the values of objectA equals the values of objectB', function () {
        expect(JSON.stringify(objectA) == JSON.stringify(objectB)).toEqual(true);
    });

    it('should show that objectA does not equal objectB', function () {
        expect(objectA === objectB).toEqual(false);
    });


    afterEach(function () {
        // teardown logic
    });
});