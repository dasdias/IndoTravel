export const createModal = (title, description, round = false) => {
  const modalWrap = document.createElement('div');
  modalWrap.classList.add('modal-wrap');
  modalWrap.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
  `;
  const modal = document.createElement('div');
  modal.classList.add('.modal-body');
  modal.style.cssText = `
    background-color: #ebebeb;
    max-width: 500px;
    width: 100%;
    padding: 30px 20px;
    border-radius: 10px;
    text-align: center;
  `;
  const titleElem = document.createElement('h2');
  titleElem.style.cssText = `
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 25px;
  `;
  titleElem.innerHTML = title;
  const descElem = document.createElement('p');
  descElem.style.cssText = `
    margin-bottom: 25px;
  `;
  descElem.textContent = description;


  modal.append(titleElem, descElem);

  if (round) {
    const roundElem = document.createElement('div');
    roundElem.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #2aff81;
    width: 50px;
    height: 50px;
    margin: 0 auto;
  `;

    const checkbox = document.createElement('div');
    checkbox.style.cssText = `
    background: #ffffff;
    clip-path: polygon(45% 64%, 84% 14%, 100% 28%, 47% 100%, 0 49%, 15% 32%);
    width: 20px;
    height: 20px;
  `;

    roundElem.append(checkbox);

    modal.append(roundElem);
  }
  modalWrap.append(modal);
  return {modalWrap, modal};
};
