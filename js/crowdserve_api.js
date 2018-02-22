const MAINNET_CROWDSERVE_ADDRESS = "";
const MAINNET_EVENTSTART_BLOCKNR = 5128000;
const ROPSTEN_CROWDSERVE_ADDRESS = "0xec7d93b4055a7abebb97d7666c471e2f21b98931";
const ROPSTEN_EVENTSTART_BLOCKNR = 2693000;
const GANACHE_CROWDSERVE_ADDRESS = "0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab";


window.addEventListener(("load"), () => {

  // Checking i Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  var crowdServeInstanceAddress;
  var eventStartBlock;

  web3.version.getNetwork((err, netId) => {
    switch (netId) {
      case "1":
        console.log('This is mainnet');
        crowdServeInstanceAddress = MAINNET_CROWDSERVE_ADDRESS;
        eventStartBlock = MAINNET_EVENTSTART_BLOCKNR;
        break
      case "2":
        console.log('This is the deprecated Morden test network.')
        break
      case "3":
        console.log('This is the ropsten test network.');
        crowdServeInstanceAddress = ROPSTEN_CROWDSERVE_ADDRESS;
        eventStartBlock = ROPSTEN_EVENTSTART_BLOCKNR;
        break
      case "4":
        console.log('This is the Rinkeby test network.')
        break
      case "42":
        console.log('This is the Kovan test network.')
        break
      default:
        crowdServeInstanceAddress = GANACHE_CROWDSERVE_ADDRESS;
        eventStartBlock = 0;
        console.log('This is an unknown network.')
    }

  //create sample crowdserve object for initialization of crowdserve instances
  var CrowdServeClass =  web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "totalContributed",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "recallAmount",
				"type": "uint256"
			},
			{
				"name": "message",
				"type": "string"
			}
		],
		"name": "recall",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "contributors",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "worker",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "maxLoops",
				"type": "uint256"
			}
		],
		"name": "tryRoundEnd",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "previewStageEndTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "who",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "burnAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "minPreviewInterval",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "message",
				"type": "string"
			}
		],
		"name": "workerStatement",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFullState",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint8"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "minContribution",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "proposalString",
				"type": "string"
			},
			{
				"name": "previewStageInterval",
				"type": "uint256"
			},
			{
				"name": "roundInterval",
				"type": "uint256"
			}
		],
		"name": "beginProjectRound",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalRecalled",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "contribute",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "roundEndTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "burnAmount",
				"type": "uint256"
			},
			{
				"name": "message",
				"type": "string"
			}
		],
		"name": "contributorStatement",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_worker",
				"type": "address"
			},
			{
				"name": "_minPreviewInterval",
				"type": "uint256"
			},
			{
				"name": "_minContribution",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "proposalString",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "previewStageEndTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "roundEndTime",
				"type": "uint256"
			}
		],
		"name": "RoundBegun",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "RoundEnding",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "amountRecalled",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "amountWithdrawn",
				"type": "uint256"
			}
		],
		"name": "RoundEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "contributor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Contribution",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "contributor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amountBurned",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "amountReturned",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "FundsRecalled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "contributor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amountBurned",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "ContributorStatement",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "WorkerStatement",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
]);

  //Instantiate contract object from already deployed contract at given address
  var CrowdServe = CrowdServeClass.at(crowdServeInstanceAddress);


  /////////Reading calls begin here/////////////////////////////////////////////////////
  //method to call all state variables of the contract, returns object with strings and integers
  window.csContract= {};

  window.csContract.getFullState = () => {
    return new Promise((resolve, reject) => {
      CrowdServe.getFullState((err, res) => {
        if (err){
            reject(err);
        }
        else {
          var fullState = {
          // minPreviewInterval, minContribution, worker, state, inPreview, previewStageEndTime, roundEndTime, totalContributed, totalRecalled, totalSupply
          minPreviewInterval: Number(new web3.BigNumber(res[0])),
          minContribution: Number(new web3.BigNumber(res[1])),
          worker: res[2],
          inPreview: res[4],
          state: stateOutput(Number(res[3]), res[4]),
          previewStageEndTime: Number(new web3.BigNumber(res[5])),
          roundEndTime: Number(new web3.BigNumber(res[6])),
          totalContributed: Number(new web3.BigNumber(res[7])),
          totalRecalled: Number(new web3.BigNumber(res[8])),
          totalSupply: Number(new web3.BigNumber(res[9]))
        };
          resolve(fullState);
        }
      });
    });
  }

  //method to read the current balance of erc223 tokens in contract
  window.csContract.balanceOf = (address) => {
    return new Promise((resolve, reject) => {
      CrowdServe.balanceOf(address, (err, res) => {
        if(err){
          reject(err);
        }
        else{
          var balance = Number(new web3.BigNumber(res));
          resolve(balance);
        }
      })
    });
  }
  /////////Event Reading calls begin here//////////////////////////////////////
  // would get all past logs again.
  window.csContract.getAllEvents = () => {
    return new Promise((resolve, reject) => {
      var allEvents = CrowdServe.allEvents({fromBlock: eventStartBlock, toBlock: 'latest'});
      allEvents.get((err, res) => {
        if(err){
          reject(err);
        } else{
          var allEventsArray = [];
          var tsPromiseArray = [];
          res.forEach((element) => {
            var parsedArgsObject = parseEventArguments(element.args);
            var eventObject = {event: element.event, transactionHash: element.transactionHash, blockNumber:element.blockNumber, args: parsedArgsObject};
            
            var tsPromise = new Promise((tsResolve, reject) => {
              getBlockTimeStamp(element.blockHash).then(timestamp => {
                eventObject.timestamp = timestamp;
                tsResolve();
              });
            });
            tsPromiseArray.push(tsPromise);
            
            allEventsArray.push(eventObject);
          });
          
          Promise.all(tsPromiseArray).then(function() {
            resolve(allEventsArray);
          });
        }
      });
    });
  }

  // event RoundBegun(string proposalString, uint previewStageEndTime, uint roundEndTime);
  window.csContract.getRoundBegunEvents = () => {
    return new Promise((resolve, reject) => {
      var roundBegun = CrowdServe.RoundBegun({}, {fromBlock: eventStartBlock, toBlock: 'latest'});
      roundBegun.get((err, res) => {
        if(err){
          reject(err);
        }
        else{
          var roundBegunEventsArray = [];
          res.forEach((element) => {
            var parsedArguments = {previewStageEndTime: Number(new web3.BigNumber(element.args.previewStageEndTime)), proposalString: element.args.proposalString,
              roundEndTime: Number(new web3.BigNumber(element.args.roundEndTime))}
            var eventObject = {args: parsedArguments, event: element.event, transactionHash: element.transactionHash}
            roundBegunEventsArray.push(eventObject);
          });
          resolve(roundBegunEventsArray);
        }
      });
    });
  }

  // event RoundEnding();
  window.csContract.getRoundEndingEvents = () => {
    return new Promise((resolve, reject) => {
      var roundEnding = CrowdServe.RoundEnding({}, {fromBlock: eventStartBlock, toBlock: 'latest'});
      roundEnding.get((err, res) => {
        if(err){
          reject(err);
        }else{
          var roundEndingEventsArray = [];
          res.forEach((element) => {
            var eventObject = {event: element.event, transactionHash: element.transactionHash}
            roundEndingEventsArray.push(eventObject);
          });
          resolve(roundEndingEventsArray);
        }
      });
    });
  }

  // event RoundEnded(uint amountRecalled, uint amountWithdrawn);
  window.csContract.getRoundEndedEvents = () => {
    return new Promise((resolve, reject) => {
      var roundEnded = CrowdServe.RoundEnded({}, {fromBlock: eventStartBlock, toBlock: 'latest'});
      roundEnded.get((err, res) => {
        if(err){
          reject(err);
        }else{
          var roundEndedEventsArray = [];
          res.forEach((element) => {
            var parsedArguments = {amountRecalled: Number(new web3.BigNumber(element.args.amountRecalled)),
              amountWithdrawn: Number(new web3.BigNumber(element.args.amountWithdrawn))}
            var eventObject = {args: parsedArguments, event: element.event, transactionHash: element.transactionHash}
            roundEndedEventsArray.push(eventObject);
          });
          resolve(roundEndedEventsArray);
        }
      });
    });
  }

   // event Contribution(address contributor, uint amount);
  window.csContract.getContributionEvents = () => {
    return new Promise((resolve, reject) => {
      var contribution = CrowdServe.Contribution({}, {fromBlock: eventStartBlock, toBlock: 'latest'});
      contribution.get((err, res) => {
        if(err){
          reject(err);
        }
        else{
          var contributionEventsArray = [];
          res.forEach((element) => {
            var parsedArguments = {contributor: element.args.contributor, amount: Number(new web3.BigNumber(element.args.amount))}
            var eventObject = {args: parsedArguments, event: element.event, transactionHash: element.transactionHash}
            contributionEventsArray.push(eventObject);
          });
          resolve(contributionEventsArray);
        }
      });
    });
  }

  // event FundsRecalled(address contributor, uint amountBurned, uint amountReturned, string message);
  window.csContract.getFundsRecalledEvents = () => {
    return new Promise((resolve, reject) => {
      var fundsRecalled = CrowdServe.FundsRecalled({}, {fromBlock: eventStartBlock, toBlock: 'latest'});
      fundsRecalled.get((err, res) => {
        if(err){
          reject(err);
        }
        else{
          var fundsRecalledEventsArray = [];
          res.forEach((element) => {
            var parsedArguments = {contributor: element.args.contributor, amountBurned: Number(new web3.BigNumber(element.args.amountBurned)),
              amountReturned: Number(new web3.BigNumber(element.args.amountReturned)), message: element.args.message}
            var eventObject = {args: parsedArguments, event: element.event, transactionHash: element.transactionHash}
            fundsRecalledEventsArray.push(eventObject);
          });
          resolve(fundsRecalledEventsArray);
        }
      });
    });
  }

  // event ContributorStatement(address contributor, uint amountBurned, string message);
  window.csContract.getContributorStatementEvents = () => {
    return new Promise((resolve, reject) => {
      var contributorStatement = CrowdServe.ContributorStatement({}, {fromBlock: eventStartBlock, toBlock: 'latest'});
      contributorStatement.get((err, res) => {
        if(err){
          reject(err);
        }
        else{
          var contributorStatementEventsArray = [];
          res.forEach((element) => {
            var parsedArguments = {contributor: element.args.contributor, amountBurned: Number(new web3.BigNumber(element.args.amountBurned)),
              message: element.args.message}
            var eventObject = {args: parsedArguments, event: element.event, transactionHash: element.transactionHash}
            contributorStatementEventsArray.push(eventObject);
          });
          resolve(contributorStatementEventsArray);
        }
      });
    });
  }

  // event WorkerStatement(string message);
  window.csContract.getWorkerStatementEvents = () => {
    return new Promise((resolve, reject) => {
      var workerStatement = CrowdServe.WorkerStatement({}, {fromBlock: eventStartBlock, toBlock: 'latest'});
      workerStatement.get((err, res) => {
        if(err){
          reject(err);
        }
        else{
          var workerStatementEventsArray = [];
          res.forEach((element) => {
            var parsedArguments = {message: element.args.message}
            var eventObject = {args: parsedArguments, event: element.event, transactionHash: element.transactionHash}
            workerStatementEventsArray.push(eventObject);
          });
          resolve(workerStatementEventsArray);
        }
      });
    });
  }



