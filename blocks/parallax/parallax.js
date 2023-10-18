export default async function decorate(block) {
  // Select the picture element
  const picture = block.querySelector('picture');
  // Hide the picture element
  picture.style.display = 'none';
  const columns = [...block.children];
  const images = columns[0].querySelectorAll(':scope > div');
  const [desktopImage] = images[0].querySelector('img').src.split('?');
  const parallaxBlock = document.createElement('div');
  parallaxBlock.classList.add('parallax-background');
  // parallaxBlock.append(columns[0].querySelector(':scope > div'));
  parallaxBlock.style.backgroundImage = `url(${desktopImage})`;
  // document.style.backgroundImage = `url(${desktopImage})`;
  block.append(parallaxBlock);
}
