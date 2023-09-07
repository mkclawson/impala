import { getAllBlogs } from '../../scripts/scripts.js';
import { createOptimizedPicture, getMetadata } from '../../scripts/lib-franklin.js';

function createCard(row, style) {
  const card = document.createElement('div');
  if (style) card.classList.add(style);
  if (row.image && row.title) card.prepend(createOptimizedPicture(row.image));
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  cardContent.innerHTML = `<h3><a href="${row.path}">${row.title}</a></h3> <div><a href="${row.path}#disqus_thread" class="count"></a></div>`;
  card.append(cardContent);
  return (card);
}

export default async function decorate(block) {
  block.textContent = '';
  let counter = 0;
  let secondCard = 0;
  // Make a call to get all blog details from the blog index
  const blogList = await getAllBlogs();
  const titleContent = getMetadata('og:title');
  if (blogList.length) {
    blogList.forEach((row) => {
      if (/^\/blog\/[\d\w]/.test(row.path) && titleContent !== row.title) {
        if (counter === 0) {
          const firstCard = document.createElement('div');
          const recentPostsCard = document.createElement('div');
          recentPostsCard.innerHTML = 'Recent Posts';
          const seeAllCard = document.createElement('a');
          seeAllCard.href = '/blog/';
          seeAllCard.innerHTML = 'See All';
          firstCard.appendChild(recentPostsCard);
          firstCard.appendChild(seeAllCard);
          block.append(firstCard);
          secondCard = document.createElement('div');
          secondCard.classList.add('blog-cards-parent');
          block.append(secondCard);
        }
        if (counter < 3) { secondCard.append(createCard(row, 'blog-card')); counter += 1; }
      }
    });
  } else {
    block.remove();
  }
}
