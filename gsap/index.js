// gsap.registerPlugin(ScrollTrigger);

// let sections = gsap.utils.toArray(".side-scrolling-wrapper .container .panel");

// gsap.to(".side-scrolling-wrapper section", {
//     xPercent: -100 * (sections.length - 3),
//     scrollTrigger: {
//         trigger: ".side-scrolling-wrapper",
//         pin: true,
//         markers: true,
//         start: "top top",
//         scrub: 1,
//         end: () => "+=" + (document.querySelector(".wrap1 .container").offsetWidth / 5)
//     }
// });

// gsap.to(".side-scrolling-wrapper2 section", {
//     xPercent: -100 * (sections.length - 1),
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".side-scrolling-wrapper2",
//       pin: true,
//       start: "top +=10px",
//       scrub: 1,
//       end: () => "+=" + (document.querySelector(".container").offsetWidth / 5)
//     }
// });
  
// const container = document.querySelector(".wrap1 .container").offsetWidth / 5;
// console.log("container : " + container);
// console.log("xPercent : " + -100 * (sections.length - 1));
// window.addEventListener('scroll', () => { 
//     let y = window.scrollY;
//     console.log(y);
// })

/* --------test1-------- */
//fork from akapowl https://codepen.io/akapowl/pen/qBXOMme/5351d83e2b4241bfe3407ef6113e1f51

gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".horizontal__item");
const sections2 = gsap.utils.toArray(".slide__item");
let maxWidth = 0;

const getMaxWidth = () => {
  maxWidth = 0;
  sections.forEach(section => {
    maxWidth += section.offsetWidth;
    maxWidth += gsap.getProperty(section, 'marginLeft');
  });  
  
  maxWidth += gsap.getProperty('.horizontal', 'paddingLeft')
  maxWidth += gsap.getProperty('.horizontal__list', 'paddingLeft');
  // after the calculations above the right side of the last image  should be flush against the right side of the window
  // but with the scrollbar sitting on top of it, so you might want to add some space
  // if you want the white margin/padding to be visible
  maxWidth += 150
  
  return maxWidth;
};
const getMaxWidth2 = () => {
  maxWidth = 0;
  sections2.forEach(section2 => {
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

gsap.set('.section1.spacer', { minHeight: window.innerHeight - document.querySelector('.horizontal').offsetHeight });
gsap.set('.section2.spacer', { minHeight: window.innerHeight - document.querySelector('.slide').offsetHeight });

gsap.to(sections, {
  x: () => `-${maxWidth - window.innerWidth}`,
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal",
    pin: '.wrapper',
    scrub: 0.5,
    markers: true,
    end: () => `+=${maxWidth}`,
    invalidateOnRefresh: true } });



sections.forEach((sct, i) => {
  ScrollTrigger.create({
    trigger: sct,
    start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
    end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
    toggleClass: { targets: sct, className: "active" } });

});

gsap.to(sections2, {
  x: () => `-${maxWidth - window.innerWidth}`,
  ease: "none",
  scrollTrigger: {
    trigger: ".slide",
    pin: '.contents',
    scrub: 0.5,
    markers: true,
    end: () => `+=${maxWidth}`,
    invalidateOnRefresh: true } });

sections.forEach((sct, i) => {
  ScrollTrigger.create({
    trigger: sct,
    start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
    end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
    toggleClass: { targets: sct, className: "active" } });

});