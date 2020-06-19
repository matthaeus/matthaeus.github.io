var versionNumber = '0.224'
var H, S, L, wH, wW;
var count = 0;
var archiveCount = 0;
var bmFolderId;
var archiveId;
var bmTrxee;
var oxFolderId;
var oxFolder;
var oxBookmarks;
var dbm = 1;
var evTr = 0;
var shareBannerVisible = 0;
var syncStorage;
var UID;
var tUID;
var daysSinceFirstRun, dsfrLabel;
var dateInNumbers = getDateInNumbers(Date.now());






$(function () {
  

  
  // chrome.storage.onChanged.addListener(function(changes, namespace) {
  //   for (key in changes) {
  //     var storageChange = changes[key];
  //     console.log('Storage key "%s" in namespace "%s" changed. ' +
  //                 'Old value was "%s", new value is "%s".',
  //                 key,
  //                 namespace,
  //                 storageChange.oldValue,
  //                 storageChange.newValue);
  //   }
  // });
  
  
  // chrome.storage.sync.set({'shareBannerHidden': 1}, function() {});
  // chrome.storage.sync.set({'shareBannerHidden': 0}, function() {});
  
  
  init();
  
  
});





function init() {
  
  // $(window).bind('resize', function() {
  //  wW = window.innerWidth;
  //  wH = window.innerHeight;
  //   // console.log('window', wW, 'x', wH);
  //  resizeTiles();
  // });
  // $(window).resize();
  
  chrome.storage.sync.get(null, function(data) {
    syncStorage = data;
    // console.log('syncStorage is ', syncStorage);
    // checkForFirstRun();
    checkForUID();
  });
  
  
  $('#versionNumber').text(versionNumber);
  
  

  getBookmarkTree();
  
  if (dbm == 1) {
    initDebugMode();
  } else {
    console.log = function() {};
  }
  
}






function getBookmarkTree(folderName) {
  
  chrome.bookmarks.getTree(function(chromeBookmarkTree) {
    bmTree = chromeBookmarkTree;
    console.log('the entire bookmark tree is', bmTree);
    
    if (getOxFolder('OX') == true) {
      console.log('ox folder content is', oxFolder);
      
      if (getOxBookmarks() == true) {
        console.log('ox bookmarks list is', oxBookmarks);
        sortOxBookmarks();
        console.log('after sorting oxBookmarks is ', oxBookmarks);
        printBookmarkList();
      } else {
        $('.headerCont').html('<span>0</span> Bookmarks to catch up on');
        $('#noneMsg').show();
      }
      
      newColors();
      
    } else {
      setUpNewUser();
    }
  });

  return false;
}



function getOxFolder(folderName) {
  var bookmarksBar =  bmTree[0].children[0].children;
  var i, folder;
  
  for (i in bookmarksBar) {
    folder = bookmarksBar[i];
    if (folder.title == folderName) {
      oxFolderId = folder.id;
      oxFolder = folder;
      return true;
    }
  }
  return false;
}




function getOxBookmarks() {
  
  if (oxFolder.children.length == 0) {
    console.log('there are no items in the ox folder');
    return false;
  }
  
  var item;
  
  oxBookmarks = oxFolder.children;
  
  for (i in oxBookmarks) {
    item = oxBookmarks[i];
    if (item.children) { //if there are children then it's a folder. usually archive
      continue;
    }
    count++;
  }
  
  pushGaEvent(['_trackEvent', 'Home', 'In list on load', count.toString(), parseInt(count), true]);
  pushGaEvent(['_trackEvent', tUID, 'Home - In list on load', dsfrLabel + count.toString(), parseInt(count), true]); 
  console.log('bookmarks in OX folder (excluding folders)', count);
  
  checkArchive();
  
  return true;
}





