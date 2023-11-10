import { getAllBlogs } from '../../scripts/scripts.js';
import { createOptimizedPicture, getMetadata } from '../../scripts/lib-franklin.js';

async function getViewsLoves(row) {
  const viewspathname = '/views.json';
  const viewsresp = await fetch(viewspathname);
  const viewsjson = await viewsresp.json();
  const currentUrl = window.location.href;
  //console.log("currentUrl: "+ currentUrl);
  const articleUrl = window.location.protocol + "//" + window.location.host + row.path;
  //console.log("articleUrl: "+ articleUrl);
  const viewline = viewsjson.data.find((view) => view.site === articleUrl);
  let viewsCount = 0;
  if (!viewline) {
    viewsCount = 0;
  } else {
    // Write viewline to the console
    // console.log(viewline);
    // set the variable viewsCount to the value of the key "views" in the viewline variable
    // const views = viewline.views;
    const { views: Count } = viewline;
    viewsCount = Count;
  }

  const lovespathname = '/love.json';
  const lovesresp = await fetch(lovespathname);
  // Get the json from the lovesresp
  const lovesjson = await lovesresp.json();

  // set the variable loveline by parsing the json lovejson
  // for the key "site" with a value of articleUrl
  const loveline = lovesjson.data.find((love) => love.site === articleUrl);
  let lovesCount = 0;
  if (!loveline) {
    lovesCount = 0;
  } else {
    // set the variable lovesCount to the value of the key "loves" in the loveline variable
    // const loves = loveline.loves;
    const { loves: Count } = loveline;
    lovesCount = Count;
  }

  const recentArticle = {};
  recentArticle.views = viewsCount;
  recentArticle.loves = lovesCount;
  //console.log("viewsCount: "+ viewsCount);
  return recentArticle;
}

function createCard(row, style) {
  const card = document.createElement('div');
  if (style) card.classList.add(style);
  if (row.image && row.title) card.prepend(createOptimizedPicture(row.image));
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  getViewsLoves(row).then(
    function(recentArticle) { cardContent.innerHTML = `<h3><a href="${row.path}">${row.title}</a></h3> <div><a href="${row.path}#disqus_thread" class="count"></a><span class="views"><img src="/icons/views.svg"/><label>${recentArticle.views}</label></span><span class="loves-recent"><button class="button">♡</button><label id="loves-recent">${recentArticle.loves}</label></span></div>`;},
    function(error) { cardContent.innerHTML = `<h3><a href="${row.path}">${row.title}</a></h3> <div><a href="${row.path}#disqus_thread" class="count"></a><span class="views"><img src="/icons/views.svg"/><label>0</label></span><span class="loves-recent"><button class="button">♡</button><label id="loves-recent">0</label></span></div>`;}
  );
  //cardContent.innerHTML = `<h3><a href="${row.path}">${row.title}</a></h3> <div><a href="${row.path}#disqus_thread" class="count"></a><span class="views"><img src="/icons/views.svg"/><label>${views}</label></span></div>`;
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
