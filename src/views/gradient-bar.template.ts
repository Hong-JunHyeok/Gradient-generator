const template = /* html */ `
    <div 
    id="gradient-bar" 
    style="background: linear-gradient(90deg,{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}}); cursor: copy"
    class="w-full h-10 rounded border-2 border-black my-8"
    >
        {{#each colorList}}
        <div class="absolute border-4 border-black rounded-3xl" style="transform: translateX({{this.stop}}px);cursor: col-resize;">
            <div 
            id="js-drag" 
            data-x="{{this.stop}}" 
            style=" background-color: {{this.color}};"
            class="border-4 border-white w-4 h-8 rounded-3xl"
            >
            </div>
        </div>
        {{/each}}
    </div>
`;

export default window.Handlebars.compile(template);
