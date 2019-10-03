import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { getResults, loginModel } from './playground';

getResults().then(validationResult => {
  setTimeout(() => Prism.highlightAll(), 0);
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Required example</h2>

<pre><code class="language-js">
import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required.validator],
    password: [
      {
        validator: Validators.required.validator,
        customArgs: { trim: false },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.ts
const loginModel = ${JSON.stringify({ ...loginModel }, null, 2)};

// Execute form validation
formValidation
  .validateForm(loginModel)
  .then(validationResult => {
    console.log(validationResult);
  });
</code></pre>

<h3>Result: </h3>
<pre><code class="language-js">
${JSON.stringify(validationResult, null, 2)}
</code></pre>
</div>
    `;
});