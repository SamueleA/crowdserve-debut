var workerAddress= 0x0;

$(document).ready(function(){
  web3.version.getNetwork((err, netId) => {
    if (netId != "1") {
      $(".warnings").show();
      $("#networkWarning").show();
    }
  });
  if (web3.eth.accounts.length == 0) {
    $(".warnings").show();
    $("#noWeb3AccountWarning").show();
  }

  var vueInstance = new Vue({
    el:'#mainVue',
    data:{
      contractState:0,
      contractPreview:false,
      previewEndTime: 0,
      roundEndTime:0,
      totalContributed:0,
      totalRecalled:0,
      totalSupply:0,
      balanceOfContributor:0,
      events: []
    },
    updated: function() {
      if (window.matchMedia("(max-width: 500px)").matches) {
        $('.popover-bubble > span').data('container','body');
      }
      $('[data-toggle="popover"]')
        .on('click',function(e){
          e.preventDefault();
          return true;
        })
        .popover();
      //proposal and statements log scrollbar
      $('.scrollBar').mCustomScrollbar({
        scrollButtons: {
          enable:true
        },
        theme:"inset-dark",
        scrollInertia:150,
        autoHideScrollbar:true,
      });

    }
  });

  resize();
  $(window).resize(resize());
  function resize(){
    if (!window.matchMedia("(max-width: 700px)").matches) {
      //main scrollbars
      $('body').mCustomScrollbar({
        scrollButtons: {
          enable:true
        },
        theme:"inset-dark",
        scrollInertia:150,
        autoHideScrollbar:false
      });
    }
  }


  window.addEventListener("crowdserve_loaded", () =>{
    csContract.getFullState().then((res) =>{
      workerAddress = res.worker;
      vueInstance.contractState =  res.state;
      vueInstance.contractPreview = res.inPreview;
      vueInstance.previewEndTime = res.previewStageEndTime;
      vueInstance.roundEndTime = res.roundEndTime;
      vueInstance.totalContributed = res.totalContributed;
      vueInstance.totalRecalled = res.totalRecalled;
      vueInstance.totalSupply = res.totalSupply;
      //proposalString
      if (res.state == "Active" || res.state == "Ending") {
        csContract.getRoundBegunEvents().then((roundBegun)=>{
          var lastProposal = roundBegun[roundBegun.length-1].args.proposalString;
          $('.proposal-text').text(safeTextTransform(lastProposal));
        });
      } else {
        $('.proposal-text').text('No proposal issued!');
      }
    });

    csContract.balanceOf(web3.eth.accounts[0]).then((res)=>{
      vueInstance.balanceOfContributor = res;
    });

    //events
    csContract.getAllEvents().then((res) =>{
      for (var i=0; i< res.length; i++) {
        switch(res[i].event) {
          case 'RoundBegun':
            vueInstance.events.push({event:'RoundBegun',timestamp:res[i].timestamp, blockNumber:res[i].blockNumber, args:{amount:res[i].args.amount, from:res[i].args.from}});
            break;
          case 'RoundEnding':
            vueInstance.events.push({event:'RoundEnding',timestamp:res[i].timestamp, blockNumber:res[i].blockNumber, args:{amount:res[i].args.amount, from:res[i].args.from}});
            break;
          case 'RoundEnded':
            vueInstance.events.push({event:'RoundEnded',timestamp:res[i].timestamp, blockNumber:res[i].blockNumber, args:{amountRecalled:res[i].args.amountRecalled, amountWithdrawn:res[i].args.amountWithdrawn}});
            break;
          case 'Contribution':
            vueInstance.events.push({event:'Contribution',timestamp:res[i].timestamp, blockNumber:res[i].blockNumber, args:{contributor:res[i].args.contributor, amount:res[i].args.amount}});
            break;
          case 'FundsRecalled':
            vueInstance.events.push({event:'FundsRecalled',timestamp:res[i].timestamp, blockNumber:res[i].blockNumber, args:{contributor:res[i].args.contributor, amountBurned:res[i].args.amountBurned,amountReturned:res[i].args.amountReturned, message:res[i].args.message}});
            break;
          case 'ContributorStatement':
            vueInstance.events.push({event:'ContributorStatement',timestamp:res[i].timestamp, blockNumber:res[i].blockNumber, args:{contributor:res[i].args.contributor, amountBurned:res[i].args.amountBurned, message:res[i].args.message}});
            break;
          case 'WorkerStatement':
            vueInstance.events.push({event:'WorkerStatement',timestamp:res[i].timestamp, blockNumber:res[i].blockNumber, args:{message:res[i].args.message}});
            break;
          case 'Transfer':
            vueInstance.events.push({event:'Transfer',timestamp:res[i].timestamp, blockNumber:res[i].blockNumber, args:{from:res[i].args.from,to:res[i].args.to, value:res[i].args.value}});
            break;
        }
      }
    });
  });
});



//form functions
function contributeFundsFromForm() {
  var inputAmount = $('#contribute-amount-input').val();
  csContract.contribute(inputAmount);
}

function transferFundsFromForm() {
  var inputAmount = $('#transfer-amount-input').val();
  var inputTo = $('#transfer-address-input').val();
  csContract.transfer(inputTo, inputAmount);
}

function recallFundsFromForm() {
  var inputAmount = $('#recall-amount-input').val();
  var inputMessage = $('#recall-message-input').val();;
  csContract.recall(inputAmount,inputMessage);
}

function sendStatementFromForm() {
  var chatInput = $('#statement-text-input').val();
  if (web3.eth.accounts[0] == workerAddress) {
    csContract.setWorkerStatement(chatInput);
  } else {
    csContract.setContributorStatement(0, chatInput);
  }
  console.log('statement sent!');
  $('#sent-success').modal();
}
