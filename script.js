const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => {
  el.classList.add('show');
});

const scrollers = document.querySelectorAll('.scroller');

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    const scrollerInner = scroller.querySelector('.scroller__inner');
    scroller.setAttribute('data-animated', true);

    const nestedChildMaxWidth = scrollerInner.scrollWidth;
    const computedStyle = getComputedStyle(scrollerInner);
    const gapInPixels = parseInt(computedStyle.gap);

    const elements = scrollerInner.children;

    let totalGapSpace = 0;

    for (let i = 0; i < elements.length - 1; i++) {
      const currentElement = elements[i];
      const nextElement = elements[i + 1];

      const currentElementRect = currentElement.getBoundingClientRect();
      const nextElementRect = nextElement.getBoundingClientRect();

      const spaceBetweenElements =
        nextElementRect.left - (currentElementRect.right + gapInPixels);
      totalGapSpace += spaceBetweenElements;
    }

    const parentMaxWidth = nestedChildMaxWidth + totalGapSpace;

    scroller.style.maxWidth = parentMaxWidth + 'px';
    // scroller.style.maxWidth = 600 + 'px';

    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);

      // this makes it good for screen readers
      duplicatedItem.setAttribute('area-hidden', true);

      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
