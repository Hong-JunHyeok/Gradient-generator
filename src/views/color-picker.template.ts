const template = /* html */ `
    <h1 class="text-2xl font-black">Color Input</h1>
    <p>Click the button below to change the gradation color.</p>
    <input type="color" class="w-full rounded h-10 cursor-pointer">
`;

export default window.Handlebars.compile(template);
