var list;
var listPosition = 0;


$(function () {

  // $('#submitButton').click(function() {
  //   addItem($('#newItemText').val());
  // });

  $('#newItemText').keydown(function(e) { 
    var val = $(this).val();
    $(this).val(val.substr(0, 1).toUpperCase() + val.substr(1));
  });

  $('#newItemText').keyup(function(e) {
    if(e.keyCode == 13) { 
      addItem($('#newItemText').val()); 
    } 
  }); 

  $('#removeUI p').click(function() {
    purgeAllChecked();
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
  $('#newItemText').focus();
}






function appendListItem(item) {
  if (item.status == 'idle') {
    if (validURL(item.content)) {

      /*
      var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

      var htmlString = '';
      var atBeginning = true;
      var match = urlPattern.exec(item.content);
      console.log(item.content, match.index, urlPattern.lastIndex);

      while (match = urlPattern.exec(item.content)) {
        console.log('exec regex');
        // console.log(match.index + ' ' + urlPattern.lastIndex);
        var url = item.content.substr(match.index, urlPattern.lastIndex).toLowerCase();
        if (atBeginning && match.index > 0) {
          htmlString += item.content.substr(0, match.index);
        }
        htmlString += '<a href="'+ url +'">'+ url +'</a>';
        atBeginning = false;
      }
      if (urlPattern.lastIndex != item.content.length-1) {
        htmlString += item.content.substring(urlPattern.lastIndex);
      }
      */

      var url = item.content.toLowerCase();
      var htmlString = '<a href="'+ url +'">'+ url +'</a>'
      
      $('#newDoList').append('<li id="item'+listPosition+'"><p class="itemText">' + htmlString + '</p><div class="checkContainer"><input id="checkBox'+listPosition+'" type="checkbox" class="doneCheck" data-listpos="'+ listPosition +'"></div></li>');
    } else {
      $('#newDoList').append('<li id="item'+listPosition+'"><p class="itemText">' + item.content + '</p><div class="checkContainer"><input id="checkBox'+listPosition+'" type="checkbox" class="doneCheck" data-listpos="'+ listPosition +'"></div></li>');
    }
    
  } else if (item.status == 'checked') {
    $('#checkedList').prepend('<li id="item'+listPosition+'" class="checked"><p class="itemText checked">' + item.content + '</p><div class="checkContainer"><input id="checkBox'+listPosition+'" type="checkbox" class="doneCheck" data-listpos="'+ listPosition +'" checked></div></li>');
    $('#removeUI').css('display', 'table');
  }

  $('#checkBox'+listPosition).click(function() {
    toggleItem($(this).data('listpos'));
  });

  listPosition++;
}




function toggleItem(listPos) {
  var item = list[listPos];
  if (item.status == 'idle') {
    $('#item'+(listPos+1)).addClass('checked');
    item.status = 'checked';
    list[listPos] = item;
  } else if (item.status == 'checked') {
    $('#item'+(listPos+1)).removeClass('checked');
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



function purgeAllChecked() {
  $('#checkedList').empty();

  var limit = list.length-1;

  for (var i = limit; i>=0; i--) {
    var item = list[i];
    if (item.status == 'checked') {
      list.splice(i, 1);
    }
  }

  
  $('#removeUI').css('display', 'none');

  chrome.storage.sync.set({newDoList: list}, function () {
    console.log('checked purged');
  });


}



function deleteAllEntries() {
  chrome.storage.sync.set({newDoList: []}, function () {
    console.log('all deleted');
    $('#newDoList').empty();
  });
}



function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}