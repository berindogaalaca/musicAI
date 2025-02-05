function handleFooterIcons() {
  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");
  const icons = document.querySelectorAll("footer a[data-page]");

  icons.forEach((icon) => {
    const paths = icon.querySelectorAll("svg path");
    const isCurrentPage = icon.dataset.page === currentPage;

    paths.forEach((path) => {
      path.setAttribute("fill-opacity", isCurrentPage ? "1" : "0.4");
      if (isCurrentPage) {
        path.setAttribute("fill", "#A099FF");
      } else {
        path.setAttribute("fill", "white");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", handleFooterIcons);
