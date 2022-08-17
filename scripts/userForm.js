// add text value to the password field
function addValueToPassword(button) {
  var password = $("#passcode").val();
  if (button == "bksp") {
    $("#passcode").val(password.substring(0, password.length - 1));
  } else {
    $("#passcode").val(password.concat(button));
  }
}

// enter password to continue
function enterPassword() {
  var password = getPassword();
  if (document.getElementById("passcode").value == password) {
    if (localStorage.getItem("password") == null) {
      $("#btnEnter").attr("href", "#pageThree").button();
    } else {
      $("#btnEnter").attr("href", "#pageThree").button();
    }
  }
}

// get password from local storage
function getPassword() {
  if (typeof Storage == "undefined") {
    alert("Sorry, your browser does not support web storage...");
  } else if (localStorage.getItem("password") !== null) {
    return JSON.parse(localStorage.getItem("password")).NewPassword;
  } else {
    return "2345";
  }
}

function submitUserForm() {
  saveUserForm();
  return true;
}
// save password to local storage
function saveUserForm() {
  var password = $("#passcode").val();
  var user = {
    NewPassword: $("#editPasscode").val(),
  };
  localStorage.setItem("password", JSON.stringify(user));
}

// check for info in local storage and set form fields
function checkUserForm() {
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var year = d.getFullYear();
  var currentDate =
    year + "/" + month + "/" + (("" + date).length < 2 ? "0" : "") + date;
  if (
    $("#txtBoilerID").val() != "" &&
    $("#purchaseDate").val() != "" &&
    $("#purchaseDate").val() <= currentDate &&
    $("#slcBoilerRange option:selected").val() != "Select Boiler Range"
  ) {
    return true;
  } else {
    return false;
  }
}

// get boiler info from local storage
function getBoilerInfo() {
  if (typeof Storage == "undefined") {
    alert("Sorry, your browser does not support web storage...");
  } else if (localStorage.getItem("user") !== null) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return null;
  }
}

// save user form info to local storage
function saveBoilerInfo() {
  if (checkUserForm()) {
    var boiler = {
      //   NewPassword: $("#editPasscode").val(),
      BoilerID: $("#txtBoilerID").val(),
      PurchaseDate: $("#purchaseDate").val(),
      BoilerRange: $("#slcBoilerRange option:selected").val(),
    };
    try {
      localStorage.setItem("boiler", JSON.stringify(boiler));
      alert("Boiler form saved");
      $.mobile.changePage("#pageThree");
    } catch (e) {
      if (window.navigator.vender === "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Local Storage Quota Exceeded");
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Local Storage limit exceeds");
      }
      console.log(e);
    }
  } else {
    alert("Please fill in all fields");
  }
}

function submitTempPress() {
  saveTempPress();
  return true;
}
// save data temperature and pressure to local storage
function saveTempPress() {
  var tempPress = {
    Temperature: $("#txtTemp").val(),
    Pressure: $("#txtPressure").val(),
  };
  try {
    localStorage.setItem("tempPress", JSON.stringify(tempPress));
    alert("Temperature and Pressure saved");
    $.mobile.changePage("#pageThree");
  } catch (e) {
    if (window.navigator.vender === "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert("Local Storage Quota Exceeded");
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Local Storage limit exceeds");
    }
    console.log(e);
  }
}
function submitTempPressRec() {
  saveTempPressRec();
  return true;
}
// save data temperature and pressure to local storage
function saveTempPressRec() {
  var tempPressRec = {
    TemperatureRec: $("#txtTempRec").val(),
    PressureRec: $("#txtPressureRec").val(),
  };
  try {
    localStorage.setItem("tempPressRec", JSON.stringify(tempPressRec));
    alert("Temperature and Pressure saved");
    $.mobile.changePage("#pageThree");
  } catch (e) {
    if (window.navigator.vender === "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert("Local Storage Quota Exceeded");
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Local Storage limit exceeds");
    }
    console.log(e);
  }
  // reload page
  // location.reload();
  showBoilerInfo();
  // showTempRec();
}
// show temp recommendation after make recommendation is clicked
function showBoilerInfoRec() {
  var tempPressRec = JSON.parse(localStorage.getItem("tempPressRec"));
  if (tempPressRec != null) {
    $("#showBoilerInfoRec").empty();
    $("#txtPressureRecom").val(tempPressRec.PressureRec);
    $("#txtTemperatureRecom").val(tempPressRec.TemperatureRec);
  }
  $("#showBoilerInfoRec").append(
    "<p>Temperature Recommendation: " +
      tempPressRec.TemperatureRec +
      "</p><p>Pressure Recommendation: " +
      tempPressRec.PressureRec +
      "</p>"
  );
}

