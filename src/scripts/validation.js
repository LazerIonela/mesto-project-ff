function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  
  inputElement.classList.add(validationConfig.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  
  inputElement.classList.remove(validationConfig.inputError);
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
   // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true
       return !inputElement.validity.valid;   
   });
 };

 function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
   } else {
     inputElement.setCustomValidity("");
   }

 if (!inputElement.validity.valid) {
     showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
   } else {
     hideInputError(formElement, inputElement, validationConfig);
   } 
};

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    };
};  

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement, validationConfig);
          toggleButtonState(inputList, buttonElement, validationConfig);
      });
  }); 
};

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
 
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
    });
};

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(document.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    isValid(formElement, inputElement, validationConfig);
    hideInputError(formElement, inputElement, validationConfig);
    inputElement.setCustomValidity("");
  });

    toggleButtonState(inputList, buttonElement, validationConfig);
};

export {enableValidation, clearValidation};