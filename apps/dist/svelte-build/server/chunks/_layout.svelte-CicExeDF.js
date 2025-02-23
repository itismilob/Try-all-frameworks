import { h as head, c as pop, p as push } from './index-CPDq-rzA.js';

function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Svelte</title>`;
    $$payload2.out += `<meta name="description" content="Svelte demo app">`;
  });
  $$payload.out += `<div class="framework-border svelte-border"><main><header><a href="/svelte">Svelte home</a> <button>Logout</button></header> `;
  children($$payload);
  $$payload.out += `<!----></main> <div class="framework-title">SvelteKit <img class="framework-icon" src="/public/svelte.svg" alt="framework-icon"></div></div>`;
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CicExeDF.js.map
