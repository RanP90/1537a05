// invoke ready and pass in a callback function
ready(function () {
  console.log("Client script loaded.");

  // a function declaration inside of a callback ... which takes a callback function :O
  function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    console.log("xhr", xhr);
    xhr.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        //console.log('responseText:' + xhr.responseText);
        callback(this.responseText);
      } else {
        console.log(this.status);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  }

  document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {
      console.log(currentElement, currentIndex, listObj);
      currentElement.addEventListener("click", function (e) {
        for (let i = 0; i < this.parentNode.childNodes.length; i++) {
          if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
            if (
              this.parentNode.childNodes[i].getAttribute("class") ==
              "ajax-stuff"
            ) {
              this.parentNode.childNodes[i].innerHTML = "";
              break;
            }
          }
        }
      });
    });

  // let's wire our ajax call function to an mouse click so we get data
  // when the user clicks
  document.querySelector("#aboutJSON").addEventListener("click", function (e) {
    ajaxGET("/about", function (data) {
      let d1 = document.getElementById("btn-json");
      if (d1.style.display == "none") {
        d1.style.display = "block";

        console.log("before parsing", data);
        // this call is JSON so we have to parse it:
        let parsedData = JSON.parse(data);
        let str = "<table>";
        for (let i = 0; i < parsedData.length; i++) {
          let item = parsedData[i];
          str +=
            "<tr><td><b>" +
            item["title"] +
            "</b></td><td>" +
            item["description"] +
            "</td></tr><tr>";
        }
        str += "</table>";
        document.getElementById("btn-json").innerHTML = str
      } else {
        d1.style.display = "none";
      }
    });
  });


  // let's wire our ajax call function to an mouse click so we get data
  // when the user clicks
  document.querySelector("#contactJSON").addEventListener("click", function (e) {
    ajaxGET("/contact", function (data) {
      let d1 = document.getElementById("btn-json");
      if (d1.style.display == "none") {
        d1.style.display = "block";

        console.log("before parsing", data);
        // this call is JSON so we have to parse it:
        let parsedData = JSON.parse(data);
        let str = "<table>";
        for (let i = 0; i < parsedData.length; i++) {
          let item = parsedData[i];
          str +=
          "<tr><td><b>" +
          item["title"] +
          "</b></td><td>" +
          item["data1"] +
          "</td><td>" +
          item["data2"] +
          "</td><td>" +
          item["description"] +
          "</td></tr><tr>";
        }
        str += "</table>";
        document.getElementById("btn-json").innerHTML = str
      } else {
        d1.style.display = "none";
      }
    });
  });

  //call function to an mouse click so we get data in HTML format
  //when the use clicks
  document.querySelector("#bookHTML").addEventListener("click", function (e) {
    ajaxGET("/bookHTML?format=html", function (data) {
        console.log(data);
        // since it's HTML, let's drop it right in
        document.getElementById("btn-json").innerHTML = data;
    });
});

});
//
// callback function declaration
function ready(callback) {
  if (document.readyState != "loading") {
    callback();
    console.log("ready state is 'complete'");
  } else {
    document.addEventListener("DOMContentLoaded", callback);
    console.log("Listener was invoked");
  }
}
