const template = /* html */ `
    <div 
    id="gradient-bar" 
    style=" background: linear-gradient(90deg,{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}}); cursor: copy"
    class="relative w-full h-10 rounded border-2 border-black my-8"
    >
        {{#each colorList}}
        <div 
        id="js-drag"  
        class="absolute border-4 border-black rounded-3xl" 
        style="transform: translateX({{this.stop}}%); cursor: col-resize;"
        >
            <div 
            data-x="{{this.stop}}"
            style=" background-color: {{this.color}};"
            class="border-4 border-white w-4 h-8 rounded-3xl"
            >
            </div>
        </div>
        {{/each}}
    </div>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
