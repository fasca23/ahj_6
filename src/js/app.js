import updateLocalStorage from './updateLocal';
import boardFromLocal from './boardFromLocal';
import taskPosition from './taskPosition';

function run() {
  const columnsContainer = document.querySelector('.board');
  // Привязываемся к любому нажатию на доску
  columnsContainer.addEventListener('click', (e) => {
    const clickTarget = e.target;
    const column = clickTarget.closest('.column');
    const addCardLink = column.querySelector('.add-card-link');
    const columnCardsList = column.querySelector('.column-cards');
    const addCardSection = column.querySelector('.add-card-section');
    const textarea = column.querySelector('.textarea');
    const addCardButton = column.querySelector('.add-card-button');
    const cancelCardButton = column.querySelector('.cancel-card-button');
    // Нажатие на добавление новой карточки
    if (clickTarget === addCardLink) {
      addCardSection.classList.remove('visually-hidden');
      // Если нажимаем на создание карточки
      addCardButton.addEventListener('click', () => {
        const cardContent = textarea.value.trim();
        // Если чего напечатали
        if (cardContent) {
          const cardId = Math.floor(Math.random() * 1000000);
          const cardTemplate = `
              <div class="card" draggable="true" data-card-id="${cardId}">
              <button type="button" class="delete-card-button">&#x2715;</button>
                <p class="card-text">${cardContent}</p>
              </div>
            `;
          columnCardsList.insertAdjacentHTML('beforeend', cardTemplate);
          updateLocalStorage();
          textarea.value = '';
          addCardSection.classList.add('visually-hidden');
        }
      });
      // Если нажали крест и не добавляем карточку
      cancelCardButton.addEventListener('click', () => {
        textarea.value = '';
        addCardSection.classList.add('visually-hidden');
      });
    }
    // Нажатие на удаление карточки
    const deleteCardButtons = column.querySelectorAll('.delete-card-button');
    deleteCardButtons.forEach((button) => {
      if (clickTarget === button) {
        const card = button.closest('.card');
        card.remove();
        updateLocalStorage();
      }
    });
  });
  // начинаем тянуть карточку
  let actualElement;
  columnsContainer.addEventListener('dragstart', (e) => {
    actualElement = e.target;
    actualElement.classList.add('is-dragging');
    const droppables = document.querySelectorAll('.column-cards');
    droppables.forEach((zone) => {
      zone.addEventListener('dragover', (el) => {
        el.preventDefault();
        const bottomCard = taskPosition(zone, el.clientY);
        const curCard = document.querySelector('.is-dragging');
        if (!bottomCard) {
          zone.appendChild(curCard);
        } else {
          zone.insertBefore(curCard, bottomCard);
        }
        updateLocalStorage();
      });
    });
  });
  // заканчиваем тянуть карточку
  columnsContainer.addEventListener('dragend', () => {
    actualElement.classList.remove('is-dragging');
  });
}

boardFromLocal();
run();
