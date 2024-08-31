//smooth scrolling
// (for smooth scrolling we need:1. loco scroll js (locomotive js github)
//2.attach locomotive scroll min js and some code from loco github for js)

//gsap
//(1. attach gsap)
//scroll trigger
//ye hum locomotive js se copy kiye hai hume smooth js chahihye usme se toh sirf whi copy karenge
var timeout;
const scroll = new LocomotiveScroll({
  //el ka matlab top level element
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

// now when we move mouse then minicircle get skew(chapta) sometime maximum sometime minimum
  //when mouse move then skew value increse and when mouse stop make skew 0 
  

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
  //.8 is minimum difference whereas 1.2 is maximum isse jyada ya kam chapta nhi hoga
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    //clamp humara map kar dega .8 se choti value ko .8 par aur 1.2 se badi value ko 1.2 par
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai,
// jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo,
// move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

 document.querySelectorAll(".elem").forEach(function (elem) {
   var rotate = 0;
   var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});