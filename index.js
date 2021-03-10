import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

import axios from "axios";

import Navigo from "navigo";
import { capitalize } from "lodash";

//const router = new Navigo(window.location.origin);
const router = new Navigo("/");

router
  .on({
    "/": () => render(state.Home),
    ":page": (params) => {
      let page = capitalize(params.data.page);
      //console.log(state[page]);
      render(state[page]);
    },
  })
  .resolve();

// import {
//   AddPicturesToGallery,
//   GalleryPictures,
//   PrintFormOnSubmit,
// } from "./lib";

function render(st = state.Home) {
  //console.log(st);
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
`;
  router.updatePageLinks();
}

axios
  .get("https://jsonplaceholder.typicode.com/posts")
  // handle the response from the API
  .then((response) => {
    // for each post in the response Array,
    response.data.forEach((post) => {
      // add it to state.Blog.posts
      state.Blog.posts.push(post);
    });
  });

//render(state.Home);

// add menu toggle to bars icon in nav bar
document
  .querySelector(".fa-bars")
  .addEventListener("click", () =>
    document.querySelector("nav > ul").classList.toggle("hidden--mobile")
  );

// populating gallery with pictures
//const gallerySection = document.querySelector("#gallery");
// using modules to populate gallery with pictures
//AddPicturesToGallery(GalleryPictures, gallerySection);

// handle form submission with PrintFormOnSubmit module
const form = document.querySelector("form");
PrintFormOnSubmit(form);
