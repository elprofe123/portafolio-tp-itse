// Variables globales
const cart = []
let cartCount = 0
let cartTotal = 0

// Elementos del DOM
const menuToggle = document.getElementById("menu-toggle")
const navMenu = document.getElementById("nav-menu")
const cartIcon = document.getElementById("cart-icon")
const cartModal = document.getElementById("cart-modal")
const closeCart = document.getElementById("close-cart")
const cartCountElement = document.getElementById("cart-count")
const cartItemsElement = document.getElementById("cart-items")
const cartTotalElement = document.getElementById("cart-total")
const addToCartButtons = document.querySelectorAll(".add-to-cart")
const searchInput = document.querySelector(".search-box input")
const scrollTopBtn = document.createElement("button")

// Import Bootstrap
const bootstrap = window.bootstrap

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners()
  updateCartDisplay()

  // Smooth scrolling para los enlaces de navegación
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }

      // Cerrar el menú móvil después del clic
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Resaltar enlace activo en la navegación
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`)

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remover clase activa de todos los enlaces
        navLinks.forEach((link) => link.classList.remove("active"))
        // Agregar clase activa al enlace actual
        if (navLink) {
          navLink.classList.add("active")
        }
      }
    })
  })

  // Animación de aparición para las cards de proyectos
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

  // Observar todas las cards de proyectos
  const projectCards = document.querySelectorAll(".card")
  projectCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Validación del formulario de contacto
  const contactForm = document.querySelector("#contact form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Obtener valores del formulario
      const nombre = document.getElementById("nombre").value.trim()
      const email = document.getElementById("email").value.trim()
      const mensaje = document.getElementById("mensaje").value.trim()

      // Validación básica
      if (!nombre || !email || !mensaje) {
        alert("Por favor, completa todos los campos obligatorios.")
        return
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un email válido.")
        return
      }

      // Simular envío del formulario
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...'
      submitBtn.disabled = true

      // Simular delay de envío
      setTimeout(() => {
        alert("¡Mensaje enviado correctamente! Te contactaré pronto.")
        contactForm.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Efecto de typing para el título principal
  const heroTitle = document.querySelector(".hero-section h1")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    heroTitle.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Iniciar el efecto después de un pequeño delay
    setTimeout(typeWriter, 1000)
  }

  // Contador animado para estadísticas (si las hubiera)
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      element.textContent = Math.floor(start)

      if (start >= target) {
        element.textContent = target
        clearInterval(timer)
      }
    }, 16)
  }

  // Lazy loading para imágenes
  const images = document.querySelectorAll('img[src*="placeholder"]')

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "1"
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    img.style.opacity = "0.7"
    img.style.transition = "opacity 0.3s ease"
    imageObserver.observe(img)
  })

  // Efecto parallax sutil para la sección hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroSection = document.querySelector(".hero-section")

    if (heroSection) {
      const rate = scrolled * -0.5
      heroSection.style.transform = `translateY(${rate}px)`
    }
  })

  // Mostrar/ocultar botón de scroll to top
  scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>'
  scrollTopBtn.className = "btn btn-primary position-fixed"
  scrollTopBtn.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `

  document.body.appendChild(scrollTopBtn)

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.opacity = "1"
      scrollTopBtn.style.visibility = "visible"
    } else {
      scrollTopBtn.style.opacity = "0"
      scrollTopBtn.style.visibility = "hidden"
    }
  })

  // Cargar tema guardado
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme")
  }
})

// Event Listeners
function initializeEventListeners() {
  // Menu toggle para móvil
  menuToggle.addEventListener("click", toggleMobileMenu)

  // Cart modal
  cartIcon.addEventListener("click", openCartModal)
  closeCart.addEventListener("click", closeCartModal)
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      closeCartModal()
    }
  })

  // Add to cart buttons
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCart)
  })

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  newsletterForm.addEventListener("submit", handleNewsletterSubmit)

  // CTA button
  const ctaButton = document.querySelector(".cta-button")
  ctaButton.addEventListener("click", () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" })
  })

  // Quick view buttons
  const quickViewButtons = document.querySelectorAll(".quick-view")
  quickViewButtons.forEach((button) => {
    button.addEventListener("click", handleQuickView)
  })
}

// Mobile menu toggle
function toggleMobileMenu() {
  navMenu.classList.toggle("active")
  const icon = menuToggle.querySelector("i")

  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
}

// Cart functionality
function openCartModal() {
  cartModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeCartModal() {
  cartModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

function handleAddToCart(e) {
  const button = e.target.closest(".add-to-cart")
  const productName = button.getAttribute("data-product")
  const productPrice = Number.parseFloat(button.getAttribute("data-price"))

  // Animación del botón
  const originalText = button.innerHTML
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Agregando...'
  button.disabled = true

  setTimeout(() => {
    addToCart(productName, productPrice)
    button.innerHTML = '<i class="fas fa-check"></i> Agregado'

    setTimeout(() => {
      button.innerHTML = originalText
      button.disabled = false
    }, 1000)
  }, 500)
}

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    })
  }

  updateCartDisplay()
  showNotification(`${name} agregado al carrito`)
}

function removeFromCart(index) {
  cart.splice(index, 1)
  updateCartDisplay()
}

function updateCartQuantity(index, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(index)
  } else {
    cart[index].quantity = newQuantity
    updateCartDisplay()
  }
}

function updateCartDisplay() {
  // Actualizar contador
  cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  cartCountElement.textContent = cartCount

  // Actualizar total
  cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  cartTotalElement.textContent = cartTotal.toFixed(2)

  // Actualizar items del carrito
  if (cart.length === 0) {
    cartItemsElement.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>'
  } else {
    cartItemsElement.innerHTML = cart
      .map(
        (item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateCartQuantity(${index}, ${item.quantity - 1})" class="quantity-btn">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${index}, ${item.quantity + 1})" class="quantity-btn">+</button>
                    <button onclick="removeFromCart(${index})" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Newsletter
function handleNewsletterSubmit(e) {
  e.preventDefault()
  const email = e.target.querySelector('input[type="email"]').value
  const button = e.target.querySelector("button")
  const originalText = button.textContent

  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Suscribiendo...'
  button.disabled = true

  setTimeout(() => {
    showNotification("¡Gracias por suscribirte!")
    e.target.reset()
    button.textContent = originalText
    button.disabled = false
  }, 1500)
}

// Quick view
function handleQuickView(e) {
  const productCard = e.target.closest(".product-card")
  const productName = productCard.querySelector("h3").textContent
  const productPrice = productCard.querySelector(".product-price").textContent

  showNotification(`Vista rápida: ${productName} - ${productPrice}`)
}

// Notifications
function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Smooth scrolling para navegación
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

// Lazy loading para imágenes
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Inicializar lazy loading si hay imágenes con data-src
if (document.querySelectorAll("img[data-src]").length > 0) {
  lazyLoadImages()
}

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const icon = menuToggle.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  })
})

// Animaciones al hacer scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".product-card, .category-card")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  elements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Inicializar animaciones
animateOnScroll()

// Búsqueda en tiempo real
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const productCards = document.querySelectorAll(".product-card")

    productCards.forEach((card) => {
      const productName = card.querySelector("h3").textContent.toLowerCase()
      if (productName.includes(searchTerm)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
}

// Función para cambiar el tema (modo oscuro/claro) - opcional
function toggleTheme() {
  document.body.classList.toggle("dark-theme")
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light")
}
