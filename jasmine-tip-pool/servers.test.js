describe("Test: submitServerInfo", function () {
  let allServersSaved = deepCopyFunction(allServers);
  let serverNameInputSaved = serverNameInput.value;
  let serverTbodyinnerHTML = serverTbody.innerHTML;
  let serverIdSaved = serverId;

  beforeEach(function () {
    // initialization logic
    allServers = {};
    serverNameInput.value = 'Alice';
    serverTbody.innerHTML = '';
    serverId = 0;
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server1'].serverName).toEqual('Alice');
  });

  afterEach(function () {
    // teardown logic
    serverNameInput.value = serverNameInputSaved;
    serverTbody.innerHTML = serverTbodyinnerHTML;
    allServers = allServersSaved;
    serverId = serverIdSaved;
  });
});


describe("Test: updateServerTable", function () {
  let allServersSaved = deepCopyFunction(allServers);
  let serverTbodyinnerHTML = serverTbody.innerHTML;
  let allPaymentsSaved = deepCopyFunction(allPayments);

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



describe("Test: removeServer", function () {
  let allServersSaved = deepCopyFunction(allServers);
  let serverTbodyinnerHTML = serverTbody.innerHTML;
  let allPaymentsSaved = deepCopyFunction(allPayments);

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

    updateServerTable();
  });

  it('should remove a server from server table when server is clicked', function () {

    removeServer('server1');

    expect(Object.keys(allServers).length).toEqual(2);
    expect(allServers['server1']).toEqual(undefined);
    expect(allServers['server2'].serverName).toEqual('BillTest');
    expect(allServers['server3'].serverName).toEqual('ChesterTest');

    let tdList = serverTbody.querySelectorAll("#server1 td");
    expect(tdList.length).toEqual(0);

    tdList = serverTbody.querySelectorAll("#server2 td");
    expect(tdList[0].innerText).toEqual('BillTest');
    expect(tdList[1].innerText).toEqual('$1.50');

    tdList = serverTbody.querySelectorAll("#server3 td");
    expect(tdList[0].innerText).toEqual('ChesterTest');
    expect(tdList[1].innerText).toEqual('$1.50');
  });

  afterEach(function () {
    // teardown logic
    allServers = allServersSaved;
    serverTbody.innerHTML = serverTbodyinnerHTML;
    allPayments = allPaymentsSaved;
  });
});