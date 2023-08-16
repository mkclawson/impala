import { getAllBlogs } from '../../scripts/scripts.js';
import { createOptimizedPicture, getMetadata } from '../../scripts/lib-franklin.js';

function createCard(row, style) {
  const card = document.createElement('div');
  if (style) card.classList.add(style);
  if (row.image && row.title) card.prepend(createOptimizedPicture(row.image));
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  const link = document.createElement('a');
  link.classList.add('blog-link');
  link.href = row.path;
  if (row.title) link.innerHTML = `<h5>${row.title}</h5>`;
  cardContent.append(link);
  card.append(cardContent);
  return (card);
}

export default async function decorate(block) {
  block.textContent = '';
  let counter = 0;
  // Make a call to get all blog details from the blog index
  const blogList = await getAllBlogs();
  const titleContent = getMetadata('og:title');
  if (blogList.length) {
    // eslint-disable-next-line
    const sortBl = blogList.sort((objA, objB) => Number(new Date(objB.published)) - Number(new Date(objA.published)));
    sortBl.forEach((row) => {
      if (/^\/blog\/[\d\w]/.test(row.path) && titleContent !== row.title) {
        if (counter < 3) { block.append(createCard(row, 'blog-card')); counter += 1; }
      }
    });
  } else {
    block.remove();
  }
}
