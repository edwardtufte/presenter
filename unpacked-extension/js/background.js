chrome.browserAction.setBadgeBackgroundColor({'color': '#000'});

chrome.contextMenus.create({
  type: 'normal',
  title: 'Add to ImageQuilt',
  contexts: ['image'],
  onclick: handleContextClick
});

function handleContextClick(info) {
  showQuilt([info.srcUrl]);
}

var active = false;
var imageUrls = null;
function fetchImageUrls(cb) {
  handlers.push(cb);

  if (active)
    return;

  active = true;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
      chrome.tabs.executeScript(activeTabs[0].id, {file: 'js/findImages.js', allFrames: true});
    });
  });
}

handlers = [];
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.urls) {
    for (var i = handlers.length; i--;)
      handlers[i](request.urls);

    handlers = [];
    active = false;
    if (request.urls.length)
      imageUrls = request.urls;
  }
});

chrome.browserAction.onClicked.addListener(function() {
  imageUrls = null;
  fetchImageUrls(showQuilt);
});

function showQuilt(urls) {
  var cb = function(tab) {
    if (tab) {
      chrome.tabs.sendRequest(ourTab, {urls: urls});
      chrome.tabs.update(ourTab, {selected: true});
    } else {
      chrome.tabs.create({
        'url': chrome.extension.getURL('html/index.html')
      }, function(tab) {
        ourTab = tab.id;
        chrome.tabs.sendRequest(tab.id, {urls: urls});
      });
    }
  };

  if (ourTab)
    chrome.tabs.get(ourTab, cb);
  else
    cb();
}

var ourTab = null;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!request.urls || !request.urls.length) return;

});

chrome.tabs.onRemoved.addListener(function(tabId) {
  if (ourTab === tabId) {
    chrome.browserAction.setBadgeText({'text': ''});
    ourTab = null;
  }
});

chrome.tabs.onActivated.addListener(function(info) {
  // TODO: Check windowId
  active = false;
  handlers = [];
  imageUrls = null;

  if (ourTab === info.tabId)
    chrome.browserAction.setBadgeText({'text': ''});
  else if (ourTab != null)
    updateBadgeCount();
});

function updateBadgeCount() {
  fetchImageUrls(function(urls) {
    var count = Math.min(urls.length, 999);
    chrome.browserAction.setBadgeText({'text': '+' + count});
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'screenshot') {
    chrome.tabs.captureVisibleTab(function(dataUrl) {
      imageToDownload(dataUrl);
    });
  }
});

function humanDate() {
  var now, hours, minutes, seconds, day, month, year, orderinal;

  now = new Date();
  hours = now.getHours();
  minutes = now.getMinutes();
  seconds = now.getSeconds();
  day = now.getDate();
  month = now.getMonth() + 1;
  year = now.getFullYear();

  orderinal = 'A';

  if (hours >= 12) {
      hours -= 12;
      orderinal = 'P';
  }
  if (hours === 0) hours = 12;
  if (minutes <= 9) minutes = '0' + minutes;
  if (seconds <= 9) seconds = '0' + seconds;
  if (day <= 9) day = '0' + day;
  if (month <= 9) month = '0' + month;

  return year + '-' + day + '-' + month + ' at ' + hours + '.' + minutes + '.' + seconds + ' ' + orderinal + 'M';
}

function imageToDownload(src) {
  var image_data = atob(src.split(',')[1]);

  var arraybuffer = new ArrayBuffer(image_data.length);
  var view = new Uint8Array(arraybuffer);
  for (var i=0; i<image_data.length; i++) {
    view[i] = image_data.charCodeAt(i) & 0xff;
  }
  try {
    var blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
  } catch (e) {
    var bb = new window.WebKitBlobBuilder;
    bb.append(arraybuffer);
    var blob = bb.getBlob('application/octet-stream');
  }

  var url = (window.webkitURL || window.URL).createObjectURL(blob);

  chrome.downloads.download({
    url: url,
    filename: 'ImageQuilt ' + (humanDate()) + '.png'
  });
}

chrome.runtime.onInstalled.addListener(function(details){
  if ((details.reason === 'update' || details.reason === 'chrome_update') && parseFloat(details.previousVersion) < 3) {
    chrome.tabs.create({
      'url': chrome.extension.getURL('html/index.html')
    });
  }
});