const mediaDBUrl =
  "https://essagallery.netlify.app/.netlify/functions/getall/1264214979981213827";
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
  gallerySect.classList.remove("grid");
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

// Hero Section
const heroSection = document.querySelector('.hero');

async function getRandomImages() {
  try {
    const req = await fetch(mediaDBUrl);
    const res = await req.json();
    const medias = res.data.filter(media => media.type === 'image');
    
    let currentIndex = 0;
    function changeBackground() {
      const media = medias[currentIndex];
      heroSection.style.backgroundImage = `url(${media.url})`;
      currentIndex = (currentIndex + 1) % medias.length; // loop back to first image
    }

    // Change background every 15 seconds
    changeBackground();
    setInterval(changeBackground, 5000); // 15000ms = 15 seconds
  } catch (err) {
    console.error('Error fetching images:', err);
  }
}

getRandomImages();
