import serialize from "serialize-javascript";

function buildHtml(
  context: any,
  html: any,
  linkTags: any,
  styleTags: any,
  scriptTags: any
) {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <title>Dazl</title>
      ${linkTags()}
      ${styleTags()}
    </head>
    <body>
    <script>
        ;window.app=${serialize(context)}
      </script>
      <div id="root">${html}</div>
      ${scriptTags()}
    </body>
  </html>
  `;
}

export default buildHtml;
