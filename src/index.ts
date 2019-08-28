
// import { add } from './math';
import * as fromMath from './math'; // then refer to that add as fromMath.add(2,2)
import './styles.css';

const number1 = document.getElementById('number1') as HTMLInputElement;
const number2 = document.getElementById('number2') as HTMLInputElement;
const add = document.getElementById('add') as HTMLInputElement;
const answer = document.getElementById('answer') as HTMLSpanElement;

// console.log(number1, number2, add);

// ananymous function used as parm
add.addEventListener('click', function () {
    console.log('that tickled', this); // the this variable is the element that caused the eventto fire - view in f12
    // this.disabled = true;

    const n1 = number1.valueAsNumber;
    const n2 = number2.valueAsNumber;
    console.log(n1 + n2);
    const result = fromMath.add(n1, n2);
    answer.innerText = result.toString();

    number1.value = '';
    number2.value = '';
    number1.focus();

});

