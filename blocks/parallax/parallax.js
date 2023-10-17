function parallax(block, multiplier = 0.4) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    /* The number of pixels subtracted here should match the negative
     * number of pixels in the CSS line 13 to avoid a jump upon scrolling */
    block.style.backgroundPositionY = `${offset * multiplier - 150}px`;
  });
}

export default async function decorate(block) {
  // Select the parallax-wrapper div
  //const parallaxDiv = document.querySelector('.parallax-wrapper');
  // Write the parallax-wrapper div to the console
  // console.log(parallaxDiv);
  // Select the picture element in parallaDiv
  //const picture = parallaxDiv.querySelector('picture');
  // Wtite picture to the console
  // console.log(picture);
  // Select the img element in picture
  // const img = picture.querySelector('img');
  // Write img to the console
  // console.log(img);
  // Select the current source element in picture
  //const imgSource = picture.querySelector('img').currentSrc;
  // Write imgSource to the console
  // console.log(imgSource);
  // Create a new div called parallaxBackground
  //const parallaxBackground = document.createElement('div');
  // add the parallaxBackground div to the parallax-wrapper div
  //parallaxDiv.appendChild(parallaxBackground);
  // Set the background image of the body to the imgSource
  //parallaxBackground.style.backgroundImage = `url(${imgSource})`;
  const columns = [...block.children];
  const images = columns[0].querySelectorAll(':scope > div');
  const [desktopImage] = images[0].querySelector('img').src.split('?');
  let multiplier = 0.4;
  // TODO: finish mobile image or delete
  let mobileImage;
  if (images.length > 1) {
    [mobileImage] = images[1].querySelector('img').src.split('?');
  }

  const parallaxBlock = document.createElement('div');
  parallaxBlock.classList.add('parallax-background');
  parallaxBlock.append(columns[0].querySelector(':scope > div'));

  parallaxBlock.style.backgroundImage = `url(${desktopImage})`;
  if (window.innerWidth < 900) {
    parallaxBlock.style.backgroundImage = `url(${mobileImage})`;
    multiplier = 0.2;
  }

  block.textContent = '';
  block.append(parallaxBlock);
  parallax(parallaxBlock, multiplier);
}