function checkArchive() {
  
  var i, item, archiveIndices = [];
  
  for (i in oxBookmarks) {
    item = oxBookmarks[i];
    if (item.children) { //if there are children then it's a folder. usually archive
      if (item.title = 'Archive') {
        archiveExists = true;
        archiveIndices.push(i);
      } 
    }
  }
  
  // if (archiveExists != true) {
  //   return false;
  // }

  var archivedBookmarksTotal = 0;
  
  for (i in archiveIndices) {
    archivedBookmarksTotal += oxBookmarks[archiveIndices[i]].children.length;
  }
  
  archiveCount = archivedBookmarksTotal;
  
  if (archivedBookmarksTotal >= 10) {
    showShareBanner('>10 Archive');
  }
  
  pushGaEvent(['_trackEvent', 'Archive', 'In folder on load', archiveCount.toString(), parseInt(archiveCount), true]);
  pushGaEvent(['_trackEvent', tUID, 'Archive - In folder on load', dsfrLabel + archiveCount.toString(), parseInt(archiveCount), true]); 
  console.log('found', archiveCount, 'bookmark(s) in', archiveIndices.length, 'archive folder(s)');
  
  pushGaEvent(['_trackEvent', 'General', 'Bookmark:Archive', count.toString()+':'+archiveCount.toString(), null, true]);
  pushGaEvent(['_trackEvent', tUID, 'Bookmark:Archive', dsfrLabel + count.toString()+':'+archiveCount.toString(), null, true]);
  console.log('bookmarks:archive = ', count, ':', archiveCount);
  
  // return true;
  
}









function sortOxBookmarks() {
  
  oxBookmarks.sort(function(a, b){
    return(b.dateAdded - a.dateAdded); //result should end up mirrored in folder itself: change bookmark indices according to date sort.
  });
  
  return false;
  
  // oxBookmarks.sort(function(a, b){
  //   return(b.index - a.index);
  // });
  // return false;
  
  // if (typeof syncStorage.bookmarksSortedBy === 'undefined') {
  //   oxBookmarks.sort(function(a, b){
  //     return(b.dateAdded - a.dateAdded); 
  //   });
  // } else if (syncStorage.bookmarksSortedBy == 'index') {
  //   sort(function(a, b){
  //     return(b.dateAdded - a.dateAdded);
  //   });
  // }
  // 
  // setOrderInBookmarksFolder();
}






function printBookmarkList() {
  var i, posInList = 0;
  
  for (i in oxBookmarks) {
    if (oxBookmarks[i].children) {
      continue;
    }
    oxBookmarks[i].posInList = posInList;
    printBookmark(i);
    posInList++;
  }
  
  updateHeader();
}





function printBookmark(arrayIndex) {
  var bookmark = oxBookmarks[arrayIndex];
  
  output = '<li id="'+arrayIndex+'">';
  // output += '<div class="counterBox" id="counterBox'+i+'">';
  // output +=   '<p class="counter">'+getBookmarkCreationDate(bookmark.dateAdded, 'list')+'</p>';
  // output += '</div>';
  output += '<div class="stageTable"><div class="stageCell"><div class="message">Bookmark moved to OX/Archive folder</div></div></div>';
  output += '<div class="contentBox">';
  output +=   '<div class="content">';
  output +=     '<div class="firstLine">';
  output +=       '<a href="'+bookmark.url+'" class="bmTitle" id="a'+arrayIndex+'">' + bookmark.title+ '</a>';
  output +=       '<div class="controls">';
  output +=         '<div class="readArchive" title="View and Remove" id="o'+arrayIndex+'"><div></div><span class="label">&#x25cf</span></div>';
  output +=         '<div class="archive" title="Remove" id="x'+arrayIndex+'"><div></div><span class="label">&#x2716</span></div>';
  output +=       '</div>';
  output +=     '</div>';
  output +=     '<div class="secondLine">';
  output +=       '<div class="bmUrl">' + formatUrl(bookmark.url) + '</div><span class="creationDate">'+getBookmarkCreationDate(bookmark.dateAdded, 'list')+'</span>';
  output +=     '</div>';
  output +=   '</div>';

  output += '</div>';
  output += '</li>';
  $(output).appendTo('#bookmarks');
  
  
  $('#a' + arrayIndex).bind('click', function() {
    doWithBookmark('open', parseInt($(this).attr('id').replace(/\D/g,'')));    
  });
  
  $('#o' + arrayIndex).bind('click', function() {
    doWithBookmark('openAndArchive', parseInt($(this).attr('id').replace(/\D/g,'')));    
  });
  
  $('#x' + arrayIndex).bind('click', function() {
    doWithBookmark('archive', parseInt($(this).attr('id').replace(/\D/g,'')));    
  });
  
}






