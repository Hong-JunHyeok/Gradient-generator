const template = /* html */ `
    <ul>
        {{#each colorList}}
            <li>
                <b>{{color}}</b>
                <p>{{stop}}</p>
            </li>

        {{/each}}
    </ul>
`;

export default window.Handlebars.compile(template);
