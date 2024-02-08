export const accordion = () => {
  const travelItem = document.querySelectorAll('.travel__item');
  const travelItemTitle = document.querySelectorAll('.travel__item-title');
  const travelItemTextWrapper = document.
    querySelectorAll('.travel__item-text-wrapper');

  let heightTravelItemTextWrapper = 0;
  /* устанавливаем максимальную высоту и добавляем высоту активному элементу
   * что бы небыло первого скачка
   */
  travelItemTextWrapper.forEach((elem, index) => {
    if (travelItem[index].classList.contains('travel__item_active')) {
      elem.style.height = `${elem.scrollHeight}px`;
    }
    if (heightTravelItemTextWrapper < elem.scrollHeight) {
      heightTravelItemTextWrapper = elem.scrollHeight;
    }
  });

  travelItemTitle.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      for (let i = 0; i < travelItem.length; i++) {
        if (i === index) {
          travelItemTextWrapper[i].style.height = travelItem[i].
            classList.contains('travel__item_active') ? '' :
              `${heightTravelItemTextWrapper}px`;
          travelItem[i].classList.toggle('travel__item_active');
        } else {
          travelItemTextWrapper[i].style.height = '';
          travelItem[i].classList.remove('travel__item_active');
        }
      }
    });
  });
};
