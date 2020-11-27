export class Player {
    constructor(ytVideoId) {
        this.ytVideoId = ytVideoId;
        this.iframeEl = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${this.ytVideoId}?autoplay=1&color=white&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        this.playerEl = document.querySelector('.video-player');

        this.init();
    }

    init() {
        const listenerFunc = e => {
            if (this.playerEl.contains(e.target)) {
                this.playerEl.innerHTML = this.iframeEl;
                this.playerEl.removeEventListener('click', listenerFunc);
            }
        }

        this.playerEl.addEventListener('click', listenerFunc);
    }
}