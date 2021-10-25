const template = /* html */ `
    <div 
    id="gradient-bar" 
    style="background: linear-gradient(90deg,{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}}); cursor: copy"
    class="w-full h-10 rounded border-2 border-black my-8"
    >
    </div>
`;

export default window.Handlebars.compile(template);
