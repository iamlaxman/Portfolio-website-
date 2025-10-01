$(document).ready(function(){
    try {
        // Typed.js for typing animation with single cursor
        var typed = new Typed(".typing", {
            strings: ["Developer", "Designer", "Freelancer", "Ethical Hacker"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
        var typed2 = new Typed(".typing-2", {
            strings: ["Developer", "Designer", "Freelancer", "Ethical Hacker"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    } catch (error) {
        console.error('Typed.js initialization failed:', error);
    }

    try {
        // Navbar toggle for mobile
        $('.menu-toggle').click(function(){
            $('.mobile-menu').slideToggle();
            $(this).find('i').toggleClass('fa-bars fa-times');
        });
    } catch (error) {
        console.error('Navbar toggle failed:', error);
    }

    try {
        // Scroll-up button show/hide and navbar scroll effect
        $(window).scroll(function(){
            // Scroll-up button show/hide
            if($(this).scrollTop() > 500){
                $('.scroll-up-btn').removeClass('hidden').addClass('block');
            } else {
                $('.scroll-up-btn').removeClass('block').addClass('hidden');
            }
            
            // Navbar scroll effect
            if($(this).scrollTop() > 100){
                $('.navbar').addClass('scrolled');
            } else {
                $('.navbar').removeClass('scrolled');
            }
        });

        // Scroll to top
        $('.scroll-up-btn').click(function(){
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });
    } catch (error) {
        console.error('Scroll effects failed:', error);
    }

    try {
        // Smooth scroll for menu links, adjust for navbar height
        $('.menu-btn').click(function(e){
            // Prevent default behavior for all menu buttons
            e.preventDefault();
            
            var target = $(this).attr('href');
            var navbarHeight = $('#navbar').outerHeight() || 60;
            
            $('html, body').animate({
                scrollTop: $(target).offset().top - navbarHeight
            }, 800);
            
            // If this is a mobile link, close the mobile menu
            if ($(this).hasClass('mobile-link')) {
                $('.mobile-menu').slideUp();
                $('.menu-toggle i').removeClass('fa-times').addClass('fa-bars');
            }
            
            return false;
        });
    } catch (error) {
        console.error('Smooth scroll failed:', error);
    }

    try {
        // Read more toggle
        $('#read-more-btn').click(function(){
            $('#extra-content').slideToggle();
            $(this).text($(this).text() === 'Read more' ? 'Read less' : 'Read more');
        });
    } catch (error) {
        console.error('Read more toggle failed:', error);
    }

    try {
        // Section fade-in animations on scroll
        $('section').waypoint(function(direction) {
            if (direction === 'down') {
                $(this.element).find('.animated').each(function(index) {
                    var $this = $(this);
                    setTimeout(function() {
                        $this.addClass('visible');
                    }, index * 200);
                });
            }
        }, { offset: '75%' });
    } catch (error) {
        console.error('Section animations failed:', error);
    }

    try {
        // AJAX Form Submission
        $('#contact-form').submit(function(e) {
            e.preventDefault();
            
            // Get form data
            var formData = $(this).serialize();
            var formMessage = $('#form-message');
            
            // Show loading state
            var submitBtn = $('.submit-btn');
            var originalText = submitBtn.html();
            submitBtn.html('<span>Sending...</span> <i class="fas fa-spinner fa-spin ml-2"></i>');
            submitBtn.prop('disabled', true);
            
            $.ajax({
                url: "https://formsubmit.co/ajax/ethical.laxman@gmail.com",
                method: "POST",
                data: formData,
                dataType: "json",
                success: function(response) {
                    formMessage.removeClass('text-red-600 hidden').addClass('text-green-600').text('Message sent successfully! I\'ll get back to you soon.');
                    $('#contact-form')[0].reset();
                },
                error: function(xhr, status, error) {
                    formMessage.removeClass('text-green-600 hidden').addClass('text-red-600').text('Error sending message. Please try again.');
                },
                complete: function() {
                    // Restore button state
                    submitBtn.html(originalText);
                    submitBtn.prop('disabled', false);
                    
                    // Hide message after 5 seconds
                    setTimeout(function() {
                        formMessage.addClass('hidden');
                    }, 5000);
                }
            });
        });
    } catch (error) {
        console.error('Form submission failed:', error);
    }

    // Add hover effect to cards
    $('.card').hover(
        function() {
            $(this).addClass('shadow-2xl');
        },
        function() {
            $(this).removeClass('shadow-2xl');
        }
    );

    // Add animation to elements when they come into view
    $('.animated').waypoint(function(direction) {
        if (direction === 'down') {
            $(this.element).addClass('visible');
        }
    }, { offset: '90%' });

    // Set initial theme state based on system preference or local storage
    function setInitialTheme() {
        try {
            // Check if user has previously set a theme preference
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            console.log('Setting initial theme:', { savedTheme, prefersDark });
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                // Apply dark theme
                $('body').addClass('dark-mode');
                $('html').addClass('dark');
                $('.theme-checkbox').prop('checked', false); // Inverted for correct visual representation
                console.log('Applied dark theme');
            } else {
                // Apply light theme
                $('body').removeClass('dark-mode');
                $('html').removeClass('dark');
                $('.theme-checkbox').prop('checked', true); // Inverted for correct visual representation
                console.log('Applied light theme');
            }
        } catch (error) {
            console.error('Error setting initial theme:', error);
        }
    }
    
    // Set initial theme
    setInitialTheme();

    // Theme Toggle Functionality - Updated for new switch design
    $('.theme-checkbox').change(function() {
        try {
            console.log('Theme checkbox changed');
            
            // Sync both checkboxes
            $('.theme-checkbox').prop('checked', $(this).prop('checked'));
            
            // Determine the new state (inverted logic for correct visual representation)
            const isLightMode = $(this).prop('checked');
            
            console.log('Is light mode:', isLightMode);
            
            // Apply or remove dark mode classes (inverted logic)
            if (!isLightMode) { // If NOT light mode, then it's dark mode
                $('body').addClass('dark-mode');
                $('html').addClass('dark');
                localStorage.setItem('theme', 'dark');
                console.log('Dark mode enabled');
            } else { // If light mode
                $('body').removeClass('dark-mode');
                $('html').removeClass('dark');
                localStorage.setItem('theme', 'light');
                console.log('Light mode enabled');
            }
            
            console.log('Dark mode classes:', {
                body: $('body').hasClass('dark-mode'),
                html: $('html').hasClass('dark')
            });
            
            // Force reflow to ensure styles are applied
            document.body.offsetHeight;
        } catch (error) {
            console.error('Error in theme toggle:', error);
        }
    });

    // Easter Egg Functionality
    $('#easter-egg-btn').click(function() {
        $('#easter-egg-modal').removeClass('hidden').addClass('flex');
    });

    $('#close-easter-egg').click(function() {
        $('#easter-egg-modal').removeClass('flex').addClass('hidden');
    });

    // Close modal when clicking outside
    $('#easter-egg-modal').click(function(e) {
        if (e.target === this) {
            $(this).removeClass('flex').addClass('hidden');
        }
    });

    // Custom cursor effect with glowing and ripple effects
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        // Create ripple effect container
        const rippleContainer = document.createElement('div');
        rippleContainer.classList.add('cursor-ripple');
        document.body.appendChild(rippleContainer);
        rippleContainer.style.display = 'none';

        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Delayed movement for outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        
        // Scale effect on mouse down
        document.addEventListener('mousedown', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.2)';
            
            // Add ripple effect
            const posX = event.clientX;
            const posY = event.clientY;
            rippleContainer.style.left = `${posX}px`;
            rippleContainer.style.top = `${posY}px`;
            rippleContainer.style.display = 'block';
            
            // Remove ripple after animation
            setTimeout(() => {
                rippleContainer.style.display = 'none';
            }, 600);
        });
        
        document.addEventListener('mouseup', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Change cursor on hover elements
        const hoverElements = document.querySelectorAll('a, button, .card, .skill-item, .project-btn, .hire-btn, .portfolio-btn, .cv-btn, .social-link, .nav-link, .mobile-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
        
        // Hide cursor on mobile devices
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
        }
    }

    // Improved 3D Portfolio Items - Better mobile detection
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerWidth <= 768);
    }

    function init3DEffects() {
        // Check if we're on a mobile device or small screen
        const isMobile = isMobileDevice();
        
        if (!isMobile) {
            // Only apply 3D effects on desktop devices
            $('.portfolio-3d-item').each(function() {
                const item = $(this);
                
                item.on('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateY = (x - centerX) / 10;
                    const rotateX = (centerY - y) / 10;
                    
                    item.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
                });
                
                item.on('mouseleave', function() {
                    item.css('transform', 'perspective(1000px) rotateX(0) rotateY(0) scale(1)');
                });
            });
        } else {
            // Remove 3D effects on mobile devices by removing the class
            $('.portfolio-3d-item').removeClass('portfolio-3d-item').addClass('portfolio-card');
        }
    }
    
    // Initialize 3D effects
    init3DEffects();
    
    // Re-initialize on window resize with debounce
    let resizeTimeout;
    $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            init3DEffects();
        }, 250);
    });

    // Draggable Skills Implementation - Improved version
    // Removed dragging functionality as per user request - keeping only 3D hover effects

    // Add 3D hover effect to skill items
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerWidth <= 768);
    }

    // Only apply 3D effects on desktop devices
    if (!isMobileDevice()) {
        $('.skill-item').each(function() {
            const item = $(this);
            
            item.on('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 10;
                const rotateX = (centerY - y) / 10;
                
                item.find('.skill-icon').css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
            });
            
            item.on('mouseleave', function() {
                item.find('.skill-icon').css('transform', 'perspective(1000px) rotateX(0) rotateY(0)');
            });
        });
    }
});