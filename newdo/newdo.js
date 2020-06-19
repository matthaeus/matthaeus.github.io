var list;
var listPosition = 0;


$(function () {

  $('#submitButton').click(function() {
    addItem($('#newItemText').val());
  });
  
  init();
  
});





function init() {

  console.log("init");


  chrome.storage.sync.get({newDoList: []}, function(data) {
    list = data.newDoList;

    console.log(data)

    populateList();
  });


  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for(key in changes) {
      if(key === 'newDoList') {
        // console.log('change in storage', changes.newDoList);
        list = changes.newDoList.newValue;
        clearList();
        populateList();
      }
    }
  });




  
}


function clearList() {
  $('ul').empty();
}


function populateList() {

  listPosition = 0;

  var limit = list.length-1;

  for (var i = 0; i<=limit; i++) {
    var item = list[i];
    appendListItem(item);
  }

  $('#addUI').css('display', 'table');
}



function appendListItem(item) {
  if (item.status == 'idle') {
    $('#newDoList').append('<li><p class="itemText">' + item.content + '</p><div class="checkContainer"><input id="checkBox'+listPosition+'" type="checkbox" class="doneCheck" data-listpos="'+ listPosition +'"></div></li>');
  } else if (item.status == 'checked') {
    $('#newDoList').append('<li><p class="itemText checked">' + item.content + '</p><div class="checkContainer"><input id="checkBox'+listPosition+'" type="checkbox" class="doneCheck" data-listpos="'+ listPosition +'" checked></div></li>');
  }

  $('#checkBox'+listPosition).click(function() {
    toggleItem($(this).data('listpos'));
  });

  listPosition++;
}




function toggleItem(listPos) {
  var item = list[listPos];
  if (item.status == 'idle') {
    $('ul li:nth-child('+(listPos+1)+') p.itemText').addClass('checked');
    item.status = 'checked';
    list[listPos] = item;
  } else if (item.status == 'checked') {
    $('ul li:nth-child('+(listPos+1)+') p.itemText').removeClass('checked');
    item.status = 'idle';
    list[listPos] = item;
  }
  chrome.storage.sync.set({newDoList: list}, function () {
    console.log('check toggle saved');
  });
}




function addItem(text) {
  // list = [];
  if (text == '') return;
  var item = {date: Date.now(), content: text, status: "idle", lastListPosition: listPosition};
  list.push(item);

  chrome.storage.sync.set({newDoList: list}, function () {
    console.log('saved');
    // appendListItem(item);
    // $('#newDoList').append('<li><p class="itemText">' + text + '</p><input type="checkbox" class="doneCheck"></li>');
    document.getElementById('newItemText').value='';
    $('#newItemText').focus();
  });
}



function deleteAllEntries() {
  chrome.storage.sync.set({newDoList: []}, function () {
    console.log('all deleted');
    $('#newDoList').empty();
  });
}






// chrome.storage.sync.set({key: value}, function() {
//   console.log('Value is set to ' + value);
// });


// chrome.storage.sync.get(['key'], function(result) {
//   console.log('Value currently is ' + result.key);
// });