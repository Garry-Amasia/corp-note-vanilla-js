// --------------GLOBAL SELECTOR--------------
const textareaEl = document.querySelector(".form__textarea");
const charEl = document.querySelector(".counter");
const orderedListEl = document.querySelector(".feedbacks");
const formEl = document.querySelector(".form");
console.log(formEl);
const submitButtonEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");
const MAX_CHAR = 150;

const showVisualIndicator = (text) => {
  const className = text === "valid" ? "form--valid" : "form--invalid";
  console.log(`${className} runs`);
  //show valid indicator
  formEl.classList.add(className);
  //remove visual indicator
  setTimeout(() => formEl.classList.remove(className), 2000);
};

// --------------COUNTER COMPONENT--------------
const inputHandler = () => {
  //get length of  characters from what user type
  const charLength = textareaEl.value.length;
  //calculate limit char
  const charLeft = MAX_CHAR - charLength;
  //visual indicator for charEl
  charEl.textContent = charLeft;
};
textareaEl.addEventListener("input", inputHandler);

// --------------FORM COMPONENT--------------
const submitHandler = (e) => {
  //This will prevent reloading to the path action="#" in form html
  e.preventDefault();
  //get text from text area
  const text = textareaEl.value;
  // validation(must include hashtag for "company name" and text must be long enough)
  const validated = text.includes("#") && text.length > 10;
  if (validated) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
    //focus textarea again,user can continue typing again
    textareaEl.focus();
    //stop function execution
    return;
  }

  //now we have the validated text, extract it and make it available as an information.
  //get the company name
  const hashtag = text.split(" ");
  const wordContainHashTag = hashtag.find((item) => item.includes("#"));
  const company = wordContainHashTag.substring(1);

  //get batch letter character,upvote count and days ago
  const batchLetter = company.substring(0, 1).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  //create list in HTML format
  const feedbackItemHTML = `
  <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${upvoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${batchLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${company}</p>
        <p class="feedback__text">${text}</p>
    </div>
    <p class="feedback__date">${daysAgo === 0 ? "new" : `${daysAgo}d`}</p>
</li>`;

  //insert feedback into the list
  orderedListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);

  //   reset to its default(textarea="",count=0,unfocus button)
  textareaEl.value = "";
  charEl.textContent = MAX_CHAR;
  submitButtonEl.blur();
};

formEl.addEventListener("submit", submitHandler);

// --------------FEEDBACK COMPONENT--------------
//make GET request from the server
fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks")
  .then((res) => res.json())
  .then((data) => {
    spinnerEl.remove();
    console.log(data.feedbacks);
    data.feedbacks.forEach((singleFeedback) => {
      //create list in HTML format
      const feedbackItemHTML = `
  <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${singleFeedback.upvoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${singleFeedback.badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${singleFeedback.company}</p>
        <p class="feedback__text">${singleFeedback.text}</p>
    </div>
    <p class="feedback__date">${
      singleFeedback.daysAgo === 0 ? "new" : `${singleFeedback.daysAgo}d`
    }</p>
</li>`;

      //insert feedback into the list
      orderedListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
    });
  })
  .catch(
    (error) =>
      (orderedListEl.textContent = `error happening,could not fetch data, status: ${error.message}`)
  );
