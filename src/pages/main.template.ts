const template = `
    <main>
        <header class="w-full p-4 shadow">
            <h1 class="text-2xl">
                {{title}}
            </h1>
        </header>
    </main>
`;

export default window.Handlebars.compile(template);