function doWithBookmark(action, arrayIndex) {
  console.log('do with bookmark', arrayIndex);
  var bookmark = oxBookmarks[arrayIndex];
  var bookmarkAge = getBookmarkAge(bookmark.dateAdded);
  var bookmarkUrl = formatUrl(bookmark.url);
  
  if (action == 'open') {
    
    pushGaEvent(['_trackEvent', 'Bookmark', 'Opened from position', bookmark.posInList.toString(), parseInt(bookmark.posInList)]);
    pushGaEvent(['_trackEvent', 'Bookmark', 'Opened after days', bookmarkAge.toString(), parseInt(bookmarkAge)]);
    pushGaEvent(['_trackEvent', 'Bookmark', 'Opened with domain', bookmarkUrl.toString()]);
    
    pushGaEvent(['_trackEvent', tUID, 'Bookmark - Opened form position', dsfrLabel + bookmark.posInList.toString(), parseInt(bookmark.posInList)]);
    pushGaEvent(['_trackEvent', tUID, 'Bookmark - Opened after days', dsfrLabel + bookmarkAge.toString(), parseInt(bookmarkAge)]);
    pushGaEvent(['_trackEvent', tUID, 'Bookmark - Opened with domain', dsfrLabel + bookmarkUrl.toString()]);
  
  } else if (action == 'openAndArchive') {
    
    openNewTabWithBookmark(arrayIndex);
    // archiveBookmark($(this).data('id'), 'Bookmark opened and moved to Archive folder', '#2C61BF');
    moveBookmarkToArchive(arrayIndex);
    removeBookmarkFromList(arrayIndex, action);
    pushGaEvent(['_trackEvent', 'Bookmark', 'Opened and archived from position', bookmark.posInList.toString(), parseInt(bookmark.posInList)]);
    pushGaEvent(['_trackEvent', 'Bookmark', 'Opened and archived after days', bookmarkAge.toString(), parseInt(bookmarkAge)]);
    
    pushGaEvent(['_trackEvent', tUID, 'Bookmark - Openeded and archived from position', dsfrLabel + bookmark.posInList.toString(), parseInt(bookmark.posInList)]);
    pushGaEvent(['_trackEvent', tUID, 'Bookmark - Openeded and archived after days', dsfrLabel + bookmarkAge.toString(), parseInt(bookmarkAge)]);
    
    
  } else if (action == 'archive') {  
    // archiveBookmark($(this).data('id'), 'Bookmark moved to Archive folder', '#EE564E');
    moveBookmarkToArchive(arrayIndex);
    removeBookmarkFromList(arrayIndex, action);
    pushGaEvent(['_trackEvent', 'Bookmark', 'Archived from position', bookmark.posInList.toString(), parseInt(bookmark.posInList)]);
    pushGaEvent(['_trackEvent', 'Bookmark', 'Archived after days', bookmarkAge.toString(), parseInt(bookmarkAge)]);
    
    pushGaEvent(['_trackEvent', tUID, 'Bookmark - Archived from position', dsfrLabel + bookmark.posInList.toString(), parseInt(bookmark.posInList)]);
    pushGaEvent(['_trackEvent', tUID, 'Bookmark - Archived after days', dsfrLabel + bookmarkAge.toString(), parseInt(bookmarkAge)]); 
  }
  
}



function removeBookmarkFromList(arrayIndex, action) {
  // $('#' + arrayIndex + ' > .stageTable').css('background', 'rgba(44,79,191,0.95)');
  if (action == 'openAndArchive') {
      $('#' + arrayIndex + ' .message').html('Bookmark opened and moved to OX/Archive folder');
      // $('#' + arrayIndex + ' .stageTable').css('background-color', 'blue');
  } else if (action == 'archive') {
    $('#' + arrayIndex + ' .message').html('Bookmark moved to OX/Archive folder');
    // $('#' + arrayIndex + ' .stageTable').css('background-color', 'red');
  }

  $('#' + arrayIndex + ' .contentBox').addClass('archived');
  oxBookmarks[arrayIndex] = 'archived';
  // count--;
  console.log('after removing at arrayIndex', arrayIndex, 'oxBookmarks Array is', oxBookmarks);
  updateHeader();
}




