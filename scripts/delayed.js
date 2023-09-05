// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

// disgus commenting configuration
import { div } from '../../scripts/dom-helpers.js';

var disqus_config = function () {
this.page.url = window.location.href;
};
(function() {
var d = document, s = d.createElement('script');
s.src = 'https://https-main-impala-mkclawson-hlx-live.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();

// insert disqus thread
const loves = document.querySelector('.loves-wrapper');
const disqus = div({ id: 'disqus_thread' });
loves.insertAdjacentElement('afterend', disqus);
