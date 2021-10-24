const template = /* html */ `
    <div 
    id="prev-gradient"
    style="background: linear-gradient(90deg, rgba(238,174,202,1) 0%, {{pickColor}} 100%)"
    class="h-full">
    </div>
`;

export default window.Handlebars.compile(template);
