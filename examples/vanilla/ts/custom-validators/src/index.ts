import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { getResults, formValues } from './playground';

getResults().then(validationResult => {
  setTimeout(() => Prism.highlightAll(), 0);
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Custom validators example</h2>

      <pre style="display: flex;justify-content:space-between;">
<code class="language-js">
import { createFormValidation, ValidationSchema } from '@lemoncode/fonk';
import { isNumberValidator, minNumberValidator } from './custom-validators';

const validationSchema: ValidationSchema = {
  field: {
    age: [
      isNumberValidator,
      {
        validator: minNumberValidator,
        customArgs: { min: 18 },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.js
const formValues = ${JSON.stringify({ ...formValues }, null, 2)};

// Execute form validation
formValidation
  .validateField('product.name', formValues.product.name)
  .then(validationResult => {
    console.log(validationResult);
  });
</code>
<code class="language-js">
import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export const isNumberValidator: FieldValidationFunctionSync = ({ value }) => {
  const succeeded = !isNaN(value);
  return {
    succeeded,
    message: succeeded ? '' : 'Must be a number',
    type: 'IS_NUMBER',
  };
};

interface MinNumberArgs {
  min: number;
}

export const minNumberValidator: FieldValidationFunctionSync\<MinNumberArgs\> = ({
  value,
  customArgs,
}) => {
  const succeeded = isNaN(value) || value >= customArgs.min;
  return {
    succeeded,
    message: succeeded ? '' : \`Should be greater than \${customArgs.min}\`,
    type: 'MIN_NUMBER',
  };
};
</code>
</pre>

<h3>Result: </h3>
<pre><code class="language-js">
${JSON.stringify(validationResult, null, 2)}
</code></pre>
</div>
    `;
});