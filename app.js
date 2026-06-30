// --- PRODUCT DATASET ---
const products = [
  {
    id: 1,
    name: "Special Ratlami Sev",
    category: "sev",
    price: "₹140",
    weight: "400g",
    image: "photos/IMG_20260615_204049_585.jpg",
    description: "Spicy gram flour noodles flavored with stone-ground cloves and black pepper.",
    isFeatured: true
  },
  {
    id: 2,
    name: "Nylon Bhujia",
    category: "bhujia",
    price: "₹130",
    weight: "400g",
    image: "photos/IMG_20260615_204051_636.jpg",
    description: "Extra-fine, crispy gram flour threads perfect for garnishing or tea-time munching.",
    isFeatured: false
  },
  {
    id: 3,
    name: "Premium Indori Mixture",
    category: "bhujia",
    price: "₹160",
    weight: "500g",
    image: "photos/IMG_20260615_204053_552.jpg",
    description: "A sweet and spicy blend of sev, peanuts, cornflakes, and aromatic Indian spices.",
    isFeatured: true
  },
  {
    id: 4,
    name: "Tikha Gathiya",
    category: "sev",
    price: "₹140",
    weight: "400g",
    image: "photos/IMG_20260615_204057_518.jpg",
    description: "Crunchy, spicy thick savory logs with carom seeds and rich red chili flavor.",
    isFeatured: true
  },
  {
    id: 5,
    name: "Methi Chakri",
    category: "traditional",
    price: "₹150",
    weight: "350g",
    image: "photos/IMG_20260615_204059_372.jpg",
    description: "Spiral, crispy rice-flour crackers infused with fragrant dried fenugreek leaves.",
    isFeatured: false
  },
  {
    id: 6,
    name: "Garlic (Lahsun) Sev",
    category: "sev",
    price: "₹140",
    weight: "400g",
    image: "photos/IMG_20260615_204101_208.jpg",
    description: "Golden gram flour noodles loaded with real garlic paste and savory Indian spices.",
    isFeatured: false
  },
  {
    id: 7,
    name: "Sing Bhujia (Spiced Peanuts)",
    category: "bhujia",
    price: "₹130",
    weight: "350g",
    image: "photos/IMG_20260615_204102_997.jpg",
    description: "Crispy, gram-flour coated peanuts tossed in hot and spicy masala powder.",
    isFeatured: true
  },
  {
    id: 8,
    name: "Chana Dal Premium",
    category: "traditional",
    price: "₹120",
    weight: "400g",
    image: "photos/IMG_20260615_204104_934.jpg",
    description: "Crunchy fried split bengal gram tossed in hot, tangy spices.",
    isFeatured: false
  },
  {
    id: 9,
    name: "Royal Cornflakes Chivda",
    category: "bhujia",
    price: "₹150",
    weight: "400g",
    image: "photos/IMG_20260615_204107_026.jpg",
    description: "Crispy sweet-and-sour cornflakes mixed with roasted cashews and raisins.",
    isFeatured: false
  },
  {
    id: 10,
    name: "Aloo Bhujia Classic",
    category: "bhujia",
    price: "₹130",
    weight: "400g",
    image: "photos/IMG_20260615_204109_060.jpg",
    description: "Light and crispy potato-based savory threads flavored with mint and lemon spices.",
    isFeatured: false
  },
  {
    id: 11,
    name: "Bhavnagari Gathiya",
    category: "sev",
    price: "₹130",
    weight: "400g",
    image: "photos/IMG_20260615_204114_030.jpg",
    description: "Extremely soft, puffy gram flour logs lightly seasoned with black pepper.",
    isFeatured: false
  },
  {
    id: 12,
    name: "Masala Kaju (Spiced Cashews)",
    category: "traditional",
    price: "₹380",
    weight: "250g",
    image: "photos/IMG_20260615_204125_911.jpg",
    description: "Premium roasted whole cashews coated with tangy, exotic chatpata masala.",
    isFeatured: false
  },
  {
    id: 13,
    name: "Moong Dal Crispy",
    category: "traditional",
    price: "₹120",
    weight: "400g",
    image: "photos/IMG_20260615_204139_317.jpg",
    description: "Lightly salted, golden fried split green gram - the ultimate clean savory snack.",
    isFeatured: false
  },
  {
    id: 14,
    name: "Long Sev",
    category: "sev",
    price: "₹140",
    weight: "400g",
    image: "photos/IMG_20260615_204141_115.jpg",
    description: "Traditional thick clove-flavored gram flour sev with high crunch factor.",
    isFeatured: false
  },
  {
    id: 15,
    name: "Khatta Meetha Mixture",
    category: "bhujia",
    price: "₹130",
    weight: "400g",
    image: "photos/IMG_20260615_204142_904.jpg",
    description: "A delightful sweet and tangy savory mixture featuring green peas and crisp boondi.",
    isFeatured: false
  }
];

// --- APP STATE ---
let activeFilter = 'all';
let showAllProducts = false;
const INITIAL_PRODUCTS_COUNT = 6;

// --- DOM ELEMENTS ---
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');
const featuredGrid = document.getElementById('featured-products-grid');
const fullGrid = document.getElementById('full-products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const inquiryForm = document.getElementById('inquiry-form');
const inquiryStatus = document.getElementById('inquiry-status');
const inquiryProductDropdown = document.getElementById('form-product');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterStatus = document.getElementById('newsletter-status');

// --- INITIALIZE SITE ---
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  renderFullProducts();
  setupEventListeners();
  setupScrollReveal();
});

