const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    });
  });
}

const filters = document.querySelectorAll(".filter-button");
const projects = document.querySelectorAll(".project-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;
    filters.forEach((button) => {
      const active = button === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    projects.forEach((project) => {
      const categories = project.dataset.category.split(" ");
      project.hidden = selected !== "all" && !categories.includes(selected);
    });
  });
});

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const thumbnails = [...gallery.querySelectorAll(".shot-thumb")];
  const mainImage = gallery.querySelector("[data-gallery-main]");
  const openLink = gallery.querySelector("[data-gallery-open]");
  const stepLabel = gallery.querySelector("[data-gallery-step]");
  const imageLabel = gallery.querySelector("[data-gallery-label]");
  let activeIndex = 0;

  if (!thumbnails.length || !mainImage) return;

  const showImage = (index) => {
    activeIndex = (index + thumbnails.length) % thumbnails.length;
    const selected = thumbnails[activeIndex];
    const imagePath = selected.dataset.gallerySrc;
    mainImage.src = imagePath;
    mainImage.alt = selected.dataset.galleryAlt;
    if (openLink) openLink.href = imagePath;
    if (stepLabel) stepLabel.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(thumbnails.length).padStart(2, "0")}`;
    if (imageLabel) imageLabel.textContent = selected.dataset.galleryLabel;
    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      const isActive = thumbnailIndex === activeIndex;
      thumbnail.classList.toggle("is-active", isActive);
      if (isActive) thumbnail.setAttribute("aria-current", "true");
      else thumbnail.removeAttribute("aria-current");
    });
  };

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => showImage(index));
  });
  gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => showImage(activeIndex - 1));
  gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => showImage(activeIndex + 1));
});
