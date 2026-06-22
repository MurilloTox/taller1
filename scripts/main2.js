'use strict';

// Plantilla para cada canción:
let card_song = `<article class="song-card">
    <div class="cover">
        <img src="https://i.ytimg.com/vi/V9PVRfjEBTI/maxresdefault.jpg"
            alt="Portada: Billie Eilish - BIRDS OF A FEATHER (Official Music Video)">
        <span class="badge">3:51:00</span>
    </div>
    <div class="content">
        <h2 class="title">Billie Eilish - BIRDS OF A FEATHER (Official Music Video)</h2>
        <div class="meta">558,329,099 vistas</div>
        <div class="footer">
            <span class="channel">Canal: <a href="https://www.youtube.com/channel/UCDGmojLIoWpXok597xYo8cg"
                    target="_blank" rel="noopener noreferrer">Billie Eilish</a></span>
        </div>
    </div>
</article>`

// Formateador de números
let formatter = new Intl.NumberFormat('en-US');

// Ejemplo de uso:
// let views_witoutformat = 2536628;


// let views_withformat= formatter.format(views_witoutformat); 
// Valor de views_withformat: "2,536,628"

/*
Utilice una función de invocación inmediata (cuando el documento esté completamente cargado en el navegador) que llame a la función con la carga asincrónica de datos.
Cree una función flecha, que:
Haga un requerimiento asincrónico a la URL: https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Youtube/only_songs.json Links to an external site..
En caso de éxito:
Utilice solo las 12 primeras canciones.
Renderice los valores de las entradas: thumbnail, title, duration_string, view_count, channel y channel_url en la variable card_song.
Utilice el Intl.NumberFormat para dar el formato al valor de la entrada view_count.
Cargue los datos de las canciones en el elemento HTML con la clase songs-grid.
En caso de error, muestre un cuadro de diálogo emergente con el mensaje de error.
*/

(function () {
  document.addEventListener("DOMContentLoaded", loadSongs);
})();

const loadSongs = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Youtube/only_songs.json"
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    const songs = await response.json();
    const primerasCanciones12 = songs.slice(0, 12);

    const songsGrid = document.querySelector(".songs-grid");
    songsGrid.innerHTML = "";

    const numberFormatter = new Intl.NumberFormat("es-ES");

    primerasCanciones12.forEach((song) => {
      const { thumbnail, title, duration_string, view_count, channel, channel_url } = song;

      const formattedViews = numberFormatter.format(view_count);

      const card_song = `
        <article class="song-card">
          <img class="song-card__thumbnail" src="${thumbnail}" alt="${title}">
          <div class="song-card__info">
            <h3 class="song-card__title">${title}</h3>
            <p class="song-card__duration">Duración: ${duration_string}</p>
            <p class="song-card__views">${formattedViews} vistas</p>
            <a class="song-card__channel" href="${channel_url}" target="_blank" rel="noopener noreferrer">${channel}</a>
          </div>
        </article>
      `;
      songsGrid.insertAdjacentHTML("beforeend", card_song);
    });
  } catch (error) {
    alert(`Ha ocurrido un error al cargar las canciones: ${error.message}`);
  }
};
