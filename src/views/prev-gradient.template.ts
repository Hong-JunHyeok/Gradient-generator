const template = /* html */ `
    <div id="prev-gradient" style="background: {{pickColor}}" class="h-full">
        그라디언트 미리보기
    </div>
`;

export default window.Handlebars.compile(template);
