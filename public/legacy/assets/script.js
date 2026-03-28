/* ========================================
   mperium Appliance - JavaScript
   ======================================== */

function initRafixScripts() {
  // ========================================
  // Header Scroll Effect
  // ========================================
  const header = document.querySelector('.header');

  function syncHeaderState() {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', function() {
    syncHeaderState();
  });

  syncHeaderState();

  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

  if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
    const mobileMenuIcon = mobileMenuBtn.querySelector('svg');
    let isMobileMenuOpen = false;

    function openMobileMenu() {
      isMobileMenuOpen = true;
      mobileMenu.classList.add('open');
      mobileMenuOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (mobileMenuIcon) {
        mobileMenuIcon.innerHTML = `
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        `;
      }
    }

    function closeMobileMenu() {
      isMobileMenuOpen = false;
      mobileMenu.classList.remove('open');
      mobileMenuOverlay.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileMenuIcon) {
        mobileMenuIcon.innerHTML = `
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        `;
      }
    }

    mobileMenuBtn.addEventListener('click', function() {
      if (isMobileMenuOpen) closeMobileMenu();
      else openMobileMenu();
    });

    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ========================================
  // Discount Banner Click → open form modal
  // ========================================
  const discountBanner = document.querySelector('.discount-banner');
  if (discountBanner) {
    discountBanner.addEventListener('click', function(e) {
      e.preventDefault();
      if (window._openFormModal) window._openFormModal();
    });
  }

  // ========================================
  // Gallery Slider (Swiper)
  // ========================================
  function initGallerySwiper() {
    var galleryEl = document.querySelector('.gallery-swiper');
    if (!galleryEl || typeof Swiper === 'undefined') return;
    var galleryCurrent = document.querySelector('.gallery-current');
    var sw = new Swiper(galleryEl, {
      slidesPerView: 1,
      spaceBetween: 16,
      centeredSlides: true,
      loop: true,
      speed: 500,
      grabCursor: true,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      },
      navigation: {
        prevEl: '.gallery-prev',
        nextEl: '.gallery-next'
      }
    });
    sw.on('slideChange', function () {
      if (galleryCurrent) galleryCurrent.textContent = sw.realIndex + 1;
    });
  }
  initGallerySwiper();

  // ========================================
  // Testimonials Carousel
  // ========================================
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (testimonialsTrack && testimonialCards.length > 0 && dotsContainer) {
    let currentIndex = 0;
    let autoplayInterval;

    function getCardsPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function getMaxIndex() {
      return testimonialCards.length - getCardsPerView();
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      const totalPages = getMaxIndex() + 1;
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === currentIndex ? ' active' : '');
        dot.addEventListener('click', function () {
          stopAutoplay();
          goToSlide(i);
          startAutoplay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      const cardWidth = testimonialCards[0].offsetWidth;
      const gap = 20;
      const offset = currentIndex * (cardWidth + gap);
      testimonialsTrack.style.transform = 'translateX(-' + offset + 'px)';

      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach(function (dot, index) {
        dot.classList.toggle('active', index === currentIndex);
      });

      if (prevBtn) prevBtn.disabled = currentIndex <= 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
    }

    function nextSlide() {
      const maxIndex = getMaxIndex();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    }

    function prevSlide() {
      const maxIndex = getMaxIndex();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex;
      }
      updateCarousel();
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () {
      stopAutoplay();
      prevSlide();
      startAutoplay();
    });

    if (nextBtn) nextBtn.addEventListener('click', function () {
      stopAutoplay();
      nextSlide();
      startAutoplay();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    testimonialsTrack.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialsTrack.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        stopAutoplay();
        if (diff > 0) nextSlide();
        else prevSlide();
        startAutoplay();
      }
    }, { passive: true });

    function handleResize() {
      buildDots();
      updateCarousel();
    }

    window.addEventListener('resize', handleResize);

    buildDots();
    updateCarousel();
    startAutoplay();
  }

  // ========================================
  // Toast Notification System
  // ========================================
  function getToastContainer() {
    var container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function showToast(message, type) {
    var container = getToastContainer();
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'success');

    var iconSvg = type === 'error'
      ? '<svg fill="none" height="20" width="20" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
      : '<svg fill="none" height="20" width="20" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>';

    toast.innerHTML = '<span class="toast-icon">' + iconSvg + '</span><span class="toast-message">' + message + '</span>';
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(function () {
      toast.classList.add('toast-visible');
    });

    // Auto-remove after 4s
    setTimeout(function () {
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-hiding');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 4000);
  }

  window.showToast = showToast;

  // ========================================
  // Contact Form submit + Book another repair
  // ========================================
  function bindServiceRequestForms(root) {
    var forms = root.querySelectorAll('.contact-form form');

    forms.forEach(function(form) {
      if (form.dataset.boundServiceRequest === 'true') return;
      form.dataset.boundServiceRequest = 'true';

      var defaultSubmitBtn = form.querySelector('.submit-btn');
      if (defaultSubmitBtn && !defaultSubmitBtn.dataset.defaultHtml) {
        defaultSubmitBtn.dataset.defaultHtml = defaultSubmitBtn.innerHTML;
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();

        var submitBtn = form.querySelector('.submit-btn');
        if (submitBtn) {
          submitBtn.innerHTML = 'Sending...';
          submitBtn.disabled = true;
        }

        var formData = new FormData(form);

        // Add human-readable labels for selects
        var serviceSelect = form.querySelector('select[name="ServiceId"]');
        if (serviceSelect && serviceSelect.selectedIndex >= 0) {
          formData.set('ServiceLabel', serviceSelect.options[serviceSelect.selectedIndex].text);
        }
        var brandSelect = form.querySelector('select[name="BrandId"]');
        if (brandSelect && brandSelect.selectedIndex >= 0) {
          formData.set('BrandLabel', brandSelect.options[brandSelect.selectedIndex].text);
        }

        fetch('/api/service-request', {
          method: 'POST',
          body: formData
        })
        .then(function(response) {
          return response.json().then(function(data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function(result) {
          if (result.ok && result.data.success) {
            showToast('Your service request has been sent successfully!', 'success');
            var contactFormDiv = form.closest('.contact-form');
            if (contactFormDiv) {
              var formSuccess = contactFormDiv.querySelector('.form-success');
              if (formSuccess) {
                form.style.display = 'none';
                formSuccess.style.display = 'block';
              }
            }
          } else {
            var errMsg = (result.data && result.data.error) ? result.data.error : 'Something went wrong. Please try again.';
            showToast(errMsg, 'error');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = submitBtn.dataset.defaultHtml || 'Submit';
            }
          }
        })
        .catch(function() {
          showToast('Network error. Please check your connection and try again.', 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.dataset.defaultHtml || 'Submit';
          }
        });
      });
    });

    var retryButtons = root.querySelectorAll('.contact-form .book-another');
    retryButtons.forEach(function(btn) {
      if (btn.dataset.boundBookAnother === 'true') return;
      btn.dataset.boundBookAnother = 'true';

      btn.addEventListener('click', function() {
        var contactForm = btn.closest('.contact-form');
        if (!contactForm) return;

        var form = contactForm.querySelector('form');
        var formSuccess = contactForm.querySelector('.form-success');
        if (!form) return;

        form.reset();
        form.style.display = 'block';
        if (formSuccess) formSuccess.style.display = 'none';

        var submitBtn = form.querySelector('.submit-btn');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.dataset.defaultHtml || submitBtn.innerHTML;
        }
      });
    });
  }

  bindServiceRequestForms(document);

  // ========================================
  // Service Areas Sliders (multiple independent, with autoplay)
  // ========================================
  var allAreasSliders = document.querySelectorAll('[data-areas-slider]');

  allAreasSliders.forEach(function(slider) {
    var track = slider.querySelector('.areas-slider-track');
    var dotsContainer = slider.querySelector('.areas-slider-dots');
    var pages = slider.querySelectorAll('.areas-slider-page');

    if (!track || !dotsContainer || pages.length === 0) return;

    var currentPage = 0;
    var totalPages = pages.length;
    var autoplayTimer = null;

    function buildDots() {
      dotsContainer.innerHTML = '';
      for (var i = 0; i < totalPages; i++) {
        var dot = document.createElement('button');
        dot.className = i === currentPage ? 'active' : '';
        dot.setAttribute('aria-label', 'Page ' + (i + 1));
        (function(idx) {
          dot.addEventListener('click', function() {
            goToPage(idx);
            restartAutoplay();
          });
        })(i);
        dotsContainer.appendChild(dot);
      }
    }

    function goToPage(pageIndex) {
      currentPage = pageIndex;
      track.style.transform = 'translateX(-' + (currentPage * 100) + '%)';
      var dots = dotsContainer.querySelectorAll('button');
      dots.forEach(function(dot, idx) {
        dot.classList.toggle('active', idx === currentPage);
      });
    }

    function nextPage() {
      var next = currentPage + 1 >= totalPages ? 0 : currentPage + 1;
      goToPage(next);
    }

    function startAutoplay() {
      if (totalPages <= 1) return;
      autoplayTimer = setInterval(nextPage, 4000);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Touch/swipe support
    var swipeX = 0;
    track.addEventListener('touchstart', function(e) {
      swipeX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var diff = swipeX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentPage < totalPages - 1) {
          goToPage(currentPage + 1);
        } else if (diff < 0 && currentPage > 0) {
          goToPage(currentPage - 1);
        }
      }
      startAutoplay();
    }, { passive: true });

    buildDots();
    startAutoplay();
  });

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  const anchorLinks = document.querySelectorAll('a[href*="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      var url = new URL(this.href, window.location.origin);
      var hash = url.hash;
      if (!hash || hash === '#') return;

      // Only smooth-scroll if it's the same page or home page
      var isSamePage = url.pathname === window.location.pathname;
      var isHomePage = url.pathname === '/' || url.pathname === '/Home/Index';
      var currentIsHome = window.location.pathname === '/' || window.location.pathname === '/Home/Index';

      if (isSamePage || (isHomePage && currentIsHome)) {
        var target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          var stickyTop = document.querySelector('.sticky-top');
          var offset = stickyTop ? stickyTop.offsetHeight + 20 : 0;
          var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });

  // ========================================
  // AOS Scroll Animations
  // ========================================

  // Stagger cards within small, visible groups (not entire sections)
  var cardGroups = document.querySelectorAll(
    '.services-grid, .discounts-grid, .features-list, .videos-grid, .testimonials-track, .areas-slider-page, .areas-maps-grid, .brand-about-grid, .dhero-stats-bar, .contact-card'
  );
  var cardSelectors = '.service-card, .discount-card, .feature-item, .step, .video-card, .testimonial-card, .area-item, .areas-callout, .areas-map-card, .brand-about-feature, .contact-info, .contact-form-container';

  cardGroups.forEach(function (group) {
    var cards = group.querySelectorAll(cardSelectors);
    cards.forEach(function (card, idx) {
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', (idx * 80).toString());
      card.setAttribute('data-aos-duration', '500');
    });
  });

  // Section headers
  document.querySelectorAll('.section-header, .brand-about-text, .dhero-stats-bar').forEach(function (el) {
    if (!el.getAttribute('data-aos')) {
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-duration', '600');
    }
  });

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 50,
      easing: 'ease-out-cubic'
    });
  }

  // ========================================
  // Stat Digit Slide-Up Animation
  // ========================================
  var digitElements = document.querySelectorAll('.stat-number[data-digits]');
  var digitsAnimated = false;

  // Prepare: wrap each character in spans
  digitElements.forEach(function (el) {
    var text = el.textContent.trim();
    el.textContent = '';
    for (var i = 0; i < text.length; i++) {
      var wrap = document.createElement('span');
      wrap.className = 'digit-wrap';
      var charSpan = document.createElement('span');
      charSpan.className = 'digit-char';
      charSpan.textContent = text[i];
      wrap.appendChild(charSpan);
      el.appendChild(wrap);
    }
  });

  var digitsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !digitsAnimated) {
        digitsAnimated = true;
        // Gather all digit-char spans across all stat-numbers in order
        var allChars = [];
        digitElements.forEach(function (el) {
          var chars = el.querySelectorAll('.digit-char');
          chars.forEach(function (c) { allChars.push(c); });
        });
        // Stagger each character
        allChars.forEach(function (charEl, i) {
          charEl.style.transitionDelay = i * 0.04 + 's';
        });
        // Trigger
        digitElements.forEach(function (el) {
          el.classList.add('digits-visible');
        });
        digitsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  var statsSection = document.querySelector('.why-us-right');
  if (statsSection) {
    digitsObserver.observe(statsSection);
  }

  // ========================================
  // Form Modal (popup)
  // ========================================
  var formModal = document.getElementById('form-modal');
  var closeModalBtn = document.getElementById('close-form-modal');
  var formModalBody = formModal ? formModal.querySelector('.form-modal-body') : null;

  if (formModal && formModalBody) {
    var modalReady = false;

    function prepareModal() {
      if (modalReady) return;
      var originalContainer = document.querySelector('.contact-form-container');
      if (originalContainer) {
        var clone = originalContainer.cloneNode(true);
        clone.removeAttribute('data-aos');
        clone.removeAttribute('data-aos-delay');
        clone.removeAttribute('data-aos-duration');
        var cloneForm = clone.querySelector('form');
        if (cloneForm) {
          cloneForm.removeAttribute('data-bound-service-request');
          delete cloneForm.dataset.boundServiceRequest;
        }
        formModalBody.appendChild(clone);
        bindServiceRequestForms(formModalBody);
        modalReady = true;
      }
    }

    function openFormModal() {
      prepareModal();
      formModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    window._openFormModal = openFormModal;

    function closeFormModal() {
      formModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // All elements with .open-form-trigger open the modal
    document.querySelectorAll('.open-form-trigger').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openFormModal();
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeFormModal);
    }

    // Close on overlay click
    formModal.addEventListener('click', function (e) {
      if (e.target === formModal) closeFormModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && formModal.classList.contains('active')) {
        closeFormModal();
      }
    });
  }

  // ========================================
  // Lazy-load Videos after page fully loads
  // ========================================
  window.addEventListener('load', function () {
    var lazyVideos = document.querySelectorAll('.video-card video[data-src]');
    lazyVideos.forEach(function (video) {
      video.src = video.getAttribute('data-src');
      video.removeAttribute('data-src');
      video.load();
      video.play().catch(function () {});
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRafixScripts, { once: true });
} else {
  initRafixScripts();
}
