const searchTypingFunc = () => {
    const searchInput = document.querySelector('.search__input');
    const button = document.querySelector('.search__button');

    searchInput.addEventListener('input', () => {
        if (searchInput.value !== '') {
        searchInput.classList.add('typing');
        searchInput.classList.remove('filled');
        button.classList.add('alt');
        } else {
        searchInput.classList.remove('typing');
        }
    });

    searchInput.addEventListener('blur', () => {
        if (searchInput.value !== '') {
        searchInput.classList.add('filled');
        } else {
        searchInput.classList.remove('filled');
        }
    });
};



searchTypingFunc();

  