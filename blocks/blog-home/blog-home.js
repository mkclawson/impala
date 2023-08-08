import { getAllBlogs } from '../../scripts/scripts.js';
// import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  block.textContent = '';
  // Make a call to get all blog details from the blog index
  const blogList = await getAllBlogs();
  console.log(blogList);
  // if (blogList.length) {
  //   blogList.forEach((row) => {
  //   // if (row.category !== '0') {
  //     block.append(createCard(row, 'blog-card'));
  //   // }
  //   });
  // } else {
  //   block.remove();
  // }
}
