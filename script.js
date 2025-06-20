// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
  
  // Active navigation link highlighting
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")
  
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id")
      }
    })
  
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
  
  // Countdown Timer
  function updateCountdown() {
    const weddingDate = new Date("2026-05-23T17:00:00").getTime()
    const now = new Date().getTime()
    const distance = weddingDate - now
  
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  
      document.getElementById("days").textContent = days
      document.getElementById("hours").textContent = hours
      document.getElementById("minutes").textContent = minutes
      document.getElementById("seconds").textContent = seconds
    } else {
      document.getElementById("days").textContent = "0"
      document.getElementById("hours").textContent = "0"
      document.getElementById("minutes").textContent = "0"
      document.getElementById("seconds").textContent = "0"
    }
  }
  
  // Update countdown every second
  setInterval(updateCountdown, 1000)
  updateCountdown() // Initial call
  
  // Add to Calendar function
  function addToCalendar() {
    const event = {
      title: "Boda de Dámaris y Edgar",
      start: "20260523T170000Z",
      end: "20260524T020000Z",
      description: "Celebración de nuestra boda",
      location: "Torre del Pla, Ctra. de l'Ametlla, 08520 Llerona, Barcelona",
    }
  
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
  
    window.open(googleCalendarUrl, "_blank")
  }
  
  // Add CSS class for active nav link
  const style = document.createElement("style")
  style.textContent = `
      .nav-link.active {
          color: #000000 !important;
          border-bottom-color: #000000 !important;
      }
  `
  document.head.appendChild(style)
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)
  
  // Observe elements for animation
  document.addEventListener("DOMContentLoaded", () => {
    const animateElements = document.querySelectorAll(".detail-card, .info-card, .gallery-item")
    animateElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(20px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })
  })
  
  // Video background handling
  document.addEventListener("DOMContentLoaded", () => {
    const heroVideo = document.querySelector(".hero-video")
    
    if (heroVideo) {
      // Force play on iOS Safari
      const playVideo = () => {
        heroVideo.play().catch((error) => {
          console.log("Video autoplay failed:", error)
        })
      }
      
      // Try to play immediately
      playVideo()
      
      // Try to play on first user interaction
      const handleFirstInteraction = () => {
        playVideo()
        document.removeEventListener("touchstart", handleFirstInteraction)
        document.removeEventListener("click", handleFirstInteraction)
        document.removeEventListener("scroll", handleFirstInteraction)
      }
      
      // Listen for user interactions
      document.addEventListener("touchstart", handleFirstInteraction, { once: true })
      document.addEventListener("click", handleFirstInteraction, { once: true })
      document.addEventListener("scroll", handleFirstInteraction, { once: true })
      
      // Ensure video plays on loadedmetadata
      heroVideo.addEventListener("loadedmetadata", () => {
        playVideo()
      })
      
      // Pause video when page is not visible (save battery)
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          heroVideo.pause()
        } else {
          playVideo()
        }
      })
      
      // Optimize video loading
      heroVideo.preload = "auto"
      heroVideo.muted = true
      heroVideo.playsInline = true
    }
  })
  