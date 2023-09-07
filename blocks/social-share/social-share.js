import { getMetadata } from '../../scripts/lib-franklin.js';
// eslint-disable-next-line object-curly-newline
import { a, div, img, li, p, ul } from '../../scripts/dom-helpers.js';

function getURL() {
  return encodeURIComponent(window.location.href);
}

function getTitle() {
  const h1 = document.querySelector('h1');
  return h1 ? encodeURIComponent(h1.textContent) : '';
}

function onSocialShareClick(event) {
  event.preventDefault();
  const href = event.currentTarget.getAttribute('href');
  if (!href) return;
  window.open(href, 'popup', 'width=800,height=700,scrollbars=no,resizable=no');
}

function decorateLink(social, type, icon, url) {
  icon.setAttribute('aria-label', type);
  if (!url) return;

  social.append(
    a(
      {
        href: url,
        'aria-label': `Share to ${type}`,
        target: '_blank',
        rel: 'noopener noreferrer',
        onclick: onSocialShareClick,
      },
      icon,
    ),
  );
}

export function decorateIcons(element) {
  const url = getURL();
  const title = getTitle();

  element.querySelectorAll('li')
    .forEach((social) => {
      const type = social.getAttribute('data-type');
      const icon = social.querySelector('img');

      switch (type) {
        case 'facebook':
          decorateLink(social, 'Facebook', icon, `https://www.facebook.com/sharer/sharer.php?u=${url}`);
          break;
        case 'linkedin':
          decorateLink(social, 'LinkedIn', icon, `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`);
          break;
        case 'twitter':
          decorateLink(social, 'Twitter', icon, `https://www.twitter.com/share?&url=${url}&text=${title}`);
          break;
          /* This is just a link.
        case 'youtube-play':
          decorateLink(social, 'Youtube', icon, 'https://www.youtube.com/user/[channelnamehere]');
          break;
           */
        default:
          break;
      }
    });
}

// using domhelpers
export function socialShareBlock(title, socials) {
  return div(
    { class: 'share-event' },
    p(title),
    div(
      { class: 'social-links' },
      ul(
        { class: 'button-container' },
        ...socials.map((social) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          li(
            {
              class: `share-${social}`,
              'data-type': social,
            },
            img({ class: `icon icon-${social}`, src: `../icons/${social}.svg` }),
          )),
      ),
    ),
  );
}

export default function decorate(block) {
  const template = getMetadata('template')
    .toLowerCase();

  let title = '';
  if (block.querySelector('.social-share p')) {
    title = block.querySelector('.social-share p').innerHTML;
  }

  const socials = template === 'blog'
    ? ['linkedin', 'facebook', 'twitter']
    : ['facebook', 'linkedin', 'twitter'];

  block.innerHTML = '';
  // block.appendChild(socialShareBlock(title, socials));
  if (template !== 'blog-home') block.appendChild(socialShareBlock(title, socials));

  decorateIcons(block);
}
