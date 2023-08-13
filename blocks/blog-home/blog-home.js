import { getAllBlogs } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function createCard(row, style) {
  const card = document.createElement('div');
  if (style) card.classList.add(style);
  if (row.image && row.title) card.prepend(createOptimizedPicture(row.image));
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
  if (row.description) cardContent.innerHTML += `<p>${row.description}</p>`;
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
    sortBl.forEach((row) => {
      if (/^\/blog\/[\d\w]/.test(row.path)) {
        block.append(createCard(row, 'blog-card'));
      }
    });
  } else {
    block.remove();
  }
}
