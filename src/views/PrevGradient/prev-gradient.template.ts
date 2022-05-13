import { compile } from "handlebars";

const template = /* html */ `
    <div 
    id="prev-gradient"
    style="
      text-align: center;
      height: 100%;
    "
    class="grid place-content-center">
      <p 
        id="text-container" 
        style="
          disflex: flex;
          flex-wrap: wrap;
          font-size: 12rem;
          color: {{textData.textColor}};
        "
      >
        {{textData.textValue}}
      </p>
    </div>
`;

export default compile(template);
