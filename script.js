let selectedTool = null;
let inventory = [];
const itemSection = document.querySelector(".inventory");
let selectedItem;

document.getElementById("restart").addEventListener("click", function () {
  location.reload();
});

const tools = {
  axe: document.querySelector(".axe a"),
  pickaxe: document.querySelector(".pickaxe a"),
  shovel: document.querySelector(".shovel a"),
  sword: document.querySelector(".sword a"),
  box: document.querySelector(".box a"),
};

const items = {
  grass1: document.querySelector(".grass1_"),
  grass2: document.querySelector(".grass2_"),
  grass3: document.querySelector(".grass3_"),
  grass4: document.querySelector(".grass4_"),
  grass5: document.querySelector(".grass5_"),
  soil1: document.querySelector(".soil1_"),
  soil2: document.querySelector(".soil2_"),
  soil3: document.querySelector(".soil3_"),
  soil4: document.querySelector(".soil4_"),
  soil5: document.querySelector(".soil5_"),
  stone1: document.querySelector(".stone1_"),
  stone2: document.querySelector(".stone2_"),
  stone3: document.querySelector(".stone3_"),
  wood: document.querySelector(".wood_"),
  leaves: document.querySelector(".leaves_"),
  creeper: document.querySelector(".creeper_"),
};

const cursorUrls = {
  axe: "./assets/cursors/axe.cur",
  pickaxe: "assets/cursors/pickaxe.cur",
  shovel: "assets/cursors/shovel.cur",
  sword: "assets/cursors/sword.cur",
  creeper: "assets/cursors/creeper.cur",
  grass1: "assets/cursors/grass1.cur",
  grass2: "assets/cursors/grass2.cur",
  grass3: "assets/cursors/grass3.cur",
  grass4: "assets/cursors/grass4.cur",
  grass5: "assets/cursors/grass5.cur",
  soil1: "assets/cursors/soil1.cur",
  soil2: "assets/cursors/soil2.cur",
  soil3: "assets/cursors/soil3.cur",
  soil4: "assets/cursors/soil4.cur",
  soil5: "assets/cursors/soil5.cur",
  stone1: "assets/cursors/stone1.cur",
  stone2: "assets/cursors/stone2.cur",
  stone3: "assets/cursors/stone3.cur",
  leaves: "assets/cursors/leaves.cur",
  wood: "assets/cursors/wood.cur",
};

document.querySelectorAll(".inventory section").forEach((section) => {
  section.style.display = "none";
});

for (let tool in tools) {
  tools[tool].addEventListener("click", function (event) {
    event.preventDefault();
    selectedTool = tool;
    selectedItem = undefined;
    if (cursorUrls[selectedTool]) {
      console.log(cursorUrls[tool]);
      document.body.style.cursor = `url(${cursorUrls[selectedTool]}), auto`;
    }
    if (selectedTool === "box") {
      if (!itemSection.classList.contains("grid")) {
        itemSection.classList.replace("none", "grid");
        for (let item in items) {
          items[item].addEventListener("click", function (event) {
            event.preventDefault();
            selectedItem = item;
            selectedTool = undefined;
            if (cursorUrls[selectedItem]) {
              console.log(1);

              document.body.style.cursor = `url(${cursorUrls[selectedItem]}), auto`;
            }
          });
        }
      } else if (itemSection.classList.contains("grid")) {
        itemSection.classList.replace("grid", "none");
      }
    }
  });
}

const tile = document.querySelector("main");
tile.addEventListener("click", function (event) {
  const clickedElement = event.target;
  if (clickedElement.classList[0] !== "sky_") {
    clicked(clickedElement);
  } else if (itemSection.classList.contains("grid")) {
    build(clickedElement, selectedItem);
  }
});

function clicked(tile) {
  oldTile = tile.classList;
  if (selectedTool === "axe") {
    if (oldTile[0] === "wood" || oldTile[0] === "leaves") {
      updateInventory(oldTile[0]);
      tile.classList.remove(oldTile[0]);
      tile.classList.add("sky_");
    }
  } else if (selectedTool === "pickaxe") {
    if (
      oldTile[0] === "stone1" ||
      oldTile[0] === "stone2" ||
      oldTile[0] === "stone3"
    ) {
      updateInventory(oldTile[0]);
      tile.classList.remove(oldTile[0]);
      tile.classList.add("sky_");
    }
  } else if (selectedTool === "shovel") {
    if (
      oldTile[0] === "soil1" ||
      oldTile[0] === "soil2" ||
      oldTile[0] === "soil3" ||
      oldTile[0] === "soil4" ||
      oldTile[0] === "soil5" ||
      oldTile[0] === "grass1" ||
      oldTile[0] === "grass2" ||
      oldTile[0] === "grass3" ||
      oldTile[0] === "grass4" ||
      oldTile[0] === "grass5"
    ) {
      updateInventory(oldTile[0]);
      tile.classList.remove(oldTile[0]);
      tile.classList.add("sky_");
    }
  } else if (selectedTool === "sword") {
    if (oldTile[0] === "creeper") {
      updateInventory(oldTile[0]);
      tile.classList.remove(oldTile[0]);
      tile.classList.add("sky_");
    }
  }
}

function updateInventory(item) {
  let itemExists = false;
  for (let i = 0; i < inventory.length; i++) {
    let key = Object.keys(inventory[i])[0];
    if (key === item) {
      inventory[i][key] += 1;
      itemExists = true;
      break;
    }
  }
  if (!itemExists) {
    let newItem = {};
    newItem[item] = 1;
    inventory.push(newItem);
  }

  const itemSection = document.querySelector(`.${item}_`);
  const span = itemSection.querySelector("span");
  let count = parseInt(span.textContent) || 0;
  count += 1;
  span.textContent = count;
  updateInventoryVisibility(itemSection);
}

function updateInventoryVisibility(section) {
  const span = section.querySelector("span");
  const count = parseInt(span.textContent) || 0;
  if (count > 0) {
    section.style.display = "flex";
  } else {
    section.style.display = "none";
  }
}

function build(tile, selectedItem) {
  oldTile = tile.classList;
  takeFinventory(selectedItem);
  tile.classList.remove(oldTile[0]);
  tile.classList.add(selectedItem);
}

function takeFinventory(item) {
  for (let i = 0; i < inventory.length; i++) {
    let key = Object.keys(inventory[i])[0];
    if (key === item) {
      inventory[i][key] -= 1;
      break;
    }
  }
  const itemSection = document.querySelector(`.${item}_`);
  const span = itemSection.querySelector("span");
  let count = parseInt(span.textContent);
  count -= 1;
  if (count === 0) document.body.style.cursor = `auto`;
  span.textContent = count;
  takeFinventoryVisibility(itemSection);
}

function takeFinventoryVisibility(section) {
  const span = section.querySelector("span");
  const count = parseInt(span.textContent);
  if (count === 0) {
    section.style.display = "none";
    selectedItem = undefined;
  } else {
    section.style.display = "flex";
  }
}