function showBoilerInfo() {
  // get showBoilerInfo id and display boiler info
  var boiler = JSON.parse(localStorage.getItem("boiler"));
  if (boiler != null) {
    $("#showBoilerInfo").empty();
    $("#txtBoilerID").val(boiler.BoilerID);
    $("#purchaseDate").val(boiler.PurchaseDate);
    $("#slcBoilerRange").val(boiler.BoilerRange);
  }
  // display info from local storage if it exists

  $("#showBoilerInfo").append(
    "<p>Boiler ID: " +
      boiler.BoilerID +
      "</p><p>Purchase Date: " +
      boiler.PurchaseDate +
      "</p><p>Boiler Range: " +
      boiler.BoilerRange +
      "</p>"
  );
}

// when pageTwo is loaded, get boiler info from local storage and display it
$(document).on("pageshow", "#pageTwo", "#recommendations", function () {
  if ($(".ui-page-active").attr("id") === "pageTwo") {
    showBoilerInfo();
  } else if ($(".ui-page-active").attr("id") === "body") {
    $("#showBoilerInfo").empty();
  } else if ($(".ui-page-active").attr("id") === "recommendations") {
    showBoilerInfoRec();
  } else if ($(".ui-page-active").attr("id") === "body") {
    $("#showBoilerInfoRec").empty();
  } else if ($(".ui-page-active").attr("id") === "graphedData") {
    drawGraph();
    resizeGraph();
  }
});

function drawGraph() {
  if (localStorage.getItem("tempPress") === null) {
    alert("No data to graph");
    $(location.attr("href", "#pageMenu"));
  } else {
    setupCanvas();
    var TSHarr = new Array();
    var Datearr = new Array();
    // getTSHHistory(TSHarr, Datearr);

    var Pressure = new Array(2);
    var Temperature = new Array(2);
    getTSHbounds(Pressure, Temperature);

    drawLines(Temperature, Pressure);
    // drawLines(TSHarr, tshUpper, tshLower, Datearr);

    labelAxes();
  }
}

function resizeGraph() {
  if ($(window).width() < 700) {
    $("#GraphCanvas").css("width", $(window).width() - 50);
    // $("#GraphCanvas").attr("height", $(window).height());
  }
}

function setupCanvas() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 500, 500);
}

function getTSHbounds(Pressure, Temperature) {
  var tempPress = JSON.parse(localStorage.getItem("tempPress"));
  if (tempPress == "StageA") {
    Temperature[0] = Temperature[1] = 0.1;
    Pressure[0] = Pressure[1] = 0.01;
  } else if (tempPress == "StageB") {
    Temperature[0] = Temperature[1] = 0.5;
    Pressure[0] = Pressure[1] = 0.1;
  } else if (tempPress == "StageC") {
    Temperature[0] = Temperature[1] = 2.0;
    Pressure[0] = Pressure[1] = 0.35;
  }
}

function drawLines(TSHarr, tshUpper, tshLower, Datearr) {
  var TSHline = new RGraph.Line("GraphCanvas", TSHarr, tshUpper, tshLower)
    .Set("labels", Datearr)
    .Set("colors", ["blue", "green", "red"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numxticks", 6)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
    .Set("gutter.left", 40)
    .Set("tickmarks", "filledcircle")
    .Set("ticksize", 5)
    .Set("chart.labels.ingraph", [, , ["TSH", "blue", "yellow", 1, 80], ,])
    .Set("chart.title", "TSH")
    .Draw();
}

function getTSHhistory(TSHarr, Datearr) {
  var tbRecords = JSON.parse(localStorage.getItem("tempPress"));

  tbRecords.sort(compareDates);

  for (var i = 0; i < tbRecords.length; i++) {
    var date = new Date(tbRecords[i].Date);

    var m = date.getMonth() + 1;
    var d = date.getDate() + 1;

    //The x-axis label
    Datearr[i] = m + "/" + d;

    //The point to plot
    TSHarr[i] = parseFloat(tbRecords[i].TSH);
  }
}

function labelAxes() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "11px Georgia";
  ctx.fillStyle = "green";
  ctx.fillText("Temperature (F)", 10, 20);
  ctx.fillText("Pressure (psi)", 10, c.height - 10);
}