function openNewTabWithBookmark(arrayIndex) {
  var bookmark = oxBookmarks[arrayIndex];
  window.open(bookmark.url);
}





function moveBookmarkToArchive(arrayIndex) {
  var bookmark = oxBookmarks[arrayIndex];
  
  chrome.bookmarks.getSubTree(oxFolderId, function(tmpOxFolder) {
    
    var i, archiveIndices = [], archiveFolders = [], item;

    var tmpOxBookmarks = tmpOxFolder[0].children;

    // console.log(bookmarkFolder);

    for (i in tmpOxBookmarks) {
      item = tmpOxBookmarks[i];
      if (item.children) {
        if (item.title == "Archive") {
          archiveIndices.push(i);
        }
      }
    }
    
    if (archiveIndices.length == 1) {
      
      archiveExists = true;
      archiveId = tmpOxBookmarks[archiveIndices[0]].id;
      chrome.bookmarks.move(bookmark.id, {parentId: archiveId});
    
    } else if (archiveIndices.length > 1) {
      
      var archivedBookmarksTotal = 0, tmpObj = {}, folder;
      
      for (i in archiveIndices) {
        folder = tmpOxBookmarks[archiveIndices[i]];
        tmpObj = {};
        tmpObj.folderIndexInArray = archiveIndices[i];
        tmpObj.childrenCount = folder.children.length;
        archivedBookmarksTotal += tmpObj.childrenCount;
        tmpObj.folderId = folder.id;
        archiveFolders.push(tmpObj);
      }
    
      archiveFolders.sort(function(a,b){
        return(a.childrenCount - b.childrenCount);
      });
    
      for (i in archiveFolders) {
        
        if (archiveFolders[parseInt(i)+1]) {
          moveFolderIntoFolder(archiveFolders[i].folderId, archiveFolders[parseInt(i)+1].folderId);
        } else {
          archiveExists = true;
          archiveId = archiveFolders[i].folderId;
          break;
        }
      }
      chrome.bookmarks.move(bookmark.id, {parentId: archiveId});
    
    } else if (archiveIndices.length == 0) {
      
      chrome.bookmarks.create({parentId: oxFolderId, title: 'Archive'}, function(archiveNode){
        archiveId = archiveNode.id;
        archiveExists = true;
        // console.log('archive created with Id ', archiveId);
        chrome.bookmarks.move(bookmark.id, {parentId: archiveId});
        
        pushGaEvent(['_trackEvent', 'Archive', 'Folder Created (existing bookmarks)', count.toString(), parseInt(count), true]);
        pushGaEvent(['_trackEvent', tUID, 'Archive - Folder Created (existing bookmarks)', dsfrLabel + count.toString(), parseInt(count), true]);
        
        });
      
    }
    
  });
  
}



// this is a messy implementation of moving a redundant archive folder into another one
// ideally, this sould merge the two contents, not move one whole folder into the oter.
// this might actually be necessary becuase move operations are so severely limited, 
// that moving one archive into to other bookmark by bookmark would break the limit.
function moveFolderIntoFolder(folderId, inFolderId) {
  chrome.bookmarks.move(folderId, {parentId: inFolderId});
}





















