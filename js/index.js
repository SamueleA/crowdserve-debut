var producerAddress= 0x0;

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
      $('.chat-container>div:first' ).find('.popover-bubble>span').data('placement', 'bottom');
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
      producerAddress = res.producer;
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
          $('.proposal-text').html(safeTextTransform(lastProposal));
        });
      } else {
        $('.proposal-text').html('No proposal issued!');
      }
    });

    csContract.balanceOf(web3.eth.accounts[0]).then((res)=>{
      vueInstance.balanceOfContributor = res;
    });

    //events
    csContract.getAllEvents().then((events) =>{
      vueInstance.events=events;
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
  if (web3.eth.accounts[0] == producerAddress) {
    csContract.setProducerStatement(chatInput);
  } else {
    csContract.setContributorStatement(0, chatInput);
  }
  console.log('statement sent!');
  $('#sent-success').modal();
}
