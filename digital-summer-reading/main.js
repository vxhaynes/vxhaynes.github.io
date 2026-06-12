document.querySelectorAll(".cover-wrap img").forEach((image) => {
  const markMissing = () => image.closest(".cover-wrap")?.classList.add("cover-missing");

  if (image.complete && image.naturalWidth === 0) {
    markMissing();
  }

  image.addEventListener("error", markMissing);
});