function showShareBanner(reason) {
  chrome.storage.sync.get(['shareBannerHidden', 'shareBannerHiddenTime'], function(data) {
    // console.log('storage sync get returned', data);
    if (data.shareBannerHidden != 1) { 
      
      shareBannerVisible++;
      
      pushGaEvent(['_trackEvent', 'Sharebanner', 'Show', count.toString()+':'+archiveCount.toString() + ' - '+ reason, null, true]);
      pushGaEvent(['_trackEvent', tUID, 'Sharebanner - Show', dsfrLabel + count.toString()+':'+archiveCount.toString() + ' - '+ reason, null, true]);
      
      if (shareBannerVisible > 1) {
        console.log('share banner not showing because already showing');
        return false;
      }
      
      console.log('showing Share Banner');
      
      var output = '';
      
      output+='<div id="shareBannerWrapper">';
        output+='<div id="shareTextWrapper">';
          output+='<h1>Do you like using OX Bookmarks?</h1>';
          output+='<h2>Spread the word and tell your friends!</h2>';
        output+='</div>';
        output+='<div id="shareButtonsWrapper">';
          output+='<div class="fbShare shareButton">';
            output+='<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fox-bookmarks-youll-be-hap%2Fafaahdbjknpmcapecaaclhdmjnlcmbmh&amp;send=false&amp;layout=button_count&amp;width=200&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=210&amp;appId=183106291858519" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:21px;" allowTransparency="true"></iframe>';
          output+='</div>';
          output+='<div class="twitterShare shareButton">';
            output+='<a href="https://twitter.com/share" class="twitter-share-button" data-url="https://chrome.google.com/webstore/detail/ox-bookmarks-youll-be-hap/afaahdbjknpmcapecaaclhdmjnlcmbmh" data-text="Check out OX Bookmarks for Chrome! It\'s beautiful, simple and fast:">Tweet</a>';
          output+='</div>';
        output+='</div>';
        output+='<div id="shareCloseWrapper">';
          output+='<a href="#" id="shareBannerHider">Hide</a>';
        output+='</div>';
      output+='</div>';
      
      $(output).appendTo('#shareBanner');
      
      !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
      
      
      $('#shareBannerHider').bind('click', function() {
        hideShareBanner();
      });
      
      $('#shareBanner').css('display', 'inline-block');
    } 
    
      else {
        console.log('share banner not showing because previously hidden', reason);
        pushGaEvent(['_trackEvent', 'Sharebanner', 'Not shown - previously hidden', reason, null, true]);
        pushGaEvent(['_trackEvent', tUID, 'Sharebanner - Not shown - previously hidden', dsfrLabel + reason, null, true]);
        
    //   if (data.shareBannerHiddenTime - Date.now() > 1000*3600*24*21) {
    //     $('#shareBanner').css('display', 'inline-block');
    //   }
    }
  });
}



function hideShareBanner() {
  
  $('#shareBanner').slideUp();
  
  
  chrome.storage.sync.set({'shareBannerHiddenTime': Date.now()}, function() {
    // console.log('shareBannerHidden was stored with', Date.now());
  });
  
  chrome.storage.sync.set({'shareBannerHidden': 1}, function() {
    // console.log('shareBannerHidden was stored with', 1);
  });
  
  
  pushGaEvent(['_trackEvent', 'Sharebanner', 'Hide', count.toString()+':'+archiveCount.toString(), null, true]);
  pushGaEvent(['_trackEvent', tUID, 'Sharebanner - Hide', dsfrLabel + count.toString()+':'+archiveCount.toString(), null, true]);
  
  // Save the timestamp of when user hides share banner
  // chrome.storage.sync.set({'shareBannerHiddenTime': timeStamp}, function() {
  //   console.log('shareBannerHiddenTime was stored with', timeStamp);
  // });
}












function updateHeader() {
  var i, realBookmarks = 0;
  for (i in oxBookmarks) {
    if (oxBookmarks[i].children || oxBookmarks[i] == 'archived') {
      continue;
    }
    realBookmarks++;
  }
  
  var strMod = (realBookmarks != 1) ? 's' : '';
  $('.headerCont').html('<span>' +(parseInt(realBookmarks)) + '</span> Bookmark' + strMod + ' to catch up on');
  if (realBookmarks == 0) {
    showZeroMessage();
  }
}










function showZeroMessage() {
  $('#noneMsg').show();
}
















function setOrderInBookmarksFolder() {
  var i, total = oxBookmarks.length, item;
  for (i in oxBookmarks) {
    item = oxBookmarks[i];
    // chrome.bookmarks.move(item.id, {parentId: oxFolderId, index: total-i-1});
  }
}






function checkForUID() {
  if (typeof syncStorage.UID === 'undefined') {
    UID = randomUserId(6);
    syncStorage.UID = UID;
    
    chrome.storage.sync.set({'UID': UID}, function(data) {
      console.log('INDIVIDUAL STATS UID is', UID);
      checkForFirstRun();
    });
    
  } else {
    UID = syncStorage.UID;
    console.log('INDIVIDUAL STATS UID is', UID);
    checkForFirstRun();
  }
}





