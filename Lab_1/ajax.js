var request;
function CreateRequest()
{
  var request=null;
  try
  {
    request = new XMLHttpRequest();
  }
  catch (e)
  {
    try
    {       
      request=new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
    {
      request=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return request;
}

function KeyPress(term)
{
  request=CreateRequest();
  if(request==null)
  {
    return;
  }
  var url = "country.php" + "?s=" + encodeURIComponent(term);
  request.onreadystatechange = LoadResults;
  request.open("GET", url, true);
  request.send();
}

function LoadResults()
{            
  if (request.readyState == 4)
  {
    if (request.status == 200)
    {
      ShowDiv("searchresults");
      ClearResults();
      var answer = request.responseText;
      var array = answer.split(",");
      var count = array.length;
      var div = document.getElementById("searchresults");
      var tbl = document.createElement("table");
      var tblbody = document.createElement("tbody");
      var tblRow, tblCell, tblNode;
      for(var i = 0; i < count; i++)
      {
        var text = array[i];
        tblRow = document.createElement("tr");
        tblCell = document.createElement("td");
        tblCell.onmouseover = function(){this.className='mouseOver';};
        tblCell.onmouseout = function(){this.className='mouseOut';};
        tblCell.setAttribute("border", "0");
        tblNode = document.createTextNode(text);
        tblCell.appendChild(tblNode);
        tblRow.appendChild(tblCell);
        tblbody.appendChild(tblRow);
      }
      tbl.appendChild(tblbody);
      div.appendChild(tbl);

    }
  }
}

function ShowDiv(id)
{
  if (document.layers) document.layers[id].visibility="show";
  else document.getElementById(id).style.visibility="visible";
}

function HideDiv(id)
{
  if (document.layers) document.layers[id].visibility="hide";
  else document.getElementById(id).style.visibility="hidden";
}

function ClearResults()
{
  var div = document.getElementById("searchresults");
  var counter = div.childNodes.length;
  for(var i = counter-1; i >= 0; i--)
  {
    div.removeChild(div.childNodes[i]);
  }
}
