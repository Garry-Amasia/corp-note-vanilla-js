// --------------GLOBAL SELECTOR--------------
const textareaEl = document.querySelector(".form__textarea");
const charEl = document.querySelector(".counter");
const orderedListEl = document.querySelector(".feedback");
const formEl = document.querySelector(".form");

// --------------COUNTER COMPONENT--------------
const inputHandler = () => {
  //get length of  characters from what user type
  const charLength = textareaEl.value.length;

  //calculate limit char
  const charLeft = charEl.textContent - charLength;

  //visual indicator for charEl
  charEl.textContent = charLeft;
};

textareaEl.addEventListener("input", inputHandler());

// --------------SUBMIT COMPONENT--------------

const submitHandler = (e) => {
  //This will prevent reloading to the path action="#" in form html
  e.preventDefault();

  //get text from text area
  const text = textareaEl.value;

  // validation(must include hashtag for "company name" and text must be long enough)
  const validated = text.includes("#") && text.length > 10;
  console.log(validated);

  if (validated) {
    //show valid indicator
    formEl.classList.add("form--valid");
    //remove visual indicator
    setTimeout(() => formEl.classList.remove("form--valid"), 2000);
  } else {
    //show invalid indicator
    formEl.classList.add("form--invalid");
    //remove invalid indicator
    setTimeout(() => formEl.classList.remove("form--invalid"), 2000);
    //focus textarea again,user can continue typing again
    textareaEl.focus();
  }
};

formEl.addEventListener("submit", submitHandler);
