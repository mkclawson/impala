import { loadScript } from '../../scripts/scripts.js';

export default function embedMarkup(url) {
  const embedHTML = `<div class="fb-page" data-href="${url}" data-width="380" data-hide-cover="false" data-show-facepile="false">
    <blockquote cite="${url}" class="fb-xfbml-parse-ignore"><a href="${url}">${url}</a></blockquote>
  </div>`;
  loadScript('https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0');
  return embedHTML;
}
