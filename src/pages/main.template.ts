const template = `
    <main>
        <header class="w-full p-4 shadow font-bold">
            <h1 class="text-2xl text-purple-700 text-opacity-50 container mx-auto">
                {{title}}
            </h1>
        </header>
        <div id="prev-gradient" class="w-full h-52 bg-gray-100">
        </div>
        <section id="palette" class="container mx-auto rounded-lg shadow bg-gray-50 flex flex-col md:flex-wrap-reverse p-3">
            <section id="palette-gradient">
                <div id="color-picker">
                    <h1 class="font-bold">컬러 픽커</h1>
                </div>
            </section>
            <section id="palette-color">
                <div id="color-picker__inputs">
                    <h1 class="font-bold">컬러 인풋</h1>
                </div>
            </section>
            <section id="palette-options">
                <div id="change-option">
                    <button>Linear</button>
                    <button>Redial</button>
                </div>
            </section>
        </section>
    </main>
`;

export default window.Handlebars.compile(template);
