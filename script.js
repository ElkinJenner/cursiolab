document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.querySelector('.video-title');
    const videoListItems = document.querySelectorAll('#videoList li');
    let currentVideoIndex = 0;

    // Función para cambiar y reproducir el video activo
    function playVideo(videoUrl, videoName) {
        if (!videoPlayer) return;
        videoPlayer.src = videoUrl;
        if (videoTitle) {
            videoTitle.textContent = videoName;
        }
        videoPlayer.play().catch(error => {
            console.log("Autoplay interact blocked:", error);
        });
    }

    // Avanzar al siguiente video automáticamente
    function playNextVideo() {
        if (!videoListItems.length) return;
        currentVideoIndex = (currentVideoIndex + 1) % videoListItems.length;
        const nextItem = videoListItems[currentVideoIndex];
        const videoUrl = nextItem.getAttribute('data-video');
        const videoName = nextItem.querySelector('span')?.textContent || nextItem.textContent;

        updateActiveListItem(nextItem);
        playVideo(videoUrl, videoName);
    }

    // Actualizar clase activa en la lista
    function updateActiveListItem(targetItem) {
        videoListItems.forEach(item => {
            item.classList.remove('active');
            const icon = item.querySelector('.play-icon');
            if (icon) {
                icon.src = 'assets/icons/classes_icon.png';
            }
        });

        targetItem.classList.add('active');
        const activeIcon = targetItem.querySelector('.play-icon');
        if (activeIcon) {
            activeIcon.src = 'assets/icons/classes_icon.png';
        }
    }

    // Listener de clic a cada item de la playlist
    videoListItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentVideoIndex = index;
            const videoUrl = this.getAttribute('data-video');
            const videoName = this.querySelector('span')?.textContent || this.textContent;

            updateActiveListItem(this);
            playVideo(videoUrl, videoName);
        });
    });

    // Auto-reproducir siguiente cuando finalice la clase actual
    if (videoPlayer) {
        videoPlayer.addEventListener('ended', playNextVideo);
    }

    // Toggle de Modo Oscuro / Claro alternando entre darkmode_icon.png y lightmode_icon.png
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.src = 'assets/icons/lightmode_icon.png';
            } else {
                themeIcon.src = 'assets/icons/darkmode_icon.png';
            }
        });
    }
});