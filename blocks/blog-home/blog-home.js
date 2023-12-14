import { getAllBlogs } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/lib-franklin.js';
import { getViewsLoves } from '../recent-posts/recent-posts.js';

function createCard(row, style, position, eager) {
  const breakpoints = [
    { media: '(min-width: 1200px)', width: '500' },
    { media: '(min-width: 800px)', width: '400' },
    { media: '(min-width: 700px)', width: '300' },
    { media: '(min-width: 500px)', width: '250' },
    { width: '500' }];
  const card = document.createElement('div');
  if (style) card.classList.add(style);
  if (row.image && row.title) {
    const optimisedPicture = createOptimizedPicture(row.image, row.description, eager, breakpoints);
    const imageNew = optimisedPicture.querySelector('img');
    imageNew.setAttribute('width', imageNew.width);
    imageNew.setAttribute('height', imageNew.height);
    card.prepend(optimisedPicture);
  }
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  const author = document.createElement('div');
  author.classList.add('blog-author');
  if (row.author && row.author !== '0') author.innerHTML += `${row.author}`;
  const publishnread = document.createElement('div');
  publishnread.classList.add('blog-publishnread');
  const publishdiv = document.createElement('div');
  const readtimediv = document.createElement('div');
  if (row.published && row.published !== '0') publishdiv.innerHTML += `${row.published}`;
  if (row.readtime && row.readtime !== '0') readtimediv.innerHTML += ` ${row.readtime}`;
  publishnread.append(publishdiv);
  publishnread.append(readtimediv);
  cardContent.append(author);
  cardContent.append(publishnread);
  const link = document.createElement('a');
  link.classList.add('blog-link');
  link.href = row.path;
  if (row.title) link.innerHTML = `<h5>${row.title}</h5>`;
  cardContent.append(link);
  if (row.description) link.innerHTML += `<p>${row.description}</p>`;

  const cardSocialStats = document.createElement('div');
  cardSocialStats.classList.add('blog-social');
  getViewsLoves(row).then(
    (recentArticle) => { cardSocialStats.innerHTML = `<span class="views"><label>${recentArticle.views}</label><label>&nbspviews</label></span><a href="${row.path}#disqus_thread" id="disqus-${position}" class="count"></a><span class="loves-recent"><button class="button">♡</button><label id="loves-recent">${recentArticle.loves}</label></span>`; },
    (error) => { cardSocialStats.innerHTML = `<span class="views"><label>${error}</label><label>&nbspviews</label></span><a href="${row.path}#disqus_thread" id="disqus" class="count"></a><span class="loves-recent"><button class="button">♡</button><label id="loves-recent">${error}</label></span>`; },
  );
  cardContent.append(cardSocialStats);

  card.append(cardContent);
  return (card);
}

export default async function decorate(block) {
  block.textContent = '';
  // Make a call to get all blog details from the blog index
  const blogList = await getAllBlogs();
  if (blogList.length) {
    // eslint-disable-next-line
    const sortBl = blogList.sort((objA, objB) => Number(new Date(objB.published)) - Number(new Date(objA.published)));
    let position = 0;
    const eager = true;
    sortBl.forEach((row) => {
      if (/^\/blog\/[\d\w]/.test(row.path)) {
        if (position === 0) block.append(createCard(row, 'blog-card', position, eager));
        else block.append(createCard(row, 'blog-card', position, false));
        position += 1;
      }
    });
  } else {
    block.remove();
  }
}
