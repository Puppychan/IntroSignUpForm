let formInputs = Array.from(document.querySelectorAll("[class^=content__form-]"));
formInputs.pop()
let submitBtn = formInputs.pop();

let placeholderMap = new Map();
formInputs.forEach(element => {
    placeholderMap.set(element, element.placeholder);
});

let removeYet = false;
let checkAll;

submitBtn.addEventListener("click", submitEvent => {
    // if (!clickYet) {
            submitEvent.preventDefault();
            checkAll = true;
            formInputs.forEach(element => {
                if (element.value === null || element.value.trim() === '') {
                    checkAll = false;

                    let newDiv = document.createElement("p");
                    element.parentNode.after(newDiv);
                    newDiv.setAttribute("class", "error-message");
                    
                    // style inside input field
                    element.classList.add("error-display");
                    element.nextElementSibling.classList.add("show");
                    
                    // check special case
                    if (!element.placeholder.includes("Email")) {
                        newDiv.textContent = element.placeholder + " cannot be empty";
                        element.setAttribute('placeholder', '');
                    }
                    else {
                        newDiv.textContent = "Looks like this is not an email";
                        element.setAttribute('placeholder', 'email@example/com');
                        element.classList.add("error-placeholder");
                    }
                }

            });
        // if user input all in right format
        if (checkAll) {
            document.querySelector(".container__content-form").submit();
            formInputs.forEach(element => element.value = "");
        }
        
        removeYet = false;
    // }
    
});

formInputs.forEach(element => {
    element.addEventListener("focus", e => {
        if (!removeYet) {
            formInputs.forEach(smallElement => {
                // style inside input field
                smallElement.classList.remove("error-display");
                smallElement.nextElementSibling.classList.remove("show");
                smallElement.setAttribute("placeholder", placeholderMap.get(smallElement));
                smallElement.classList.remove("error-placeholder");
                
                if (smallElement.parentNode.nextElementSibling.classList.contains("error-message"))
                    smallElement.parentNode.nextElementSibling.remove();
            });
            removeYet = true;
        }
    });
});