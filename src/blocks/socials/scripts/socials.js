const socialsEl = document.querySelector('.socials');
const btnEl = document.querySelector('.socials__show-btn');

btnEl.addEventListener('click', () => {
    socialsEl.classList.toggle('socials--show');
});