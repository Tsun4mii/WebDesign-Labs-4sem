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
    {       request=new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
    {
      request=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return request;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
        //tblCell.onclick = function(){this.onclick=function();};
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
function AddComment(comment)
{
  request=CreateRequest();
  if(request==null)
  {
    alert('Невозможно создать запрос');
    return;
  }   
  var url = "comment.php" + "?input=" + encodeURIComponent(comment);
  request.open("GET", url, true);
  request.send(); 
  request.onreadystatechange = LoadResults;
}
function AddCommentWithSleep(comment)
{
  setTimeout(function(){
  request=CreateRequest();
  if(request==null)
  {
    alert('Невозможно создать запрос');
    return;
  }   
  var url = "comment.php" + "?input=" + encodeURIComponent(comment);
  request.open("GET", url, true);
  request.send(); 
  request.onreadystatechange = LoadResults;
},4000);
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
function ShowDiv(id)
{
  if (document.layers) document.layers[id].visibility="show";
  else document.getElementById(id).style.visibility="visible";
}