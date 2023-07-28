export default function decorate(block) {
  [...block.children].forEach((row, r) => {
    if (r === 0) {
      [...row.children].forEach((col) => {
        col.textContent = document.querySelector(`meta[name='${col.textContent}']`).content;
      });
    }
    if (r === 2) {
      console.log(document.querySelector(`meta[name='${[...row.children][0].textContent}']`).content);
      if (document.querySelector(`meta[name='${[...row.children][0].textContent}']`).content) {
        [...row.children][1].textContent = document.querySelector(`meta[name='${[...row.children][0].textContent}']`).content;
      } else { row.remove(); }
    }
  });
}
