import { loadScript } from '../../scripts/scripts.js';

export default function embedMarkup(url) {
  const embedHTML = `<div class="g-ytsubscribe" data-channel="edergmbh" data-href="${url}" data-tabs="timeline" data-height="100" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"data-layout="full" data-count="default"></div>`;
  loadScript('https://apis.google.com/js/platform.js');
  return embedHTML;
}
