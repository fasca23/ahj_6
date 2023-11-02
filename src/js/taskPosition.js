// Определяем позицию при перетаскивании карточки

export default function taskPosition(zone, mouseY) {
  const notActualElements = zone.querySelectorAll('.card:not(.is-dragging)');
  let closestCard = null;
  let closestOffset = Number.NEGATIVE_INFINITY;
  notActualElements.forEach((e) => {
    const { top } = e.getBoundingClientRect();
    const offset = mouseY - top;
    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestCard = e;
    }
  });
  return closestCard;
}
