export default async function decorate(block) {
  // Select the parallax-wrapper div
  // const parallaxDiv = document.querySelector('.parallax-wrapper');
  // Write the parallax-wrapper div to the console
  // console.log(parallaxDiv);
  // Select the picture element in parallaDiv
  // const picture = parallaxDiv.querySelector('picture');
  // Wtite picture to the console
  // console.log(picture);
  // remove the parent element of picture
  // picture.parentElement.remove();
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
  // Select the picture element
  const picture = block.querySelector('picture');
  // Hide the picture element
  picture.style.display = 'none';
  const columns = [...block.children];
  const images = columns[0].querySelectorAll(':scope > div');
  const [desktopImage] = images[0].querySelector('img').src.split('?');
  const parallaxBlock = document.createElement('div');
  parallaxBlock.classList.add('parallax-background');
  parallaxBlock.append(columns[0].querySelector(':scope > div'));
  parallaxBlock.style.backgroundImage = `url(${desktopImage})`;
  // document.style.backgroundImage = `url(${desktopImage})`;
  block.append(parallaxBlock);
}
