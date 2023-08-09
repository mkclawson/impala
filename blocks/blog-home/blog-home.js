import { getAllBlogs } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function createCard(row, style) {
  const card = document.createElement('div');
  if (style) card.classList.add(style);
  console.log(row.title);
  if (row.image && row.title) card.prepend(createOptimizedPicture(row.image));
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  const author = document.createElement('div');
  author.classList.add('blog-author');
  if (row.author && row.author !== '0') author.innerHTML += `${row.author}`;
  const publishnread = document.createElement('div');
  author.classList.add('blog-publishnread');
  if (row.published && row.published !== '0') publishnread.innerHTML += `${row.published}`;
  if (row.readtime && row.readtime !== '0') publishnread.innerHTML += ` ${row.readtime}`;
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
    blogList.forEach((row) => {
      if (/^\/blog\/[\d\w]/.test(row.path)) {
        block.append(createCard(row, 'blog-card'));
      }
    });
  } else {
    block.remove();
  }
}
