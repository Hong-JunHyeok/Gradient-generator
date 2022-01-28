const template = /* html */ `
    <main>
        <header class="w-full shadow font-bold fixed top-0 left-0">
            <h1 class="text-2xl text-purple-700 text-opacity-50 container mx-auto p-4">
                {{title}}
            </h1>
            <div id="prev-gradient" class="w-full h-80 bg-gray-100">
            </div>
        </header>
        <section id="palette" class="relative container mx-auto rounded-lg shadow bg-gray-50 flex flex-col md:flex-wrap-reverse p-3" style="margin-top: 22rem;">
            <section id="palette-gradient">
                <div id="gradient-bar"></div>
            </section>
            <section>
                <div id="color-list"></div>
            </section>
            <section id="palette-options">
                <div id="change-option" class="p-2 flex flex-col"></div>
            </section>
            <div id="code-viewer"></div>
            <div id="md-viewer">
                New Feature
            </div>
        </section>
    </main>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
