const textareaEl = document.querySelector(".form__textarea");
const charEl = document.querySelector(".counter");

const inputHandler = () => {
  //get length of  characters from what user type
  const charLength = textareaEl.value.length;

  //calculate limit char
  const charLeft = charEl.textContent - charLength;

  //visual indicator for charEl
  charEl.textContent = charLeft;
};

textareaEl.addEventListener("input", inputHandler());
