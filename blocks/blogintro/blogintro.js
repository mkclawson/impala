export default function decorate(block) {
  [...block.children].forEach((row, r) => {
    if (r === 0) {
      [...row.children].forEach((col) => {
        col.textContent = document.querySelector(`meta[name='${col.textContent}']`).content;
      });
    }
    if (r === 2) {
      const attr = [...row.children][0].textContent.toLowerCase().includes(':') ? [...row.children][0].textContent.toLowerCase().slice(0, -1) : [...row.children][0].textContent.toLowerCase();
      if (document.querySelector(`meta[name='${attr}']`)) {
        [...row.children][1].textContent = document.querySelector(`meta[name='${attr}']`).content;
      } else { row.remove(); }
    }
  });
}