// --- RENDER DYNAMIC PRODUCTS ---
function renderFeaturedProducts() {
  if (!featuredGrid) return;
  
  const featured = products.filter(p => p.isFeatured);
  featuredGrid.innerHTML = featured.map(p => createProductCardMarkup(p, 'featured')).join('');
}

function renderFullProducts() {
  if (!fullGrid) return;
  
  // Filter products by category
  let filtered = products;
  if (activeFilter !== 'all') {
    filtered = products.filter(p => p.category === activeFilter);
  }
  
  // Apply pagination/load-more logic
  const totalFilteredCount = filtered.length;
  let itemsToRender = filtered;
  
  if (!showAllProducts && totalFilteredCount > INITIAL_PRODUCTS_COUNT) {
    itemsToRender = filtered.slice(0, INITIAL_PRODUCTS_COUNT);
    loadMoreBtn.style.display = 'inline-flex';
    loadMoreBtn.textContent = 'View All Products';
  } else if (totalFilteredCount > INITIAL_PRODUCTS_COUNT) {
    loadMoreBtn.style.display = 'inline-flex';
    loadMoreBtn.textContent = 'Show Less';
  } else {
    loadMoreBtn.style.display = 'none';
  }
  
  fullGrid.innerHTML = itemsToRender.map(p => createProductCardMarkup(p, 'full')).join('');
  
  // Add quick animation trigger
  const cards = fullGrid.querySelectorAll('.product-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 50}ms`;
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 50);
  });

  // Re-bind click event on dynamically generated enquiry buttons
  bindEnquiryButtons();
}

function createProductCardMarkup(product, section) {
  const categoryLabel = product.category === 'sev' ? 'Sev & Gathiya' : 
                        product.category === 'bhujia' ? 'Bhujia & Mixes' : 'Traditional Specials';
  
  return `
    <div class="product-card" data-category="${product.category}">
      <div class="product-img-wrapper">
        <div class="product-badge">${product.weight}</div>
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
      </div>
      <div class="product-info">
        <div>
          <div class="product-category">${categoryLabel}</div>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
        </div>
        <div class="product-footer">
          <div class="product-price">${product.price}</div>
          <button class="product-enquire-btn" data-product="${product.name}">
            Enquire <i class="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
  // 1. Scroll effect on header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile navigation hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 3. Category filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeFilter = e.target.getAttribute('data-filter');
      showAllProducts = false; // Reset paginate on filter change
      renderFullProducts();
    });
  });

  // 4. Load More toggle
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      showAllProducts = !showAllProducts;
      renderFullProducts();
      if (!showAllProducts) {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 5. Inquiry Form Submission
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const product = inquiryProductDropdown.value;
      const message = document.getElementById('form-message').value.trim();
      
      if (!name || !email || !phone || !product || !message) {
        showFormFeedback(inquiryStatus, "Please fill in all fields with valid information.", "error");
        return;
      }
      
      // Simulate API submission
      inquiryStatus.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting your inquiry...';
      inquiryStatus.className = 'form-message error'; // grey/loading look
      inquiryStatus.style.opacity = '1';
      
      setTimeout(() => {
        showFormFeedback(inquiryStatus, `Thank you, ${name}! Your inquiry for ${product} has been received. Our sales team will connect with you shortly.`, "success");
        inquiryForm.reset();
      }, 1500);
    });
  }

  // 6. Newsletter Form Submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const emailValue = emailInput.value.trim();
      
      if (!emailValue) return;
      
      newsletterStatus.textContent = "Subscribing...";
      newsletterStatus.style.color = "var(--color-gold)";
      newsletterStatus.style.opacity = "1";
      
      setTimeout(() => {
        newsletterStatus.textContent = "Successfully Subscribed!";
        newsletterStatus.style.color = "var(--color-saffron)";
        emailInput.value = '';
        
        setTimeout(() => {
          newsletterStatus.style.opacity = "0";
        }, 3000);
      }, 1000);
    });
  }
}

// --- BIND ENQUIRY CTA ---
function bindEnquiryButtons() {
  const enquireBtns = document.querySelectorAll('.product-enquire-btn');
  enquireBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productName = e.currentTarget.getAttribute('data-product');
      
      // Update form dropdown value
      if (inquiryProductDropdown) {
        // Look for matching option, or add dynamic option if not exists
        let optionExists = Array.from(inquiryProductDropdown.options).some(opt => opt.value === productName);
        if (!optionExists) {
          const newOpt = document.createElement('option');
          newOpt.value = productName;
          newOpt.textContent = productName;
          inquiryProductDropdown.appendChild(newOpt);
        }
        inquiryProductDropdown.value = productName;
      }
      
      // Scroll to contact form section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Focus name field after scroll completes
        setTimeout(() => {
          const nameField = document.getElementById('form-name');
          if (nameField) nameField.focus();
        }, 800);
      }
    });
  });
}

function showFormFeedback(element, text, type) {
  element.textContent = text;
  element.className = `form-message ${type}`;
  element.style.opacity = '1';
  
  if (type === 'success') {
    setTimeout(() => {
      element.style.opacity = '0';
    }, 6000);
  }
}

// --- SCROLL REVEAL ANIMATION SYSTEM ---
function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve to keep active class and optimize
        observer.unobserve(entry.target);
      }
    });
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.12, // Trigger when 12% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Offset slightly for better visual entry
  });
  
  reveals.forEach(el => {
    revealObserver.observe(el);
  });
}
