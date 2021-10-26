const template = /* html */ `
    <pre>
        <code class="css">
        body {
            background:red; 
         }
        </code>
    </pre>
`;
//   background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
