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
    // Product Data
    // Product Data
    const productData = {
        'IeDe Gateway X1': {
            subtitle: "Universal Industrial IoT Gateway",
            description: "The IeDe Gateway X1 is a robust, industrial-grade edge gateway designed to bridge the gap between legacy machinery and modern cloud platforms. It acts as the central nervous system for your factory floor, translating diverse protocols into a unified stream. With on-board edge processing capabilities, it filters and aggregates data locally, reducing bandwidth costs and latency while ensuring critical alerts are processed in milliseconds, even without internet connectivity.",
            specs: [
                "Protocols: MQTT, CoAP, Modbus TCP/RTU, OPC UA, HTTP/HTTPS",
                "Connectivity: Dual-Band Wi-Fi 6, Gigabit Ethernet (x2), 4G/5G LTE, Bluetooth 5.2",
                "Processor: Quad-Core ARM Cortex-A72 @ 1.5GHz",
                "Memory: 4GB LPDDR4 RAM, 32GB eMMC Storage",
                "OS: Yocto Linux (Secure Boot Enabled)",
                "Power: 9-36V DC Wide Range Input with Surge Protection",
                "Environmental: -20°C to 70°C Operating Temp, IP30 Metal Case"
            ],
            image: "prod_gateway.svg",
            thumbnails: ["tech_gateway.svg", "prod_gateway.svg"],
            tech: true
        },
        'DataSense Cloud': {
            subtitle: "Enterprise Real-time Analytics Dashboard",
            description: "DataSense Cloud is a comprehensive visualization platform that turns raw sensor data into actionable insights. It serves as your command center, allowing you to monitor fleet health, track environmental conditions, and analyze historical trends. Its intuitive drag-and-drop interface allows specific engineering teams to create custom dashboards tailored to their unique KPIs without writing a single line of code.",
            specs: [
                "Visualization: Real-time Time-Series Graphs, Heatmaps, Gauges",
                "Alerting: Multi-channel (SMS, Email, Webhook, Slack Integration)",
                "Security: Role-based Access Control (RBAC), SSO Support, End-to-End Encryption",
                "Integration: REST API, GraphQL, Export to CSV/JSON/PDF",
                "Scalability: Handles 1M+ data points per second",
                "Deployment: SaaS or On-Premise/Private Cloud"
            ],
            image: "prod_dashboard.svg",
            thumbnails: ["tech_dashboard.svg", "prod_dashboard.svg"],
            tech: true
        },
        'SecureEdge Module': {
            subtitle: "Hardware Security Module (HSM)",
            description: "Security is the foundation of any reliable IoT ecosystem. The SecureEdge Module provides hardware-based encryption and tamper-resistant key storage, insuring that your device identity and data integrity are never compromised. It offloads cryptographic operations from the main processor, improving overall system performance while meeting the highest industry security standards.",
            specs: [
                "Encryption: Hardware AES-256, RSA-4096, ECC P-384",
                "Key Storage: Secure Element for Private Keys & Certificates",
                "Interface: High-speed SPI, I2C, ISO 7816",
                "Compliance: FIPS 140-2 Level 3 Ready, Common Criteria EAL5+",
                "Features: True Random Number Generator (TRNG), Secure Boot Support",
                "Dimensions: Compact 4mm x 4mm WLCSP package"
            ],
            image: "prod_module.svg",
            thumbnails: ["tech_module.svg", "prod_module.svg"],
            tech: true
        },
        'SmartEdge Controller': {
            subtitle: "AI-Enabled Programmable Logic Controller",
            description: "The SmartEdge Controller combines the rugged reliability of a traditional PLC with the intelligence of modern AI. Capable of running lightweight inference models locally (TensorFlow Lite), it can make split-second decisions based on visual or complex sensor inputs. This enables applications like visual quality inspection or predictive anomaly detection directly at the edge.",
            specs: [
                "AI Accelerator: Dedicated Neural Processing Unit (NPU) @ 2.0 TOPS",
                "I/O: 8x Isolated Digital In, 8x Relay Out, 4x Analog In (4-20mA)",
                "Programming: Python, C++, IEC 61131-3 (Ladder Logic)",
                "Communication: RS-485, CAN Bus, Ethernet IP",
                "Mounting: Standard DIN Rail Format",
                "Safety: Watchdog Timer, Power-fail protection"
            ],
            image: "prod_controller.svg",
            thumbnails: ["tech_controller.svg", "prod_controller.svg"],
            tech: true
        },
        'AgriSense Node': {
            subtitle: "Long-Range Agricultural Soil Monitor",
            description: "Designed specifically for the vast and rugged terrain of agricultural fields, the AgriSense Node utilizes LoRaWAN technology to transmit soil moisture, temperature, and pH data over ranges up to 15km. Its ultra-low power design ensures years of maintenance-free operation, while its industrial-grade probe delivers lab-quality accuracy for precision irrigation.",
            specs: [
                "Communication: LoRaWAN 1.0.3 Class A/C",
                "Battery Life: 5+ Years (1 transmission/hour) on user-replaceable Li-SOCl2",
                "Sensors: Multi-depth Capacitive Moisture, Soil Temp, pH, EC",
                "Range: Up to 15km (Line of Sight), 5km (Urban)",
                "Enclosure: IP67 Waterproof & UV Resistant Polycarbonate",
                "Installation: Plug-and-Play with screw anchor"
            ],
            image: "prod_agri.svg",
            thumbnails: ["tech_agri.svg", "prod_agri.svg"],
            tech: true
        },
        'VisionAI Cam': {
            subtitle: "Intelligent Edge Computing Camera",
            description: "VisionAI Cam is a smart camera system that processes video streams directly on the device. Perfect for automated quality control on assembly lines, intrusion detection, or safety monitoring, it filters out the noise and sends only relevant metadata or alert clips to the server. This 'Privacy by Design' approach preserves bandwidth and ensures compliance with data protection regulations.",
            specs: [
                "Sensor: 8MP Sony IMX Sensor with HDR",
                "Resolution: 4K Ultra HD @ 30fps",
                "Processing: Quad-core AI Processor for Object Detection, Face Recog, LPR",
                "Storage: 128GB MicroSD Card + Auto Cloud Sync",
                "Night Vision: Adaptive IR Grid (20m range)",
                "Connectivity: PoE (Power over Ethernet), Wi-Fi"
            ],
            image: "prod_camera.svg",
            thumbnails: ["tech_camera.svg", "prod_camera.svg"],
            tech: true
        }
    };

    // Case Study Data
    const caseStudyData = {
        'factory': {
            title: "Smart Factory Automation Upgrade",
            badge: "Industrial IoT",
            headerImage: "portfolio_factory.svg",
            challenge: "A leading automotive parts manufacturer faced frequent unplanned downtime due to unpredictable motor failures on their main assembly line. Manual vibration analysis inspections were infrequent (monthly) and labor-intensive, often missing early warning signs of bearing wear or overheating, leading to costly production stoppages.",
            solution: "IeDe Technologies implemented a comprehensive sensor network using our **IeDe Gateway X1** paired with high-frequency wireless vibration sensors. We deployed local edge processing algorithms to analyze FFT (Fast Fourier Transform) vibration patterns in real-time. Data was aggregated on our **DataSense Cloud** for long-term trend analysis, and we integrated with their existing ERP system to trigger automatic work orders when anomalies were detected.",
            results: [
                "**40% Reduction** in unplanned downtime within the first 6 months of deployment.",
                "**15% Increase** in Overall Equipment Effectiveness (OEE) due to optimized maintenance schedules.",
                "**ROI achieved in 3 months** by saving approximately $250,000 annually in maintenance and lost production costs."
            ]
        },
        'agri': {
            title: "Precision Agriculture & Irrigation System",
            badge: "AgriTech",
            headerImage: "portfolio_agri.svg",
            challenge: "A large-scale grape vineyard struggled with water resource management and uneven crop quality. Their traditional timer-based blanket irrigation approach resulted in over-watering low-lying zones while under-watering hilltops, leading to fungal diseases in some areas and moisture stress in others, affecting the vintage consistency.",
            solution: "We deployed 500+ **AgriSense Nodes** across the topography of the vineyard, communicating via a private, solar-powered LoRaWAN network gateway. The system monitored soil moisture at 3 distinct depths (10cm, 30cm, 60cm). This real-time data fed into an automated irrigation control system that triggered valve actuators to water specific zones only when precise moisture thresholds were breached.",
            results: [
                "**25% Savings** in water usage per season, conserving a critical resource.",
                "**10% Increase** in grape yield quality (Brix levels) due to optimal stress management.",
                "Significant reduction in fungicide usage due to controlled humidity levels in canopy."
            ]
        },
        'city': {
            title: "Urban Traffic Management System",
            badge: "Smart City",
            headerImage: "portfolio_city.svg",
            challenge: "The city's downtown commercial district suffered from chronic traffic gridlock during rush hours. The existing static traffic light timers were unable to adapt to real-world fluctuating traffic volumes, causing long queues, driver frustration, and increased carbon emissions from idling vehicles.",
            solution: "IeDe installed **VisionAI Cams** at 20 major intersections. The cameras utilized on-device edge AI models to count vehicles, classify types (car, truck, bus), and detect queue lengths in real-time. This anonymized metadata was transmitted to a central **SmartEdge Controller** which dynamically adjusted traffic light green-times using an adaptive algorithm to prioritize high-congestion lanes and create 'green waves'.",
            results: [
                "**30% Reduction** in average wait times at key intersections during peak hours.",
                "**12% Decrease** in vehicle idling emissions, contributing to city sustainability goals.",
                "Improved emergency vehicle response times by automatically detecting sirens and clearing paths."
            ]
        }
    };

    // --- Product Modal Logic ---
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

                // Determine main image source
                const mainImageSrc = data.image || (data.thumbnails && data.thumbnails.length > 0 ? data.thumbnails[0] : '');
                pmImage.src = mainImageSrc;
                pmImage.alt = title;

                // Create thumbnails
                const images = data.thumbnails || [];
                images.forEach(imgSrc => {
                    const thumb = document.createElement('img');
                    thumb.src = imgSrc;
                    thumb.className = 'pm-thumb';
                    if (imgSrc === mainImageSrc) thumb.classList.add('active');

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

    // --- Case Study Modal Logic ---
    const csModal = document.getElementById('case-study-modal');
    const csModalClose = document.getElementById('cs-modal-close');
    const csTriggers = document.querySelectorAll('.case-study-trigger');

    // Canvas elements
    const csHeaderImg = document.getElementById('cs-header-img');
    const csBadge = document.getElementById('cs-badge');
    const csTitle = document.getElementById('cs-title');
    const csChallenge = document.getElementById('cs-challenge');
    const csSolution = document.getElementById('cs-solution');
    const csResults = document.getElementById('cs-results');

    const closeCsModal = () => {
        if (csModal) csModal.classList.remove('open');
    };

    if (csModalClose) {
        csModalClose.addEventListener('click', closeCsModal);
    }

    if (csModal) {
        csModal.addEventListener('click', (e) => {
            if (e.target === csModal) closeCsModal();
        });
    }

    const formatText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    csTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Stop propagation to prevent card click issues if any
            e.stopPropagation();

            const id = btn.getAttribute('data-id');
            const data = caseStudyData[id];

            if (data && csModal) {
                // Populate
                csTitle.innerText = data.title;
                csBadge.innerText = data.badge;

                csChallenge.innerHTML = formatText(data.challenge);
                csSolution.innerHTML = formatText(data.solution);

                // Results
                csResults.innerHTML = '';
                data.results.forEach(res => {
                    const li = document.createElement('li');
                    li.innerHTML = formatText(res);
                    csResults.appendChild(li);
                });

                // Header Image
                csHeaderImg.style.backgroundImage = `url('${data.headerImage}')`;

                csModal.classList.add('open');
            }
        });
    });

    if (themeToggle) {
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
            if (targetId === '#' || targetId === '') return;
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
