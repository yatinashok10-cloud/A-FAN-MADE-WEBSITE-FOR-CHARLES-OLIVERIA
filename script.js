const menuIcon = document.querySelector('#menu-icon');
const navlinks = document.querySelector('.nav-links');

menuIcon.oneclick =() => {
    navlinks.classList.toggle('active');
}