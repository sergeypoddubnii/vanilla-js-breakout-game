const rules = document.querySelector("#rules");

const rulesHandlers = {
  showRules: () => {
    rules.classList.add("show");
  },
  closeRules: () => {
    rules.classList.remove("show");
  },
};

export default rulesHandlers;
