
// setup event for adding new cupcake
// when new cupcake added, post to the api
// upon success, add cupcake

$(document).ready(function () {

    // get the list
    // get cupcake data from api
    // populate the list with cupcake info

    console.log("document is ready");
});


const BASE_URL = "http://localhost:5000/api";

/**
 * This class maintains the list of individual Story instances
 *  It also has some methods for fetching, adding, and removing stories
 */

class StoryList {
  constructor() {
    this.stories = new Map();
  }

  /**
   * This method is designed to be called to generate a new StoryList.
   *  It:
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.*
   */

  // TODO: Note the presence of `static` keyword: this indicates that getStories
  // is **not** an instance method. Rather, it is a method that is called on the
  // class directly. Why doesn't it make sense for getStories to be an instance method?

  static async getStories() {
    // query the /stories endpoint (no auth required)
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    // turn the plain old story objects from the API into instances of the Story class
    const stories = response.data.cupcakes.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    const storyList = new StoryList();

    if (stories) {
      stories.forEach(function (s) {
        storyList.stories.set(s.id, new Story(s));
      });
    }

    return storyList;
  }

  /**
   * Method to make a POST request to /stories and add the new story to the list
   * - newStory - a new story object for the API with title, author, and url
   *
   * Returns the new story object
   */

  async addStory(newStory) {
    // this function returns the newly created story so it can be used in
    // the script.js file where it will be appended to the DOM
    const story = newStory;
    newStory = null;

    const response = await axios.post(`${BASE_URL}/cupcakes`, story).then(res => {
      console.log("post story succeeded");

      newStory = new Story(res.data);
      this.stories.set(newStory.id, newStory);

    }).catch(err => {
      console.log("post story failed: ", err);
      if (err.response) {
        console.log("client received an error response (5xx, 4xx): ", err.response.status);
        // client received an error response (5xx, 4xx)
      } else if (err.request) {
        console.log("client never received a response, or request never left");
        // client never received a response, or request never left
      } else {
        console.log("other error");
        // anything else
      }
    });

    return newStory;
  }

  async removeStory(cupcake_id) {

    const url = `${BASE_URL}/cupcakes/${cupcake_id}`;
    const method = "DELETE";
    const data = {
    };

    let retval = false;

    const response = await axios({
      url,
      method,
      data
    }).then(res => {
      console.log("delete story succeeded");

      if (this.stories.has(cupcake_id)) this.stories.delete(cupcake_id);

      retval = true;

    }).catch(err => {
      console.log("delete story failed: ", err);
      if (err.response) {
        console.log("client received an error response (5xx, 4xx): ", err.response.status);
        // client received an error response (5xx, 4xx)
      } else if (err.request) {
        console.log("client never received a response, or request never left");
        // client never received a response, or request never left
      } else {
        console.log("other error");
        // anything else
      }
    });

    return retval;
  }

  // TODO: editStory()
  async editStory(cupcake_id, story) {

    const url = `${BASE_URL}/cupcakes/${cupcake_id}`;
    const method = "PATCH";
    const data = story;

    let newStory = null;

    const response = await axios({
      url,
      method,
      data
    }).then(res => {
      console.log("update story succeeded");

      newStory = new Story(res.data);
      this.stories.set(newStory.id, newStory);

    }).catch(err => {
      console.log("update story failed: ", err);
      if (err.response) {
        console.log("client received an error response (5xx, 4xx): ", err.response.status);
        // client received an error response (5xx, 4xx)
      } else if (err.request) {
        console.log("client never received a response, or request never left");
        // client never received a response, or request never left
      } else {
        console.log("other error");
        // anything else
      }
    });

    return newStory;
  }
}


/**
 * Class to represent a single story.
 */

class Story {

  /**
   * The constructor is designed to take an object for better readability / flexibility
   * - storyObj: an object that has story properties in it
   */

  constructor(storyObj) {
    this.id = storyObj.id;
    this.flavor = storyObj.flavor;
    this.size = storyObj.size;
    this.rating = storyObj.rating;
    this.image = storyObj.image;
    this.created_at = storyObj.created_at;
  }
}


//
// UI
//

$(async function () {
  // cache some selectors we'll be using quite a bit
  const $allStoriesList = $("#all-articles-list");

  // global storyList variable
  let storyList = null;

  console.log("show all articles");
  storyList = await StoryList.getStories();
  generateStories(storyList.stories);

  /**
   * Event handler for submitting a new story
   */

  $("#submit-form button").on("click", function (e) {
    console.log("submitted new article");
    e.preventDefault();
    submitStory();
  });

  async function submitStory() {
    // grab all the info from the form
    const flavor = $("#flavor").val();
    const size = $("#size").val();
    const rating = $("#rating").val();
    const image = $("#image").val();
    const notes = $("#notes").val();

    const storyObject = await storyList.addStory({
      flavor,
      size,
      rating,
      image,
      notes
    });

    $allStoriesList.prepend(generateStoryHTML(storyObject));

    $(".button-trash-true").on("click", async function (e) {
      trashBtnClick(e);
    });

    $(".button-edit-true").on("click", async function (e) {
      editBtnClick(e);
    });
  }

  /**
   * A rendering function to call the StoryList.getStories static method,
   *  which will generate a storyList instance. Then render it.
   */

  function generateStories(stories) {
    // empty out that part of the page
    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    stories.forEach(function (story) {
      const result = generateStoryHTML(story);
      $allStoriesList.append(result);
    });

    $(".button-trash-true").on("click", async function (e) {
      trashBtnClick(e);
    });

    $(".button-edit-true").on("click", async function (e) {
      editBtnClick(e);
    });
  }

  /**
   * A function to render HTML for an individual Story instance
   */

  function generateStoryHTML(story) {
    if (!story) return;

    let starChecked = ""; //either "" or "-checked"
    let ownStory = "-false";

    // render story markup
    const storyMarkup = $(`
      <li id="${story.id}">
        <img class="cupcake-img"
            src="${story.image}"
            alt="(no image provided)">

        <small class="cupcake-id">id: ${story.id}</small>
        <small class="flavor">flavor: ${story.flavor}</small>
        <small class="size">size: ${story.size}</small>
        <small class="rating">rating: ${story.rating}</small>
        <button class="btn button-trash${ownStory}"></button>
        <button class="btn button-edit${ownStory}"></button>
      </li>
    `);

    return storyMarkup;
  }


  /**
   * Event handler for clicks on stories
   */

  async function trashBtnClick(e) {
    console.log("clicked on trash button - at top");
    const storyId = e.target.parentElement.id;
    if (!storyId) return;

    let retval = await storyList.removeStory(storyId);
    if (retval) {
      e.target.parentElement.remove();
    }
  }

  async function editBtnClick(e) {
    console.log("clicked on edit button - at top");
    const storyId = e.target.parentElement.id;
    if (!storyId) return;

    // prefill the edit article form
    let story = storyList.stories.get(storyId);
    console.log(`edit button clicked on storyid ${storyId}`)
  }
});