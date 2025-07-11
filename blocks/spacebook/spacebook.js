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
  waitForFormLoad('.form.bookspace.block', (formBlock) => {
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

    formBlock.style.display = 'none';
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(formBlock);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Add event listeners to book buttons
    document.querySelectorAll('a.button[title="Book Now"]').forEach((btn) => {
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
