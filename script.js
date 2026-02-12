document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            // navToggle.classList.remove('active'); // Optional if toggle icon animates
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            // Toggle active state
            question.classList.toggle('active');

            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }

            // Optional: Close others
            faqQuestions.forEach(item => {
                if (item !== question) {
                    item.classList.remove('active');
                    item.nextElementSibling.style.maxHeight = 0;
                }
            });
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger Count Animation if it's the stats section
                if (entry.target.id === 'stats' || entry.target.closest('#stats')) {
                    startCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });

    // Stats Counter Animation
    let counted = false;
    function startCounters() {
        if (counted) return;
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
        counted = true;
    }

    // Observe Stats Section
    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);


    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const productData = {
            'IeDe Gateway X1': {
                subtitle: 'Universal Industrial IoT Gateway',
                gallery: ['prod_gateway.svg', 'tech_gateway.svg'],
                description: 'The X1 is a ruggedized edge gateway designed to bridge the gap between legacy industrial equipment and modern cloud infrastructure. It supports a wide range of protocols ensuring compatibility with 99% of factory floor devices.',
                specs: ['Protocols: MQTT, CoAP, Modbus', 'Connectivity: Wi-Fi 6, 4G/5G', 'Processor: Quad-core ARM', 'Operating Temp: -40°C to 85°C']
            },
            'DataSense Cloud': {
                subtitle: 'Intelligent Analytics Platform',
                gallery: ['prod_dashboard.svg', 'tech_dashboard.svg'],
                description: 'DataSense Cloud transforms raw sensor data into actionable insights. Customizable dashboards, real-time alerting, and predictive maintenance models help you optimize operations.',
                specs: ['Real-time Visualization', 'RBAC Security', 'Automated Reporting', 'API Integration']
            },
            'SecureEdge Module': {
                subtitle: 'Hardware Root-of-Trust',
                gallery: ['prod_module.svg', 'tech_module.svg'],
                description: 'Ensure the integrity of your IoT network with the SecureEdge Module. It provides hardware-based key storage and cryptographic acceleration to protect against spoofing.',
                specs: ['AES-256, RSA-4096', 'Interface: SPI, I2C', 'FIPS 140-2 Level 3', 'Secure Boot']
            },
            'SmartEdge Controller': {
                subtitle: 'AI-Enabled PLC',
                gallery: ['prod_controller.svg', 'tech_controller.svg'],
                description: 'A next-gen PLC that combines traditional logic control with edge AI inferencing. Run TensorFlow Lite models directly on the controller.',
                specs: ['AI Accelerator: 4 TOPS', '16 Digital I/O', 'IEC 61131-3 & Python', 'DIN Rail Mount']
            },
            'AgriSense Node': {
                subtitle: 'Long-Range Environmental Sensor',
                gallery: ['prod_agri.svg', 'tech_agri.svg'],
                description: 'Designed for precision agriculture, the AgriSense Node monitors soil health and micro-climates. Ultra-low power design ensures years of operation.',
                specs: ['LoRaWAN (15km+)', 'Sensors: Moisture, pH, NPK', 'Battery: 5+ Years', 'IP67 Waterproof']
            },
            'VisionAI Cam': {
                subtitle: 'Edge Computing Smart Camera',
                gallery: ['prod_camera.svg', 'tech_camera.svg'],
                description: 'Automate quality control and safety monitoring with VisionAI. This smart camera processes video streams locally to detect defects in real-time.',
                specs: ['4K HDR Resolution', 'Onboard Object Detection', 'Local NVMe Storage', '60 FPS Processing']
            }
        };

        // Product Modal Logic
        const productModal = document.getElementById('product-modal');
        const productModalClose = document.getElementById('product-modal-close');
        const learnMoreBtns = document.querySelectorAll('.product-card .btn-text');

        // Elements to populate
        const pmImage = document.getElementById('pm-image');
        const pmThumbnails = document.getElementById('pm-thumbnails');
        const pmTitle = document.getElementById('pm-title');
        const pmSubtitle = document.getElementById('pm-subtitle');
        const pmDescription = document.getElementById('pm-description');
        const pmSpecs = document.getElementById('pm-specs');

        const closeProductModal = () => {
            if (productModal) productModal.classList.remove('open');
        };

        if (productModalClose) {
            productModalClose.addEventListener('click', closeProductModal);
        }

        // Close on outside click
        if (productModal) {
            productModal.addEventListener('click', (e) => {
                if (e.target === productModal) closeProductModal();
            });
        }

        learnMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.product-card');
                const title = card.querySelector('h3').innerText;
                const data = productData[title];

                if (data && productModal) {
                    pmTitle.innerText = title;
                    pmSubtitle.innerText = data.subtitle;
                    pmDescription.innerText = data.description;

                    // Specs
                    pmSpecs.innerHTML = '';
                    data.specs.forEach(spec => {
                        const li = document.createElement('li');
                        li.innerText = spec;
                        pmSpecs.appendChild(li);
                    });

                    // Gallery Logic
                    pmThumbnails.innerHTML = '';
                    // Set first image as main
                    pmImage.src = data.gallery[0];
                    pmImage.alt = title; // Keep alt text for accessibility

                    // Create thumbnails
                    data.gallery.forEach(imgSrc => {
                        const thumb = document.createElement('img');
                        thumb.src = imgSrc;
                        thumb.className = 'pm-thumb';
                        if (imgSrc === data.gallery[0]) thumb.classList.add('active');

                        thumb.addEventListener('click', () => {
                            pmImage.src = imgSrc;
                            document.querySelectorAll('.pm-thumb').forEach(t => t.classList.remove('active'));
                            thumb.classList.add('active');
                        });

                        pmThumbnails.appendChild(thumb);
                    });

                    productModal.classList.add('open');
                }
            });
        });

        // Check saved preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerText = '☀️';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerText = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth Scrolling for Anchor Links (Optional polish, natively supported by css html { scroll-behavior: smooth })
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Account for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Submission Placeholder
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        const showError = (input, message) => {
            const formGroup = input.parentElement;
            let errorElement = formGroup.querySelector('.error-msg');

            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-msg';
                formGroup.appendChild(errorElement);
            }

            errorElement.innerText = message;
            formGroup.classList.add('error');
        };

        const clearError = (input) => {
            const formGroup = input.parentElement;
            formGroup.classList.remove('error');
        };

        // Real-time validation
        ['name', 'email', 'message'].forEach(id => {
            document.getElementById(id).addEventListener('input', function () {
                clearError(this);
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            let isValid = true;

            // Clear all previous errors
            clearError(nameInput);
            clearError(emailInput);
            clearError(messageInput);

            // Name Validation
            if (name === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError(nameInput, 'Name must be at least 2 characters');
                isValid = false;
            }

            // Email Validation
            if (email === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            // Message Validation
            if (message === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError(messageInput, 'Message must be at least 10 characters');
                isValid = false;
            }

            if (!isValid) return;

            const btn = contactForm.querySelector('button');

            // Construct Mailto Link
            const subject = encodeURIComponent(`New Contact from Website: ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:info@iedetech.com?subject=${subject}&body=${body}`;

            btn.innerText = 'Opening Email Client...';

            // Open default email client
            window.location.href = mailtoLink;

            // Reset button after short delay
            setTimeout(() => {
                btn.innerText = 'Send Message';
                contactForm.reset();
            }, 2000);
        });
    }

    // Visitor Counter Simulation
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        // Check if counter exists in local storage
        let count = localStorage.getItem('iede_visitor_count');

        if (!count) {
            // Initialize random starting number for realism
            count = 1240;
        } else {
            count = parseInt(count);
        }

        // Increment for this session
        count++;
        localStorage.setItem('iede_visitor_count', count);

        // Update display with animation effect
        visitorCountElement.innerText = count.toLocaleString();
    }

}); // End of DOMContentLoaded
