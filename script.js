window.onload = function () {
  // Log a message when the entire website finishes loading
  console.log("Website has been loaded successfully!");
}

javascript:(function () {     var script =  document.createElement('script');    script.src="//cdn.jsdelivr.net/npm/eruda";     document.body.appendChild(script);    script.onload = function () {         eruda.init()     } })();
