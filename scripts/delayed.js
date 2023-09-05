// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';
import { div } from './dom-helpers.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

// disgus commenting
function disqus() {
  const script = document.createElement('script');
  script.src = 'https://https-main-impala-mkclawson-hlx-live.disqus.com/embed.js';
  script.setAttribute('data-timestamp', +new Date());
  (document.head || document.body).appendChild(script);

  // insert disqus thread after loves
  const loves = document.querySelector('.loves-wrapper');
  loves.insertAdjacentElement('afterend', div({ id: 'disqus_thread' }));
}
disqus();
