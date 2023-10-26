export default async function decorate(block) {
  // Select the picture element
  const picture = block.querySelector('picture');
  // Hide the picture element
  picture.style.display = 'none';
  // Get the image source of picture element
  const mobileImage = picture.querySelector('img').src;
  // Write mobileImage to the console
  // console.log(mobileImage);
  const columns = [...block.children];
  const images = columns[0].querySelectorAll(':scope > div');
  const [desktopImage] = images[0].querySelector('img').src.split('?');
  // Write desktopImage to the console
  // console.log(desktopImage);
  const parallaxBlock = document.createElement('div');
  parallaxBlock.classList.add('parallax-background');
  parallaxBlock.style.backgroundImage = `url(${desktopImage})`;
  if (window.innerWidth < 900) {
    parallaxBlock.style.backgroundImage = `url(${mobileImage})`;
  }
  block.append(parallaxBlock);
}
