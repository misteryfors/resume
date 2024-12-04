const sidebarData = {
    contacts: [
        { type: 'Email', icon: 'Icon.svg', details: 'artem.novickov@mail.ru', href: 'mailto:artem.novickov@mail.ru' },
        { type: 'Phone', icon: 'Icon-2.svg', details: '+7 915 939 25 15', href: 'tel:+79159392515' },
        { type: 'Address', icon: 'Icon-3.svg', details: 'Nizni Novgorod, Russia', href: '#' }
    ],
    social: [
        { type: 'Вконтакте', icon: 'vk-line.svg', details: '@id152716600', href: 'https://vk.com/id152716600' },
        { type: 'Telegram', icon: 'telegram-2-line.svg', details: '@mistfors', href: 'https://t.me/mistfors' },
        { type: 'Discord', icon: 'discord-fill.svg', details: 'mistfors#9294', href: '#' }
    ],
    lang: [
        { type: 'Русский', icon: 'earth-line.svg', details: 'Носитель', href: '' },
        { type: 'Английский', icon: 'earth-line.svg', details: 'Базовый', href: '' }
    ]
};

function generateSidebarList(sidebarSection, data) {
    const List=sidebarSection.querySelector('.sidebar__list')
    List.innerHTML = `
            ${data.map(item => `
                <li class="sidebar__item">
                    <a href="${item.href}" class="sidebar__link">
                        <img src="${"src/public/"+item.icon}" alt="${item.type}" class="sidebar__icon">
                        <p class="sidebar__text">
                            <span class="sidebar__name">${item.type}</span>
                            <span class="sidebar__details">${item.details}</span>
                        </p>
                    </a>
                </li>
            `).join('')}
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const sidebarSections = document.querySelectorAll('.sidebar__section');
    generateSidebarList(sidebarSections[0], sidebarData.contacts);
    generateSidebarList(sidebarSections[1], sidebarData.social);
    //generateSidebarList(sidebarSections[2], sidebarData.lang);
});

document.querySelectorAll('.sidebar__toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        this.parentElement.classList.toggle('open');
    });
});