function checkForFirstRun() {
  console.log('syncStorage in checkForFirstRUn', syncStorage);
  pushGaEvent(['_trackEvent', 'General', 'Tab Loaded', versionNumber, null, true]);
  pushGaEvent(['_trackEvent', 'Meta - Seen on Day', dateInNumbers.toString(), UID, null, true]);
  pushGaEvent(['_trackEvent', 'Meta', 'Seen', UID, null, true]);
  
  if (typeof syncStorage.firstRun === 'undefined') {
    console.log('extension never run before');
    var firstRunTimestamp = Date.now();
    syncStorage.firstRun = firstRunTimestamp;
    var firstRunInWords = getDateInWords(firstRunTimestamp);
    console.log('INDIVIDUAL STATS first run in words is', firstRunInWords);
    
    chrome.storage.sync.set({'firstRun': firstRunTimestamp}, function(data) {
      console.log('firstRun set to approx.', Date.now());
      pushGaEvent(['_trackEvent', 'General', 'First load', '0', null, true]);
      individualStats();
    });
    
  } else {
    console.log('INDIVIDUAL STATS first run in words is', getDateInWords(syncStorage.firstRun));
    console.log('days since first run:', (Date.now() - syncStorage.firstRun) / 1000 / 3600 / 24);
    if ((Date.now() - syncStorage.firstRun) / 1000 / 3600 / 24 > 10) {
      showShareBanner('>10 Days');
    }
    individualStats();
  }
  
}

















function setUpNewUser() {
    // console.log('bmTree', bmTree);
    $('#welcome').show();
    // $('#header').hide();
    $('#tutorialHide').bind('click', function() {
      // console.log('sdfasdfdsfsdf');
      $('#welcome').slideUp();
    });
  
    var bookmarkTree = bmTree;
  
    var mainFolders = bookmarkTree[0].children;
    var i;
  
    var indexOfBB = 0;
    chrome.bookmarks.create({parentId: mainFolders[0].id, title: 'OX'}, function(newNode){
        
          bmFolderId = newNode.id;
        

          var tutorialBookmarks = [{parentId: bmFolderId, title:'Try archiving these example bookmarks. Then start adding your own!', url: 'http://matthaeuskrenn.com', index: 0}, 
                                    {parentId: bmFolderId, title:'Open a bookmark and archive it at the same time by clicking the &#x25cf', url: 'http://maximiliankiener.com/', index: 1}, 
                                    {parentId: bmFolderId, title:'Easily archive any bookmark by clicking the &#x2716 on the right', url: 'http://matthaeuskrenn.com', index: 2}, 
                                    {parentId: bmFolderId, title:'This is an example bookmark', url: 'http://matthaeuskrenn.com', index: 3}
                                  ];

          var o;
        
          for (o in tutorialBookmarks) {
            chrome.bookmarks.create(tutorialBookmarks[o]);
          }
        
          getBookmarkTree();
      
        
    });
}


















function getBookmarkAge(dateAdded) {
  var bmDate = new Date(dateAdded);
  days = (Date.now() - bmDate.getTime()) / 1000 / 3600 / 24;
  days = Math.round(days*10)/10;
  return days;
}



function getBookmarkCreationDate(dateAdded, style) {
  var bmDate = new Date(dateAdded);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  if (style == 'list') {
    return '&nbsp;&nbsp;-&nbsp;&nbsp;' + months[bmDate.getMonth()] + ' ' + bmDate.getDate() +' '+ bmDate.getFullYear();
  } else if (style == 'tiles') {
    return months[bmDate.getMonth()] + ' ' + bmDate.getDate() +' '+ bmDate.getFullYear();
  }
}





function formatUrl(url) {
  var cut = url.indexOf("//");
  if (cut != -1) {
    url = url.splice( 0, cut+2,'');
  
    var cut = url.indexOf('www.');
    if (cut != -1) {
      url = url.splice( 0, 4,'');
    }
  
  }
  url = url.split('/');
  return url[0];
}
















