// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';
import { div } from './dom-helpers.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

function disqus() {
  // inject discuss script
  const scriptComments = document.createElement('script');
  scriptComments.src = 'https://https-main-impala-mkclawson-hlx-live.disqus.com/embed.js';
  scriptComments.setAttribute('data-timestamp', +new Date());
  (document.head || document.body).appendChild(scriptComments);

  // Create details element
  const details = document.createElement('details');
  details.classList.add('disqus');

  // Create summary element
  const summary = document.createElement('summary');
  summary.textContent = 'Comments';

  // Append the summary and content to the details element
  details.appendChild(summary);
  details.appendChild(div({ id: 'disqus_thread' }));

  // insert comments after loves
  const loves = document.querySelector('.blog-cards-parent');
  loves.insertAdjacentElement('afterend', details);

  // add discuss counts
  const scriptCount = document.createElement('script');
  scriptCount.src = 'https://https-main-impala-mkclawson-hlx-live.disqus.com/count.js';
  scriptCount.id = 'dsq-count-scr';
  scriptCount.setAttribute('async', 'true');
  (document.head || document.body).appendChild(scriptCount);
}


disqus();
