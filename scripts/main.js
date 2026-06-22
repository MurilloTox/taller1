'use strict';

// Formateador de números
const formatter = new Intl.NumberFormat('en-US');

// Función de invocación inmediata: se ejecuta cuando el documento está
// completamente cargado en el navegador, y llama a la función con la
// carga asincrónica de datos.
(function () {
  document.addEventListener('DOMContentLoaded', loadSongs);
})();

// Función flecha asincrónica que obtiene y renderiza las canciones
const loadSongs = async () => {
    try {
        const response = await fetch(
        'https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Youtube/only_songs.json'
        );

        if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const songs = await response.json();
        const firstTwelveSongs = songs.slice(0, 12);

        const songsGrid = document.querySelector('.songs-grid');
        songsGrid.innerHTML = '';

        firstTwelveSongs.forEach((song) => {
            const { thumbnail, title, duration_string, view_count, channel, channel_url } = song;

            const views_withformat = formatter.format(view_count);

            // Plantilla para cada canción:
            const card_song = `<article class="song-card">
                <div class="cover">
                    <img src="${thumbnail}"
                        alt="Portada: ${title}">
                    <span class="badge">${duration_string}</span>
                </div>
                <div class="content">
                    <h2 class="title">${title}</h2>
                    <div class="meta">${views_withformat} vistas</div>
                    <div class="footer">
                        <span class="channel">Canal: <a href="${channel_url}"
                                target="_blank" rel="noopener noreferrer">${channel}</a></span>
                    </div>
                </div>
            </article>`;

        songsGrid.insertAdjacentHTML('beforeend', card_song);
        });
    } catch (error) {
        alert(`Ha ocurrido un error al cargar las canciones: ${error.message}`);
    }
};