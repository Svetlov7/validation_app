'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//Made by Ivan Kosheliev.

var config = {
    form: '[data-form]',
    validateFields: '[data-validate]'
};

var patterns = {
    email: /^\w+@\w+\.\w{2,4}$/,
    name: /^[a-zA-Z ]{1,}$/,
    select: /^.\S+$/,
    textarea: /[\s\S]{50,}/
};
var errors = {
    email: 'Error, please enter a valid value',
    name: 'Error, please enter a valid value',
    select: 'Error, please enter a valid value',
    textarea: 'Error, min value of characters starts from 50'
};

var $validationElements = document.querySelectorAll('[data-validate]');
var $form = document.querySelector(config.form);
var $button = $form.querySelector('button');

$form.addEventListener('submit', serializeForm);
$form.addEventListener('input', onFieldEvent);
$form.addEventListener('click', animateRectangle);

function serializeForm(e) {
    var result = {};
    e.preventDefault();
    var formData = new FormData($form);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = formData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var name = _ref2[0];
            var value = _ref2[1];

            result[name] = value;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    console.log(result);
}

function onFieldEvent(e) {
    var target = e.target;
    if (e.target.dataset.validate) {
        validate(target, patterns[target.dataset.validate]);
    }
    isAllElementsValidate($validationElements);
}

function validate(field, regex) {
    var isMessageErrorExist = void 0;
    //check for element that doesn't contains such selector
    if (field.closest('.form-field__item')) {
        isMessageErrorExist = field.closest('.form-field__item').querySelector('.form-field__error');
    }

    if (regex.test(field.value)) {
        field.className = 'valid';
        if (isMessageErrorExist) {
            isMessageErrorExist.remove();
        }
    } else {
        field.className = 'invalid';
        if (!isMessageErrorExist) {
            field.closest('.form-field__item').insertAdjacentHTML('beforeend', showErrorMessage(errors[field.dataset.validate]));
        }
    }
}

//checking all fields for showing submit button
function isAllElementsValidate(elements) {
    var valuedInputs = 0;
    var fieldsCount = elements.length;

    elements.forEach(function (item) {
        if (item.value.length > 0 && item.classList.contains('valid')) {
            valuedInputs++;
        } else {
            valuedInputs--;
        }
    });
    isSubmitButtonVisible(valuedInputs, fieldsCount);
}

function isSubmitButtonVisible(num, itemLength) {
    if (num == itemLength) {
        $button.removeAttribute('disabled');
        $button.style.display = 'block';
    } else {
        $button.setAttribute('disabled', 'disabled');
        $button.style.display = 'none';
    }
}

function showErrorMessage(message) {
    return '<span class="form-field__error">' + message + '</span>';
}

function animateRectangle(e) {
    var rectangle = document.querySelector('.rectangle');
    var randomNum = getRandomArbitrary(500, 2000);
    rectangle.setAttribute("style", 'transform:rotate(' + randomNum + 'deg)');
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function customSelect() {
    var x = void 0,
        i = void 0,
        j = void 0,
        l = void 0,
        ll = void 0,
        selElmnt = void 0,
        a = void 0,
        b = void 0,
        c = void 0;
    /*look for any elements with the class "custom-select":*/
    x = document.querySelectorAll('[data-select]');
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y = void 0,
                    i = void 0,
                    k = void 0,
                    s = void 0,
                    h = void 0,
                    sl = void 0,
                    yl = void 0;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        validate(s, patterns['select']);
                        isAllElementsValidate($validationElements);
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x = void 0,
            y = void 0,
            i = void 0,
            xl = void 0,
            yl = void 0,
            arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
}

customSelect();