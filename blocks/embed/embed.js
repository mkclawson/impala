// eslint-disable-next-line import/no-duplicates
import { toClassName } from '../../scripts/lib-franklin.js';
// eslint-disable-next-line import/no-duplicates
import { decorateIcons } from '../../scripts/lib-franklin.js';

const getDefaultEmbed = (
  url,
) => `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
    <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen=""
      scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
    </iframe>
  </div>`;

const embedYumpu = (
  url,
) => `<div class="embed-container" id="ypembedcontainer" style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
  <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen=""
    scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
  </iframe>
</div>`;

const embedYoutube = (url, autoplay) => {
  const usp = new URLSearchParams(url.search);
  const suffix = autoplay ? '&muted=1&autoplay=1' : '';
  let vid = usp.get('v') && encodeURIComponent(usp.get('v'));
  const embed = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }
  const embedHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://www.youtube.com${vid ? `/embed/${vid}?rel=0&v=${vid}${suffix}` : embed}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
    </div>`;
  return embedHTML;
};

const embedYoutubeChannel = async (url) => {
  // offload the Youtube Channel embed as this is only used on the social media page
  const mod = await import('./embed-youtube-channel.js');
  let embedHTML = '';
  if (mod.default) {
    embedHTML = await mod.default(url);
  }
  return embedHTML;
};

const embedInstagram = async (url) => {
  // offload the instagram template to only load the large template if really needed
  const mod = await import('./embed-instagram.js');
  let embedHTML = '';
  if (mod.default) {
    embedHTML = await mod.default(url);
  }
  return embedHTML;
};

const embedFacebook = async (url) => {
  // offload the Facebook Page template as this is only used on the social media page
  const mod = await import('./embed-facebook.js');
  let embedHTML = '';
  if (mod.default) {
    embedHTML = await mod.default(url);
  }
  return embedHTML;
};

const embedVideo = (url) => `
  <figure class="video"><div class="video-embed">
  <video  controls="" autoplay="" class="video-embed-item"><source src="${url}" type="video/mp4"></video>
  </div></figure>`;

const loadEmbed = async (block, link, autoplay) => {
  if (block.classList.contains('embed-is-loaded')) {
    return;
  }

  const EMBEDS_CONFIG = [
    {
      match: ['youtube.com/user/', 'youtube.com/channel/'],
      embed: embedYoutubeChannel,
    },
    {
      match: ['youtube', 'youtu.be'],
      embed: embedYoutube,
    },
    {
      match: ['yumpu'],
      embed: embedYumpu,
    },
    {
      match: ['instagram'],
      embed: embedInstagram,
    },
    {
      match: ['facebook'],
      embed: embedFacebook,
    },
    {
      match: ['.mp4'],
      embed: embedVideo,
    },
  ];

  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => link.includes(match)));
  const url = new URL(link);
  if (config) {
    const className = toClassName(config.match[0]);
    block.innerHTML = await config.embed(url, autoplay);
    block.classList = `block embed embed-${className}`;
    decorateIcons(block);
  } else {
    block.innerHTML = getDefaultEmbed(url);
    block.classList = 'block embed';
  }

  block.classList.add('embed-is-loaded');
};

export default function decorate(block) {
  const placeholder = block.querySelector('picture');
  const link = block.querySelector('a').href;
  block.textContent = '';

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-placeholder';
    wrapper.innerHTML = '<div class="embed-placeholder-play"><button title="Play"></button></div>';
    wrapper.prepend(placeholder);
    wrapper.addEventListener('click', () => {
      loadEmbed(block, link, true);
    });
    block.append(wrapper);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadEmbed(block, link);
      }
    });
    observer.observe(block);
  }
}
