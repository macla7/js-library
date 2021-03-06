import { titleVal } from "./formVal.mjs";

// Query Selectors for html
const form = document.getElementById("form");
const formContainer = document.getElementById("form-container");
const library = document.getElementById("library");
const show = document.getElementById("show");
const formClose = document.getElementById("close");
let bookNumber = 0;
let removeBook = document.querySelectorAll(".del-btn");
let toggleRead = document.querySelectorAll(".read-btn");
let tiles;

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  let read = radioSelect();

  addBookToLibrary(title, author, pages, read);
  form.reset();
  console.log(myLib);
});

show.addEventListener("click", (e) => {
  bringUpForm();
});

formClose.addEventListener("click", (e) => {
  bringUpForm();
});

formContainer.addEventListener("click", (e) => {
  if (!document.getElementById("form").contains(e.target)) {
    bringUpForm();
  }
});

let addRemoveFunc = (tiles) => {
  let button = removeBook[removeBook.length - 1];
  button.addEventListener("click", (e) => {
    console.log(e);
    console.log(myLib);
    let libIndex = button.parentElement.classList[1].split("").pop();
    myLib.splice(libIndex, 1);
    button.parentElement.remove();
    console.log(myLib);
    tiles = document.querySelectorAll(".lib-tile");
    refreshTiles(libIndex, tiles);
  });
};

let addReadFunc = (t = tiles) => {
  let button = toggleRead[toggleRead.length - 1];
  button.addEventListener("click", (e) => {
    let libIndex = button.parentElement.classList[1].split("").pop();
    if (myLib[libIndex]["read"] == "Haven't read it") {
      myLib[libIndex]["read"] = "I've read it";
    } else {
      myLib[libIndex]["read"] = "Haven't read it";
    }
    console.log(myLib[libIndex].info());
    console.log(myLib[libIndex]);
    button.parentNode.firstChild.textContent = myLib[libIndex].info();
  });
};

// Functions
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info = () => {
    return this.title.concat(
      " by ",
      this.author,
      ", ",
      this.pages,
      " pages, ",
      this.read
    );
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLib.push(newBook);
  newTile(newBook);
}

function radioSelect() {
  var radios = document.getElementsByName("read");
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      read = radios[i].value == "yes" ? "I've read it" : "Haven't read it";
      return read;
    }
  }
}

function newTile(newBook, lib = library, t = tiles) {
  const div = document.createElement("div");

  addContentToDiv(newBook, div);
  addDelBtn(div);
  addReadBtn(div);

  lib.appendChild(div);
  removeBook = document.querySelectorAll(".del-btn");
  toggleRead = document.querySelectorAll(".read-btn");
  bookNumber++;
  addRemoveFunc(t);
  addReadFunc(t);
}

function addContentToDiv(newBook, div) {
  const p = document.createElement("p");
  p.textContent = newBook.info();
  div.appendChild(p);
  div.classList.add("lib-tile");
  div.classList.add(`tile-${myLib.length - 1}`);
}

function addDelBtn(div) {
  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.textContent = "Remove";
  div.appendChild(delBtn);
}

function addReadBtn(div) {
  const read = document.createElement("button");
  read.classList.add("read-btn");
  read.textContent = "Read";
  div.appendChild(read);
}

function bringUpForm(cont = formContainer) {
  cont.classList.toggle("show-form");
}

function refreshTiles(libIndex, tiles) {
  tiles.forEach((tile) => {
    let tileNum = parseInt(tile.classList[1].match(/\d/));
    if (libIndex <= tileNum) {
      tile.classList.remove([...tile.classList][1]);
      tile.classList.add(`tile-${tileNum - 1}`);
      console.log(tile.classList);
    }
  });
}

// Set up myLib array
let myLib = [];
const theHobbit = addBookToLibrary(
  "The Hobbit",
  "J.R.R Tolkien",
  295,
  "Haven't read it"
);
const beyond = addBookToLibrary(
  "Beyond Good and Evil",
  "Ni",
  1329,
  "Haven't read it"
);
const theBlade = addBookToLibrary(
  "The Blade Itself",
  "Joe Abercrombie",
  538,
  "I've read it"
);

titleVal();
