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
        // Product Data
        const productData = {
            'IeDe Gateway X1': {
                subtitle: "Universal IoT Gateway",
                description: "The IeDe Gateway X1 is a robust, industrial-grade edge gateway designed to bridge the gap between legacy machinery and modern cloud platforms. It supports a wide range of protocols including MQTT, CoAP, Modbus, and HTTP, making it the perfect central hub for your diverse sensor network. With on-board edge processing capabilities, it filters and aggregates data locally, reducing bandwidth costs and latency.",
                specs: ["Protocols: MQTT, CoAP, Modbus TCP/RTU, HTTP", "Connectivity: Wi-Fi, Ethernet, 4G LTE", "Processor: Dual-Core ARM Cortex-A7", "OS: Linux-based (Yocto)", "Power: 12-24V DC"],
                image: "prod_gateway.svg",
                thumbnails: ["tech_gateway.svg", "prod_gateway.svg"],
                tech: true
            },
            'DataSense Cloud': {
                subtitle: "Real-time Analytics Dashboard",
                description: "DataSense Cloud is a comprehensive visualization platform that turns raw sensor data into actionable insights. Monitor your fleet health, track environmental conditions, and set up automated alerts for anomalies. Its intuitive drag-and-drop interface allows you to create custom dashboards tailored to your specific operational needs.",
                specs: ["Real-time Data Visualization", "Customizable Widgets", "Role-based Access Control", "Automated Email/SMS Alerts", "REST API for 3rd Party Integration"],
                image: "prod_dashboard.svg",
                thumbnails: ["tech_dashboard.svg", "prod_dashboard.svg"],
                tech: true
            },
            'SecureEdge Module': {
                subtitle: "Hardware Security Module",
                description: "Security is paramount in the IoT capability. The SecureEdge Module provides hardware-based encryption and key storage, ensuring that your data remains tamper-proof from the sensor to the cloud. Ideally suited for critical infrastructure and sensitive industrial applications.",
                specs: ["Encryption: AES-256, RSA-2048", "Secure Boot & Key Storage", "Interface: SPI, I2C", "Compliance: FIPS 140-2 Level 2"],
                image: "prod_module.svg",
                thumbnails: ["tech_module.svg", "prod_module.svg"],
                tech: true
            },
            'SmartEdge Controller': {
                subtitle: "AI-Enabled PLC",
                description: "The SmartEdge Controller combines the reliability of a traditional PLC with the intelligence of modern AI. Capable of running lightweight inference models locally, it can make split-second decisions based on visual or sensor inputs without relying on cloud connectivity.",
                specs: ["AI Accelerator: Neural Processing Unit (NPU)", "IO: 8x Digital In, 8x Digital Out, 4x Analog In", "Programming: Python, C++, IEC 61131-3", "Mounting: DIN Rail"],
                image: "prod_controller.svg",
                thumbnails: ["tech_controller.svg", "prod_controller.svg"],
                tech: true
            },
            'AgriSense Node': {
                subtitle: "Long-Range Soil Monitor",
                description: "Designed for vast agricultural fields, the AgriSense Node utilizes LoRaWAN technology to transmit soil moisture, temperature, and pH data over kilometers with minimal power consumption. Its ruggedized IP67 enclosure ensures durability in harsh weather conditions.",
                specs: ["Comms: LoRaWAN 1.0.3", "Battery Life: 5+ Years", "Sensors: Capacitive Moisture, Temp, pH", "Range: Up to 15km (LoS)"],
                image: "prod_agri.svg",
                thumbnails: ["tech_agri.svg", "prod_agri.svg"],
                tech: true
            },
            'VisionAI Cam': {
                subtitle: "Edge Computing Camera",
                description: "VisionAI Cam is a smart camera system that processes video streams directly on the device. Perfect for automated quality control on assembly lines, intrusion detection, or safety monitoring, it sends only relevant metadata to the server, preserving bandwidth and privacy.",
                specs: ["Resolution: 4K Ultra HD", "On-board AI: Object Detection, Face Recog", "Storage: SD Card + Cloud Sync", "Night Vision: IR Grid"],
                image: "prod_camera.svg",
                thumbnails: ["tech_camera.svg", "prod_camera.svg"],
                tech: true
            }
        };

        // Case Study Data
        const caseStudyData = {
            'factory': {
                title: "Smart Factory Automation",
                badge: "Industrial IoT",
                headerImage: "portfolio_factory.svg",
                challenge: "A leading automotive parts manufacturer faced frequent unplanned downtime due to motor failures on their assembly line. Manual inspections were infrequent and often missed early warning signs of overheating or vibration anomalies.",
                solution: "IeDe Technologies implemented a comprehensive sensor network using our **IeDe Gateway X1** and vibration sensors. We deployed local edge processing to analyze vibration patterns in real-time. Data was aggregated on our **DataSense Cloud** for trend analysis and predictive maintenance alerts.",
                results: [
                    "**40% Reduction** in unplanned downtime within the first 6 months.",
                    "**15% Increase** in overall equipment effectiveness (OEE).",
                    "Saved approximately **$250,000** annually in maintenance and lost production costs."
                ]
            },
            'agri': {
                title: "Precision Agriculture System",
                badge: "AgriTech",
                headerImage: "portfolio_agri.svg",
                challenge: "A large-scale grape vineyard struggled with water waste and uneven crop quality. Their blanket irrigation approach resulted in over-watering some zones while under-watering others, leading to fungal diseases and yield loss.",
                solution: "We deployed 500+ **AgriSense Nodes** across the vineyard, communicating via a private LoRaWAN network. The system monitored soil moisture at 3 distinct depths. This data fed into an automated irrigation control system that triggered watering only when specific zones dropped below optimal moisture levels.",
                results: [
                    "**25% Savings** in water usage per season.",
                    "**10% Increase** in grape yield quality (Brix levels).",
                    "Significant reduction in fungicide usage due to controlled humidity."
                ]
            },
            'city': {
                title: "Urban Traffic Management",
                badge: "Smart City",
                headerImage: "portfolio_city.svg",
                challenge: "The city's downtown district suffered from chronic gridlock during rush hours. Static traffic light timers were unable to adapt to fluctuating traffic volumes, causing long queues and increased emissions.",
                solution: "IeDe installed **VisionAI Cams** at 20 major intersections. The cameras utilized edge AI to count vehicles and detect queue lengths in real-time. This data was sent to a central **SmartEdge Controller** which dynamically adjusted traffic light green-times to prioritize high-congestion lanes.",
                results: [
                    "**30% Reduction** in average wait times at intersections.",
                    "**12% Decrease** in vehicle idling emissions.",
                    "Improved emergency vehicle response times by clearing paths automatically."
                ]
            }
        };

        // --- Product Modal Logic ---
        const modal = document.getElementById('product-modal');
        const modalClose = document.getElementById('product-modal-close');
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

    // Cookie Consent Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');

    if (cookieBanner && acceptCookiesBtn && declineCookiesBtn) {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie_consent');

        if (!consent) {
            // Show banner after a short delay
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 2000);
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'accepted');
            cookieBanner.classList.remove('show');
        });

        declineCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'declined');
            cookieBanner.classList.remove('show');
        });
    }

}); // End of DOMContentLoaded
