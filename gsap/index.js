//fork from akapowl https://codepen.io/akapowl/pen/qBXOMme/5351d83e2b4241bfe3407ef6113e1f51

gsap.registerPlugin(ScrollTrigger);

const item = gsap.utils.toArray(".swiper-slide");
const item2 = gsap.utils.toArray(".slide__item");
let maxWidth = 0;

const getMaxWidth = () => {
  maxWidth = 0;
  item.forEach(section => {
    maxWidth += section.offsetWidth;
    maxWidth += gsap.getProperty(section, 'marginLeft');
  });  
  
  maxWidth += gsap.getProperty('.slide-box', 'paddingLeft')
  maxWidth += gsap.getProperty('.swiper-wrapper', 'paddingLeft');
  // after the calculations above the right side of the last image  should be flush against the right side of the window
  // but with the scrollbar sitting on top of it, so you might want to add some space
  // if you want the white margin/padding to be visible
  maxWidth += 150
  
  return maxWidth;
};
const getMaxWidth2 = () => {
  maxWidth = 0;
  item2.forEach(section2 => {
    maxWidth += section2.offsetWidth;
    maxWidth += gsap.getProperty(section2, 'marginLeft');
  });  
  
  maxWidth += gsap.getProperty('.slide', 'paddingLeft')
  maxWidth += gsap.getProperty('.slide__list', 'paddingLeft');
  maxWidth += 150
  
  return maxWidth;
};

getMaxWidth();
getMaxWidth2();
ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

gsap.set('.section1.spacer', { minHeight: window.innerHeight - document.querySelector('.slide-box').offsetHeight });
gsap.set('.section2.spacer', { minHeight: window.innerHeight - document.querySelector('.slide').offsetHeight });

/* 1 */
gsap.to(item, {
  x: () => `-${maxWidth - window.innerWidth}`,
  ease: "none",
  scrollTrigger: {
    trigger: ".slide-box",
    pin: '.wrapper',
    scrub: 0.5,
    markers: true,
    end: () => `+=${maxWidth}`,
    invalidateOnRefresh: true } });



item.forEach((sct, i) => {
  ScrollTrigger.create({
    trigger: sct,
    start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
    end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
    toggleClass: { targets: sct, className: "active" } });

});

/* 2 */
gsap.to(item2, {
  x: () => `-${maxWidth - window.innerWidth}`,
  ease: "none",
  scrollTrigger: {
    trigger: ".slide",
    pin: '.contents',
    scrub: 0.5,
    markers: true,
    end: () => `+=${maxWidth}`,
    invalidateOnRefresh: true } });

item.forEach((sct, i) => {
  ScrollTrigger.create({
    trigger: sct,
    start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
    end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
    toggleClass: { targets: sct, className: "active" } });

});