    
const table = document.getElementById("tablebody");

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

const xivsearch = "https://xivapi.com/search?string=";

var input = document.getElementById("searchbar");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("tablebody").innerHTML = "";
    document.getElementById("searchbtn").click();
  }
});

function search_action() {
  document.getElementById("tablebody").innerHTML = "";
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();

  fetch(xivsearch + input +`&limit=25&indexes=Item&columns=Name,ID,Icon`)
    .then(resp => resp.json())
    .then(function(search) {
      let itemList = search.Results;
      return itemList.map(function(items) {
        let tr = createNode("tr")
            tdicon = createNode("td"),
            iconimg = createNode("img"),
          tdname = createNode("td"),
          tdid = createNode("td");
        iconimg.src = `https://xivapi.com${items.Icon}`;
        tdicon.id = `item-icon`
        tdname.innerHTML = `${items.Name}`;
        tdname.id = `item-name`
        tdid.innerHTML = `${items.ID}`
        tdid.id = `item-Id`
        append(tdicon, iconimg);
        append(tr, tdicon);
        append(tr, tdname);
        append(tr, tdid);
        append(table, tr);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
