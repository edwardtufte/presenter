function load() {
  var elements = document.querySelectorAll('body *');

  var urls = [];

  for (var i = elements.length; i--;) {
    var element = elements[i];
    var url;

    if (element && element.tagName === 'IMG') {
      if (element.clientWidth < 40 || element.clientHeight < 40) {
        continue;
      }
      url = element.src;
    } else {
      var match = element.style.backgroundImage.match(/^url\((http?\:\/\/.*)\)/);
      if (match && match.length === 2) {
        url = match[1];
      }
    }

    if (url) {
      if (url.match(/pixel|blank\.gif$/)) {
        continue;
      }
      urls.unshift(url);
    }
  }

  var uniqueURLs = urls.filter(function(elem, pos) {
    return urls.indexOf(elem) == pos;
  });

  chrome.runtime.sendMessage({ urls: uniqueURLs });
}

if (document.readyState != 'complete' && !document.querySelectorAll('body *').length) {
  document.addEventListener('DOMContentLoaded', load);
} else {
  load();
}
