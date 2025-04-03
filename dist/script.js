"use script";

// Make mobile navigation work
var btnNavEL = document.querySelector(".btn-mobile");
var headerEl = document.querySelector(".header");
var hero = document.querySelector(".section-hero");
btnNavEL.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  hero.classList.toggle("sticky-margin");
});

// cards style

var cards = document.querySelectorAll(".service-card");
cards.forEach(function (card) {
  var cardTitle = card.querySelector(".service-name");
  var cardIcon = card.querySelector(".service-icon");
  var cardescription = card.querySelector(".service-description");
  card.addEventListener("mouseover", function () {
    card.style.backgroundColor = "#006EE6";
    cardTitle.style.color = "#fff";
    cardIcon.style.backgroundColor = "#fcc419";
    cardescription.style.color = "#F8F9FA";
  });
  card.addEventListener("mouseout", function () {
    card.style.backgroundColor = "#fff"; // Reset to default background color
    cardTitle.style.color = "#222"; // Reset to default text color
    cardIcon.style.backgroundColor = "#1d21f9";
    cardescription.style.color = "#555";
  });
});

// skills hover effect

var skills = document.querySelectorAll(".skill");
var skillIcon = document.querySelectorAll(".skill-icon");
skills.forEach(function (skill) {
  var skillIcon = skill.querySelector(".skill-icon");
  skill.addEventListener("mouseover", function () {
    skillIcon.style.boxShadow = "0 0rem 2rem rgba(0, 111, 230, 0.1)";
  });
  skill.addEventListener("mouseout", function () {
    skillIcon.style.boxShadow = "0 1rem 2rem rgba(0, 111, 230, 0.074)";
  });
});

// certificate link
var certificateLink = document.querySelectorAll(".link");
certificateLink.forEach(function (link) {
  link.addEventListener("mouseover", function () {
    link.textContent = "→ See certificate";
  });
  link.addEventListener("mouseout", function () {
    link.textContent = "See certificate →";
  });
});

// -----------------------------------------------------------------------------
//sticky navigation
// -----------------------------------------------------------------------------

var sectionHero = document.querySelector(".section-hero");
var obs = new IntersectionObserver(
  function (entries) {
    var ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHero);

// -----------------------------------------------------------------------------
//SMOTH SCROLL ANIMATION #SAFARI
// -----------------------------------------------------------------------------
var allLinks = document.querySelectorAll(".header a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    headerEl.classList.remove("nav-open");
    hero.classList.remove("sticky-margin");

    var href = link.getAttribute("href");
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    if (href !== "#" && href.startsWith("#")) {
      var section = document.querySelector(href);
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";
  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));
  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);
  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

//---------------------------------
// animation ----------------------
//---------------------------------

function isElementInViewport(element) {
  var elementOffset = element.getBoundingClientRect();
  var windowHeight = window.innerHeight;
  return elementOffset.top < windowHeight && elementOffset.bottom >= 0;
}
function animateFromRight() {
  var elements = document.querySelectorAll(".animate-from-right");
  elements.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.style.opacity = "1";
      element.style.transform = "translateX(0)";
    } else {
      element.style.opacity = "0";
      element.style.transform = "translateX(20rem)"; // Set the initial animated position
    }
  });
}

function animateFromLeft() {
  var elements = document.querySelectorAll(".animate-from-left");
  elements.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.style.opacity = "1";
      element.style.transform = "translateX(0)";
    } else {
      element.style.opacity = "0";
      element.style.transform = "translateX(-20rem)"; // Set the initial animated position
    }
  });
}

function animateFromBottom() {
  var elements = document.querySelectorAll(".animate-from-bottom");
  elements.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    } else {
      element.style.opacity = "0";
      element.style.transform = "translateY(10rem)"; // Set the initial animated position
    }
  });
}

function handleScroll() {
  animateFromRight();
  animateFromLeft();
  animateFromBottom(); // Call the new animation function for elements from the bottom
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);

// Call the animation functions once when the page loads to set initial states
handleScroll();
