const mediaDBUrl =
  "https://essagallery.netlify.app/.netlify/functions/getall/1276406806012493845";
const gallerySect = document.querySelector(".gallery");

async function getMedias() {
  try {
    const req = await fetch(mediaDBUrl);
    const res = await req.json();
    const medias = res.data;
    medias.forEach(displayMedia);
  } catch (err) {
    console.log(err); //under development
  } finally {
    hideMediasLoading();
  }
}
function displayMedia(media) {
  media.type === "image"
    ? (gallerySect.innerHTML += createMedia(media))
    : console.log(media); // under development
}
function createMedia(media) {
  const [url, type, id, uploadDate, author] = [
    media.url,
    media.type,
    media.id,
    new Date(media.uploadDate),
    media.author,
  ];
  return `
  <figure class="media__container" onclick="showInfos('${url}', '${type}', ${id}, '${uploadDate}', '${author}')">
    <img src="${url}">
    <figcaption class="media__button">Show Info</figcaption>
  </figure>`;
}
function hideMediasLoading() {
  const loading = document.querySelector(".gallery__loading");
  loading.style.display = "none";
}
getMedias();

const modal = document.querySelector(".media__modal");
const mediaInfosContainer = document.querySelector(".media-infos");

function showInfos(...mediaInfos) {
  mediaInfosContainer.innerHTML = createInfos(mediaInfos);
  modal.showModal();
}
function createInfos([url, type, id, uploadDate, author]) {
  return `
  <img class="modal__img" src="${url}" />
  <div class="img__info">
    <p><b>Type:</b> ${type}</p>
    <p><b>ID:</b> ${id}</p>
    <p><b>Upload Date:</b> ${uploadDate}</p>
    <p><b>Author:</b> ${author}</p>
  </div>`;
}
function hideFullMedia() {
  modal.close();
}
