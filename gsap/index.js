gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".side-scrolling-wrapper .container .panel");

gsap.to(".side-scrolling-wrapper section", {
    xPercent: -100 * (sections.length - 3),
    scrollTrigger: {
        trigger: ".side-scrolling-wrapper",
        pin: true,
        start: "top top",
        scrub: 1,
        end: () => "+=" + (document.querySelector(".wrap1 .container").offsetWidth / 5)
    }
});

gsap.to(".side-scrolling-wrapper2 section", {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".side-scrolling-wrapper2",
      pin: true,
      start: "top +=10px",
      scrub: 1,
      end: () => "+=" + (document.querySelector(".container").offsetWidth / 5)
    }
});
  
const container = document.querySelector(".wrap1 .container").offsetWidth / 5;
console.log("container : " + container);
console.log("xPercent : " + -100 * (sections.length - 1));
window.addEventListener('scroll', () => { 
    let y = window.scrollY;
    console.log(y);
})