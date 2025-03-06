import { h as head, c as pop, p as push } from './index-42YinwoM.js';
import './client-CGL0aXpS.js';
import './exports-BJMB-Z8X.js';

function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Svelte</title>`;
    $$payload2.out += `<meta name="description" content="Svelte demo app">`;
  });
  $$payload.out += `<div class="framework-border svelte-border"><div class="main-container">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<header><a href="/svelte/">Svelte home</a> <button>Logout</button></header>`;
  }
  $$payload.out += `<!--]--> <main>`;
  children($$payload);
  $$payload.out += `<!----></main></div> <div class="framework-title">SvelteKit <img class="framework-icon" src="/public/svelte.svg" alt="framework-icon"></div></div>`;
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-DeBl45zE.js.map
