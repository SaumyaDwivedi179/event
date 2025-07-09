import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Convert children to <ul><li>
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });

  // Replace images with optimized pictures
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(
    createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
  ));

  // Clear and append new content
  block.textContent = '';
  block.append(ul);

  // Filter logic
  const filterContainer = document.querySelector('.filter.block');
  const sections = document.querySelectorAll('.cards-container');

  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      const clickedP = e.target.closest('p');
      if (!clickedP || !clickedP.parentElement) return;

      const clickedDiv = clickedP.parentElement;

      // Remove 'active' from all filter divs
      filterContainer.querySelectorAll('div > div').forEach((div) => {
        div.classList.remove('active');
      });

      // Add 'active' class to the clicked div
      clickedDiv.classList.add('active');

      const selected = clickedP.textContent.trim().toLowerCase();

      sections.forEach((section) => {
        const h2 = section.querySelector('h2');
        if (!h2) return;

        const sectionId = h2.id.trim().toLowerCase();

        if (selected === 'all') {
          section.style.display = '';
        } else if (sectionId === selected) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });
    });
  }
}

function waitForFormLoad(selector, callback) {
  const observer = new MutationObserver(() => {
    const formBlock = document.querySelector(selector);
    if (
      formBlock
      && formBlock.getAttribute('data-block-status') === 'loaded'
      && formBlock.querySelector('form')
    ) {
      observer.disconnect();
      callback(formBlock);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function initBookModal() {
  waitForFormLoad('.form.bookform.block', (formBlock) => {
    // Create modal wrapper
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'modal-close';

    closeBtn.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
      formBlock.style.display = 'none';
      document.body.style.overflow = '';
    });

    formBlock.style.display = 'none'; // Hide initially
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(formBlock);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Add event listeners to book buttons
    document.querySelectorAll('a.button[title="book"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.style.display = 'flex';
        formBlock.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });

    // Close when clicking outside modal
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
        formBlock.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
}

initBookModal();
