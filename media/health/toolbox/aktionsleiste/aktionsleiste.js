function openCRem(file, name)
{
  win = window.open (file, 'Hinweisfenster', 'resizable=yes,scrollBars=yes,height=170,width=300');
}
function openDruckansicht(file)
{
  win = window.open (file, 'Druckansicht', 'resizable=yes,scrollBars=yes,height=700,width=660');
}

function openBaby(file,name) {
win = window.open (file, 'Hinweisfenster', 'resizable=yes,scrollBars=yes,height=450,width=745');
}

function NeuesFenster(url,fenstername,parameter) {
  win = window.open (url, fenstername, 'resizable=yes,scrollBars=yes,height=600,width=800');
}

function openMerkliste(file, name)
{
  win = window.open (file, 'Hinweisfenster', 'resizable=yes,scrollBars=yes,height=450,width=790');
}
function NeuesFensterPos(url, fenstername, parameter, layoutparameter) {
  var position = HoleParameter('position', layoutparameter);
  if (position == "zentriert") {
    var w = HoleParameter('width', parameter);
    var h = HoleParameter('height', parameter);
    h = h - 20;
    var x = 0;
    var y = 0;
    if (w < screen.availWidth || h < screen.availHeight) {
      x = (screen.availWidth - w - 12) / 2;
      y = (screen.availHeight - h - 104) / 2;
      if (window.opera) y = 0; // Opera positioniert unter den Symbolleisten
      if (x < 0 || y < 0) { 
        x = 0; y = 0; 
      }
    }
    parameter += ",left=" + x + ",top=" + y;
  }
  var Fenster = window.open(url, fenstername, parameter);
  if (Fenster) Fenster.focus();
}

function HoleParameter(name, parameter) {
  var wert = "";
  ArrayParameter1 = new Array();
  ArrayParameter2 = new Array();
  ArrayParameter1 = parameter.split(",");
  for (i=0; i <= ArrayParameter1.length; i++) {
    ArrayParameter2 = ArrayParameter1[i].split("=");
    if (ArrayParameter2[0].toLowerCase() == name.toLowerCase()) {
      wert = ArrayParameter2[1];
      break;
    }
  }
  return wert;
}
