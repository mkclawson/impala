export default async function decorate(block) {
  // Select the picture element
  const picture = block.querySelector('picture');
  picture.classList.add('parallax-image');

  // Main parallax effect
  window.addEventListener('scroll', () => {
    const parallaxImage = document.querySelector('.parallax-image');
    const defaultContent = document.querySelector('.default-content-wrapper');
    const footer = document.querySelector('.footer-wrapper');
    const elementScrollY = window.scrollY;

    // Adjust the depth and direction of the image movement (slower)
    const imageMovement = -elementScrollY * 0.08; // Multiply by -1 to move the image upward

    // Adjust the depth and direction of the text movement (faster)
    const textMovement = -elementScrollY * 0.3; // Multiply by -1 to move the text upward faster

    // Calculate the depth and direction of the footer movement (even faster)
    const footerMovement = -elementScrollY * 0.3;

    parallaxImage.style.transform = `translate3d(0, ${imageMovement}px, 0)`;
    defaultContent.style.transform = `translate3d(0, ${textMovement}px, 0)`;
    footer.style.transform = `translate3d(0, ${footerMovement}px, 0)`;
  });
}
