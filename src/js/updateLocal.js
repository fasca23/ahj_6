// Работа с LocalStorage

export default function updateLocalStorage() {
  const columns = document.querySelectorAll('.column');
  const boardState = [];
  columns.forEach((column) => {
    const { columnId } = column.dataset;
    const columnTitle = column.querySelector('h2').textContent.trim();
    const cards = [];
    column.querySelectorAll('.card').forEach((card) => {
      const { cardId } = card.dataset;
      const cardContent = card.querySelector('p').textContent.trim();
      cards.push({
        id: cardId,
        content: cardContent,
      });
    });
    boardState.push({
      id: columnId,
      title: columnTitle,
      cards,
    });
  });
  localStorage.setItem('boardState', JSON.stringify(boardState));
}
