/**
 * Portfolio Dynamic App
 * Loads content from JSON and renders dynamically
 * No ES6 modules - works with file:// protocol
 */

(function() {
    'use strict';

    // Global state
    let contentData = null;
    let currentLang = localStorage.getItem('portfolio-lang') || 'pt';
    let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
    
    // Language configuration with SVG flags
    const LANGUAGES = {
        pt: { 
            flag: 'assets/icons/brasil.svg', 
            code: 'PT', 
            htmlLang: 'pt-BR', 
            name: 'Português' 
        },
        en: { 
            flag: 'assets/icons/us.svg', 
            code: 'EN', 
            htmlLang: 'en-US', 
            name: 'English' 
        },
        es: { 
            flag: 'assets/icons/es.svg', 
            code: 'ES', 
            htmlLang: 'es-ES', 
            name: 'Español' 
        }
    };
    
    const LANG_ORDER = ['pt', 'en', 'es'];

    // SVG Icons
    const ICONS = {
        shopping: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
        database: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
        monitoring: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        payment: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
        education: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'
    };

    // Initialize app
    function init() {
        console.log('Initializing portfolio...');
        applyTheme(currentTheme);
        updateLanguageUI(); // Update language UI on init
        loadContent();
        setupEventListeners();
        updateYear();
    }

    // Load JSON content
    function loadContent() {
        fetch('data/content.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load content');
                return response.json();
            })
            .then(data => {
                contentData = data;
                renderAllContent();
                initScrollAnimations();
                console.log('Content loaded and rendered successfully');
            })
            .catch(error => {
                console.error('Error loading content:', error);
                document.body.innerHTML = '<div style="padding: 2rem; text-align: center; font-family: sans-serif;"><h1>⚠️ Erro ao carregar conteúdo</h1><p>Por favor, use um servidor local (HTTP) para visualizar este portfólio.</p><p>Execute: <code>python -m http.server 8000</code></p><p>Ou use: <code>start-server.bat</code></p></div>';
            });
    }

    // Render all content
    function renderAllContent() {
        renderNavigation();
        renderHero();
        renderAbout();
        renderSkills();
        renderExperience();
        renderProjects();
        renderEducation();
        renderContact();
        renderFooter();
    }

    // Render navigation
    function renderNavigation() {
        const nav = contentData.navigation[currentLang];
        const navMenu = document.getElementById('navMenu');
        
        navMenu.innerHTML = nav.map(item => 
            `<li><a href="#${item.id}">${item.label}</a></li>`
        ).join('');
    }

    // Render hero section
    function renderHero() {
        const hero = contentData.hero[currentLang];
        const photo = contentData.hero.photo;
        const container = document.getElementById('heroContent');
        
        container.innerHTML = `
            <div class="hero-photo">
                <img src="${photo}" alt="${hero.name}" class="hero-image">
            </div>
            <div class="hero-text">
                <h1 class="hero-title">
                    <span class="hero-greeting">${hero.greeting}</span>
                    <span class="hero-name">${hero.name}</span>
                </h1>
                <h2 class="hero-subtitle">${hero.title}</h2>
                <p class="hero-description">${hero.description}</p>
                <div class="hero-cta">
                    <a href="#contato" class="btn btn-primary">${hero.cta_primary}</a>
                    <a href="#projetos" class="btn btn-secondary">${hero.cta_secondary}</a>
                </div>
            </div>
        `;
    }

    // Render about section
    function renderAbout() {
        const about = contentData.about[currentLang];
        const container = document.getElementById('aboutContainer');
        
        const paragraphsHTML = about.paragraphs.map(p => `<p>${p}</p>`).join('');
        const statsHTML = about.stats.map(stat => `
            <div class="stat-card">
                <span class="stat-number">${stat.number}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
        
        container.innerHTML = `
            <h2 class="section-title animate-on-scroll">${about.title}</h2>
            <div class="about-content animate-on-scroll">
                <div class="about-text">${paragraphsHTML}</div>
                <div class="about-stats">${statsHTML}</div>
            </div>
        `;
    }

    // Render skills section
    function renderSkills() {
        const skills = contentData.skills[currentLang];
        const container = document.getElementById('skillsContainer');
        
        const categoriesHTML = skills.categories.map(category => `
            <div class="skill-category animate-on-scroll">
                <h3 class="skill-category-title">${category.title}</h3>
                <div class="skill-list">
                    ${category.items.map(item => `
                        <div class="skill-item">
                            <div class="skill-header">
                                <span class="skill-name">${item.name}</span>
                                <span class="skill-level">${item.level}%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-progress="${item.level}"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        container.innerHTML = `
            <h2 class="section-title animate-on-scroll">${skills.title}</h2>
            <div class="skills-grid">${categoriesHTML}</div>
        `;
    }

    // Render experience section
    function renderExperience() {
        const experience = contentData.experience[currentLang];
        const container = document.getElementById('experienceContainer');
        
        const itemsHTML = experience.items.map(item => `
            <div class="timeline-item animate-on-scroll">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <span class="timeline-date">${item.date}</span>
                    <h3 class="timeline-title">${item.title}</h3>
                    <p class="timeline-company">${item.company}</p>
                    <ul class="timeline-description">
                        ${item.description.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                    <div class="timeline-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = `
            <h2 class="section-title animate-on-scroll">${experience.title}</h2>
            <div class="timeline">${itemsHTML}</div>
        `;
    }

    // Render projects section
    function renderProjects() {
        const projects = contentData.projects[currentLang];
        const container = document.getElementById('projectsContainer');
        
        const itemsHTML = projects.items.map(project => `
            <article class="project-card animate-on-scroll">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-icon">
                        ${ICONS[project.icon] || ICONS.database}
                    </div>
                </div>
                <div class="project-content">
                    <p class="project-context"><strong>${currentLang === 'pt' ? 'Contexto' : 'Context'}:</strong> ${project.context}</p>
                    <p class="project-challenge"><strong>${currentLang === 'pt' ? 'Desafio Técnico' : 'Technical Challenge'}:</strong> ${project.challenge}</p>
                    <p class="project-solution"><strong>${currentLang === 'pt' ? 'Solução' : 'Solution'}:</strong> ${project.solution}</p>
                    <div class="project-results">
                        <strong>${currentLang === 'pt' ? 'Resultados' : 'Results'}:</strong>
                        <ul>
                            ${project.results.map(result => `<li>${result}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="project-tech">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </article>
        `).join('');
        
        container.innerHTML = `
            <h2 class="section-title animate-on-scroll">${projects.title}</h2>
            <div class="projects-grid">${itemsHTML}</div>
        `;
    }

    // Render education section
    function renderEducation() {
        const education = contentData.education[currentLang];
        const container = document.getElementById('educationContainer');
        
        const itemsHTML = education.items.map(item => `
            <div class="education-card animate-on-scroll">
                <div class="education-icon">${ICONS.education}</div>
                <h3 class="education-degree">${item.degree}</h3>
                <p class="education-institution">${item.institution}</p>
                <p class="education-date">${item.date}</p>
                <p class="education-highlight">${item.highlight}</p>
            </div>
        `).join('');
        
        container.innerHTML = `
            <h2 class="section-title animate-on-scroll">${education.title}</h2>
            <div class="education-grid">${itemsHTML}</div>
        `;
    }

    // Render contact section
    function renderContact() {
        const contact = contentData.contact[currentLang];
        const container = document.getElementById('contactContainer');
        
        container.innerHTML = `
            <h2 class="section-title animate-on-scroll">${contact.title}</h2>
            <div class="contact-content animate-on-scroll">
                <p class="contact-description">${contact.description}</p>
                <div class="contact-links">
                    <a href="mailto:${contact.email}" class="contact-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <span>Email</span>
                    </a>
                    <a href="${contact.github}" class="contact-link" target="_blank" rel="noopener noreferrer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                    </a>
                    <a href="${contact.linkedin}" class="contact-link" target="_blank" rel="noopener noreferrer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span>LinkedIn</span>
                    </a>
                    <a href="${contact.cv_url}" class="contact-link" download>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        <span>${contact.cv_text}</span>
                    </a>
                </div>
                <div class="contact-cta">
                    <p class="contact-cta-text">${contact.cta}</p>
                </div>
            </div>
        `;
    }

    // Render footer
    function renderFooter() {
        const footer = contentData.footer[currentLang];
        const hero = contentData.hero[currentLang];
        
        document.getElementById('footerName').textContent = hero.name + '.';
        document.getElementById('footerRights').textContent = footer.rights;
        document.getElementById('footerBuilt').textContent = footer.built;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        
        // Language toggle
        document.getElementById('langToggle').addEventListener('click', toggleLanguage);
        
        // Mobile menu
        const menuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu on link click
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.closest('#navMenu')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });
        
        // Header scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.boxShadow = 'var(--shadow-sm)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Toggle theme
    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('portfolio-theme', currentTheme);
    }

    // Apply theme
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    // Toggle language
    // Toggle language: PT -> EN -> ES -> PT (cycle through 3 languages)
    function toggleLanguage() {
        const currentIndex = LANG_ORDER.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % LANG_ORDER.length;
        const nextLang = LANG_ORDER[nextIndex];
        
        console.log('🔄 Toggling language:', currentLang, '→', nextLang);
        console.log('   Index:', currentIndex, '→', nextIndex);
        console.log('   Order:', LANG_ORDER);
        
        currentLang = nextLang;
        localStorage.setItem('portfolio-lang', currentLang);
        
        updateLanguageUI();
        
        if (contentData) {
            renderAllContent();
            initScrollAnimations();
        }
    }
    
    // Update language UI (flag and code) - Shows CURRENT language
    function updateLanguageUI() {
        const langConfig = LANGUAGES[currentLang];
        if (!langConfig) {
            console.error('Language not found:', currentLang);
            currentLang = 'pt'; // fallback
            return;
        }
        
        document.documentElement.lang = langConfig.htmlLang;
        
        const flagIcon = document.getElementById('flagIcon');
        const langText = document.getElementById('langText');
        
        if (flagIcon && langText) {
            // Use SVG image for flags
            flagIcon.innerHTML = `<img src="${langConfig.flag}" alt="${langConfig.name}" class="flag-svg">`;
            langText.textContent = langConfig.code;
            
            console.log('✅ Language UI updated to:', currentLang, '(' + langConfig.name + ')');
        } else {
            console.error('❌ Language UI elements not found');
        }
    }

    // Initialize scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-category')) {
                        const skillBars = entry.target.querySelectorAll('.skill-progress');
                        skillBars.forEach(function(bar) {
                            const progress = bar.getAttribute('data-progress');
                            setTimeout(function() {
                                bar.style.width = progress + '%';
                            }, 100);
                        });
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
            observer.observe(el);
        });
    }

    // Update year
    function updateYear() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    // Start app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

