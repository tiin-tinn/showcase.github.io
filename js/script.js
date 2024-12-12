document.addEventListener("DOMContentLoaded", () => {
  // Register plugins and animate elements
  gsap.registerPlugin(ScrollTrigger)
  animateSections()

  // Setup navigation and closure behaviors
  setupNavigation()
  setupClosePopupOnInteraction()
})

function animateSections() {
  // Setup animations for various sections
  animateSection("#about .animate-text", "#about", 60, 10)
  animateSection("#courses p, #courses .subheader", "#courses", 60, 10)
  animateSection("#projects .animate-text", "#projects", 60, 5)
  animateSection("#gmap .animate-text", "#gmap", 60, 5)
  animateSection(".animate-left", ".animate-left", 80, 20, true, -100, 1, "Expo.easeOut")
  animateSection(".animate-right", ".animate-left", 80, 20, true, 100, 1, "Expo.easeOut")
  animateSection(".project-listing", "#projects", 60, 10, true, -100, 1, "Expo.easeOut")
}

function animateSection(selector, trigger, start, end, isX = false, xValue = 0, duration = 1, ease = "power2.out") {
  const properties = {
    scrollTrigger: {
      trigger: trigger,
      start: `top ${start}%`,
      end: `top ${end}%`,
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    duration: duration,
    stagger: 0.3,
    ease: "power2.out",
  }
  if (isX) {
    properties.x = xValue
  } else {
    properties.y = 50
  }
  gsap.from(selector, properties)
}

function setupNavigation() {
  const navLinks = document.querySelectorAll("nav a")
  const headerHeight = document.querySelector("header").offsetHeight

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault() // Prevent default anchor behavior
      const targetId = link.getAttribute("href").substring(1) // Get target ID
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        let targetPosition

        if (targetId === "about") {
          // Scroll to make SYNC background visible
          const mainSection = document.getElementById("main")
          const syncOffset = mainSection.offsetHeight * 0.6 // Adjust this multiplier to fine-tune positioning
          const mainTop = mainSection.getBoundingClientRect().top + window.scrollY

          targetPosition = mainTop + syncOffset - headerHeight // Adjust for header
        } else {
          // Default behavior for other links
          targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight
        }

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

function scrollToSection(link, headerHeight) {
  const targetId = link.getAttribute("href").substring(1)
  const targetElement = document.getElementById(targetId)
  if (!targetElement) return

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight
  window.scrollTo({ top: targetPosition, behavior: "smooth" })
}

function setupClosePopupOnInteraction() {
  window.addEventListener("scroll", closePopup, { passive: true })
}
