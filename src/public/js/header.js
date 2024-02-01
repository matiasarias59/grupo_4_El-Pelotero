const header = document.getElementsByTagName('header');
const menuIcon = document.querySelector('.menu_icon');
const navBarMobile = document.querySelector('.main_nav-bar_mobile');

const headerHeight = header[0].clientHeight;
header[0].style.height = `${header[0].clientHeight - navBarMobile.clientHeight}px`;
let menuIsActive = false;
const handleMenuIconClick = (e) => {
  e.stopPropagation();
  menuIsActive = !menuIsActive;
  menuIcon.classList.toggle('active');
  menuIcon.firstElementChild.classList.toggle('fa-bars');
  menuIcon.firstElementChild.classList.toggle('fa-x');
  navBarMobile.classList.toggle('active');

  if (header[0].clientHeight != headerHeight) {
    header[0].style.height = `${headerHeight}px`;
  } else {
    header[0].style.height = `${header[0].clientHeight + navBarMobile.clientHeight}px`;
  }

};

menuIcon.addEventListener('click', (e) => handleMenuIconClick(e));

window.onresize = (e) => {
  if (window.innerWidth > 768 && menuIsActive) {
    handleMenuIconClick(e);
  }
};