/////////////////Transaction/Function calls begin here////////////////////////////////////////////////////////
  // function beginProjectRound(string proposalString, uint previewStageInterval, uint roundInterval)
  window.csContract.beginProjectRound = (proposalString, previewStageInterval, roundInterval) => {
    return new Promise((resolve, reject) => {
      CrowdServe.beginProjectRound(proposalString, previewStageInterval, roundInterval, (err, res) => {
        if (err){
          reject(err);
        }
        else {
          resolve(res);
        }
      })
    });
  }

  //function transfer(address _to, uint _value, bytes _data)
  window.csContract.transfer = (address, value) => {
    return new Promise((resolve, reject) => {
      CrowdServe.transfer(address, web3.toWei(value), (err, res) => {
        if (err){
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  window.csContract.contribute = (amountInEth) => {
    return new Promise((resolve, reject) => {
      CrowdServe.contribute({value: web3.toWei(amountInEth)}, (err, res) => {
        if (err){
          reject(err);
        } else{
          resolve(res);
        }
      });
    });
  }

  window.csContract.recall = (amountInEth, message) => {
    return new Promise((resolve, reject) => {
      CrowdServe.recall(web3.toWei(amountInEth), message, (err,res) => {
        if (err){
          reject(err);
        } else{
          resolve(res);
        }
      });
    });
  }

  window.csContract.setContributorStatement = (burnAmountInEth, statement) => {
    return new Promise((resolve, reject) => {
      CrowdServe.contributorStatement(web3.toWei(burnAmountInEth), statement, (err,res) => {
        if(err){
          reject(err);
        } else{
          resolve(res);
        }
      });
    });
  }

  window.csContract.setWorkerStatement = (statement) => {
    return new Promise((resolve, reject) => {
      CrowdServe.workerStatement(statement, (err,res) => {
        if(err){
          reject(err);
        } else{
          resolve(res);
        }
      });
    });
  }

  window.csContract.tryRoundEnd = (maxLoops) => {
    return new Promise((reject, resolve) => {
      CrowdServe.tryRoundEnd(maxLoops, (err,res) => {
        if(err){
          reject(err);
        }else{
          resolve(res);
        }
      });
    });
  }

  var csEvent = new Event('crowdserve_loaded');
  window.dispatchEvent(csEvent);

});
});


//function used in csContract.getFullState() to transform state integer to string representation
stateOutput = (stateInteger, inPreview) => {
  switch (stateInteger){
    case 0:
      //if (inPreview){
      //  return "Active (Preview)"
      //} else{
      return "Active";
      //}
      break;
    case 1:
      return "Ending";
      break;
    case 2:
      return "Inactive";
      break;
    default:
      return undefined;
      break;
  }
}

//used in csContract.getAllEvents() for the correct parsing of BigNumber arguments of events
  var parseEventArguments = (eventArguments) => {
    var argsObject = {};
    for (var key in eventArguments){
      if(eventArguments.hasOwnProperty(key)){
        argumentValue = eventArguments[key];
        if(typeof argumentValue === "object"){
          argsObject[key] = Number(new web3.BigNumber(argumentValue));
        } else{
          argsObject[key] = argumentValue;
        }
      }
    }
    return argsObject;
  }
