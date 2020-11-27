const anchors = [...document.querySelectorAll('a[href*="#"]')];

document.addEventListener('click', e => {
    if (anchors.includes(e.target.closest('a'))) {
        e.preventDefault();
        const blockID = e.target.closest('a').getAttribute('href').substr(1);
        const targetEl = document.getElementById(blockID);

        if (targetEl) {
            targetEl.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});