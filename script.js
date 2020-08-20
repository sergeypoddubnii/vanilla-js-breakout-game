const showRulesBtn = document.querySelector("#rules-btn");
const closeRulesBtn = document.querySelector("#close-btn");
const rules = document.querySelector("#rules");

const showRules = () => {
  rules.classList.add("show");
};
const closeRules = () => {
  rules.classList.remove("show");
};

showRulesBtn.addEventListener("click", showRules);
closeRulesBtn.addEventListener("click", closeRules);
