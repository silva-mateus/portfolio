/**
 * TERMINAL PORTFOLIO - JavaScript
 * Backend Engineer Theme with Interactive Elements
 */

(function() {
    'use strict';

    // ==================== GLOBAL STATE ====================
    let contentData = null;
    let currentLang = localStorage.getItem('portfolio-lang') || 'pt';
    let terminalHeight = 350; // Default terminal height
    let terminalSizes = ['small', 'medium', 'large']; // small=350px, medium=500px, large=650px
    let currentTerminalSize = 0; // Index of terminalSizes
    
    // Detect OS for keyboard shortcuts
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const terminalShortcut = isMac ? '⌘⇧K' : 'Ctrl+Shift+K';
    
    // Language configuration
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
        music: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
        education: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'
    };

    // ==================== EASTER EGGS ====================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    // Terminal commands
    function getUptime() {
        const start = new Date(2019, 10, 1);
        const now = new Date();
        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        if (months < 0) { years--; months += 12; }
        return { years, months };
    }

    const terminalCommands = {
        help: `
Available commands:
  help        - Shows this help
  whoami      - Display current user identity
  env         - Print environment variables
  neofetch    - System information
  uptime      - Show system uptime
  leaderboard - Show ranking
  clear       - Clears terminal
  play        - Start Coffee Machine Debugger
            `,
        whoami: `mateus.silva

Login:    mateus.silva
Name:     Mateus Morais Silva
Role:     Software Development Engineer II
Email:    thi.hero2012@gmail.com
LinkedIn: linkedin.com/in/mhassilvamat/
GitHub:   github.com/silva-mateus`,
        env: `USER=mateus.silva
ROLE=software_development_engineer_ii
PRODUCT=ascendon
SHELL=/bin/bash
EDITOR=code
LANG=en_US.UTF-8
DOTNET_ROOT=/usr/share/dotnet
ASPNETCORE_ENVIRONMENT=Production
AWS_DEFAULT_REGION=us-east-1
DOCKER_HOST=unix:///var/run/docker.sock
GIT_AUTHOR_NAME=Mateus Silva
GIT_AUTHOR_EMAIL=thi.hero2012@gmail.com
STACK=csharp,dotnet,aspnetcore,sql_server,postgresql
LANGUAGES=csharp,python,cpp,sql
CLOUD=aws
TOOLS=docker,git,linux,ci_cd,terraform,xunit`,
        neofetch: function() {
            const { years, months } = getUptime();
            return `    ┌──────────────────┐     mateus@portfolio
    │  $ _             │     ──────────────────
    │                  │     Role: SDE II @ CSG
    │  sde ii          │     Uptime: ${years} years, ${months} months
    │                  │     OS: Linux
    └──────────────────┘     Shell: bash
    ───────────────────      Packages: dotnet, python3, awscli, docker, git
         ┌──────┐            IDE: VSCode
         └──────┘            Product: Ascendon`;
        },
        uptime: function() {
            const { years, months } = getUptime();
            const now = new Date();
            const time = now.toTimeString().split(' ')[0];
            const l1 = (0.5 + Math.random() * 0.5).toFixed(2);
            const l2 = (0.5 + Math.random() * 0.5).toFixed(2);
            const l3 = (0.5 + Math.random() * 0.5).toFixed(2);
            return ` ${time} up ${years} years, ${months} months, 1 user, load average: ${l1}, ${l2}, ${l3}`;
        },
        clear: ''
    };

    // ==================== INITIALIZATION ====================
    function init() {
        console.log('%c⚡ Terminal Portfolio Loaded', 'color: #00ffff; font-size: 16px; font-weight: bold;');
        console.log('%cType "help" in the terminal console for Easter eggs!', 'color: #00ff88; font-size: 12px;');
        
        updateLanguageUI();
        loadContent(); // This will call renderAllContent which will call initTypingAnimation
        setupEventListeners();
        updateYear();
        initEasterEggs();
        initFaviconEasterEgg();
        updateTerminalShortcut();
        
        // Console message
        console.log(`%c🚀 Pro tip: Press ${terminalShortcut} to open terminal`, 'color: #a855f7; font-size: 12px;');
    }
    
    // Update terminal shortcut text
    function updateTerminalShortcut() {
        const shortcutEl = document.getElementById('terminalShortcut');
        if (shortcutEl) {
            shortcutEl.textContent = terminalShortcut;
        }
    }

    // ==================== CONTENT LOADING ====================
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
                initTypingAnimation();
                console.log('%c✅ Content loaded successfully', 'color: #00ff88;');
            })
            .catch(error => {
                console.error('Error loading content:', error);
                document.body.innerHTML = '<div style="padding: 2rem; text-align: center; font-family: monospace; color: #00ff88; background: #0a0a0f; min-height: 100vh; display: flex; align-items: center; justify-content: center;"><div><h1 style="color: #00ffff;">⚠️ Error Loading Portfolio</h1><p>Please use a local server (HTTP) to view this portfolio.</p><p>Run: <code style="background: #1a1a2e; padding: 0.5rem; border-radius: 4px;">python -m http.server 8000</code></p><p>Or use: <code style="background: #1a1a2e; padding: 0.5rem; border-radius: 4px;">.\\start-dev.ps1</code></p></div></div>';
            });
    }

    // ==================== RENDER FUNCTIONS ====================
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

    function renderNavigation() {
        const nav = contentData.navigation[currentLang];
        const navMenu = document.getElementById('navMenu');
        navMenu.innerHTML = nav.map(item => 
            `<li><a href="#${item.id}">${item.label}</a></li>`
        ).join('');
    }

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
                    <span class="hero-name" id="heroName">${hero.name}</span>
                </h1>
                <h2 class="hero-subtitle" id="heroSubtitle">${hero.title}</h2>
                <p class="hero-description">${hero.description}</p>
                <div class="hero-cta">
                    <a href="#contato" class="btn btn-primary">${hero.cta_primary}</a>
                    <a href="#projetos" class="btn btn-secondary">${hero.cta_secondary}</a>
                </div>
            </div>
        `;
    }

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
                    <p class="project-context"><strong>${currentLang === 'pt' ? 'Contexto' : currentLang === 'en' ? 'Context' : 'Contexto'}:</strong> ${project.context}</p>
                    <p class="project-challenge"><strong>${currentLang === 'pt' ? 'Desafio' : currentLang === 'en' ? 'Challenge' : 'Desafío'}:</strong> ${project.challenge}</p>
                    <p class="project-solution"><strong>${currentLang === 'pt' ? 'Solução' : currentLang === 'en' ? 'Solution' : 'Solución'}:</strong> ${project.solution}</p>
                    <div class="project-results">
                        <strong>${currentLang === 'pt' ? 'Resultados' : currentLang === 'en' ? 'Results' : 'Resultados'}:</strong>
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

    function renderContact() {
        const contact = contentData.contact[currentLang];
        const container = document.getElementById('contactContainer');
        
        container.innerHTML = `
            <h2 class="section-title animate-on-scroll">${contact.title}</h2>
            <div class="contact-content animate-on-scroll">
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
            </div>
        `;
    }

    function renderFooter() {
        const footer = contentData.footer[currentLang];
        const hero = contentData.hero[currentLang];
        
        document.getElementById('footerName').textContent = hero.name + '.';
        document.getElementById('footerRights').textContent = footer.rights;
        document.getElementById('footerBuilt').textContent = footer.built;
    }

    // ==================== EVENT LISTENERS ====================
    function setupEventListeners() {
        // Terminal toggle
        document.getElementById('terminalToggle').addEventListener('click', toggleTerminal);
        
        // Terminal close
        document.getElementById('terminalClose').addEventListener('click', closeTerminal);
        
        // Terminal resize
        document.getElementById('terminalResize').addEventListener('click', resizeTerminal);
        
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
                header.style.boxShadow = '0 4px 30px rgba(0, 255, 255, 0.2)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(0, 255, 255, 0.1)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ==================== TERMINAL FUNCTIONS ====================
    function resizeTerminal() {
        currentTerminalSize = (currentTerminalSize + 1) % terminalSizes.length;
        const terminal = document.getElementById('terminal-console');
        
        const heights = {
            small: '350px',
            medium: '500px',
            large: '650px'
        };
        
        terminal.style.height = heights[terminalSizes[currentTerminalSize]];
        
        console.log(`Terminal resized to ${terminalSizes[currentTerminalSize]}`);
    }

    // ==================== LANGUAGE ====================
    function toggleLanguage() {
        const currentIndex = LANG_ORDER.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % LANG_ORDER.length;
        const nextLang = LANG_ORDER[nextIndex];
        
        // Check if hero was already animated
        const heroWasAnimated = document.getElementById('heroName')?.dataset.typed === 'true';
        
        currentLang = nextLang;
        localStorage.setItem('portfolio-lang', currentLang);
        
        updateLanguageUI();
        
        if (contentData) {
            // Store which titles were already typed (to not re-animate them)
            const typedTitles = new Set();
            document.querySelectorAll('.section-title[data-typed]').forEach(el => {
                // Get the section ID to preserve typed state
                const section = el.closest('.section');
                if (section) {
                    typedTitles.add(section.id);
                }
            });
            
            // Render content in NEW language first
            renderAllContent();
            
            // CRITICAL: Restore hero animation state IMMEDIATELY after render
            if (heroWasAnimated) {
                const heroName = document.getElementById('heroName');
                const heroSubtitle = document.getElementById('heroSubtitle');
                
                if (heroName) {
                    heroName.dataset.typed = 'true';
                    // Make hero name text immediately visible (no animation)
                    makeTextImmediatelyVisible(heroName);
                }
                
                if (heroSubtitle) {
                    heroSubtitle.dataset.typed = 'true';
                    // Make hero subtitle text immediately visible (no animation)
                    makeTextImmediatelyVisible(heroSubtitle);
                }
            }
            
            // IMPORTANT: Re-apply typed state to section titles BEFORE typePageText
            // This prevents typePageText from trying to animate already-typed titles
            document.querySelectorAll('.section-title').forEach(title => {
                const section = title.closest('.section');
                if (section && typedTitles.has(section.id)) {
                    // This title was already animated before - show immediately with cursor
                    title.dataset.typed = 'true';
                    
                    const text = title.textContent.trim();
                    title.textContent = '';
                    
                    const wrapper = document.createElement('span');
                    wrapper.className = 'section-title-text';
                    wrapper.textContent = text;
                    
                    const cursor = document.createElement('span');
                    cursor.className = 'typing-cursor';
                    cursor.textContent = '▊';
                    
                    title.appendChild(wrapper);
                    title.appendChild(cursor);
                }
            });
            
            // Apply typing effect to page (in correct language)
            // Section titles with data-typed='true' will be skipped
            typePageText(() => {
                console.log('Language change typing complete');
            });
            
            initScrollAnimations();
            // Don't call initTypingAnimation on language change (already animated)
        }
    }
    
    // Helper function to make text immediately visible (no animation)
    function makeTextImmediatelyVisible(element) {
        const text = element.textContent;
        element.textContent = '';
        
        // Determine wrapper class based on element
        let wrapperClass = 'text-wrapper';
        if (element.id === 'heroName') {
            wrapperClass = 'hero-name-text';
        } else if (element.id === 'heroSubtitle') {
            wrapperClass = 'hero-subtitle-text';
        }
        
        const wrapper = document.createElement('span');
        wrapper.className = wrapperClass;
        wrapper.textContent = text;
        
        element.appendChild(wrapper);
        // No cursor for hero elements
    }
    
    // Simple typing effect for language change
    function typePageText(callback) {
        // Target ONLY section titles (with cursor)
        const titleElements = document.querySelectorAll(`.section-title`);
        
        // Target all other text elements (without cursor)
        const textElements = document.querySelectorAll(`
            .hero-greeting,
            .hero-description,
            .about-text p,
            .stat-label,
            .skill-category-title,
            .skill-name,
            .timeline-title,
            .timeline-company,
            .timeline-date,
            .timeline-description li,
            .project-title,
            .project-content p,
            .tag,
            .education-degree,
            .education-institution,
            .education-date,
            .education-highlight,
            .contact-description,
            .contact-cta-text
        `);
        
        // Target buttons and contact links separately (need size preservation)
        const buttonElements = document.querySelectorAll(`.hero-cta .btn`);
        const contactLinkElements = document.querySelectorAll(`.contact-link`);
        
        let completed = 0;
        let callbackCalled = false;
        const total = titleElements.length + textElements.length + buttonElements.length + contactLinkElements.length;
        
        const checkComplete = () => {
            completed++;
            if (completed >= total && !callbackCalled && callback) {
                callbackCalled = true;
                callback();
            }
        };
        
        if (total === 0) {
            if (callback) callback();
            return;
        }
        
        // Type titles with cursor
        Array.from(titleElements).forEach((element) => {
            const text = element.textContent.trim();
            
            if (!text || element.dataset.typed === 'true' || element.querySelector('.section-title-text')) {
                checkComplete();
                return;
            }
            
            element.textContent = '';
            
            const wrapper = document.createElement('span');
            wrapper.className = 'section-title-text';
            
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '▊';
            
            element.appendChild(wrapper);
            element.appendChild(cursor);
            
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    wrapper.textContent += text[index];
                    index++;
                } else {
                    clearInterval(interval);
                    checkComplete();
                }
            }, 30);
        });
        
        // Type regular text elements
        Array.from(textElements).forEach((element) => {
            const text = element.textContent.trim();
            
            if (!text) {
                checkComplete();
                return;
            }
            
            element.textContent = '';
            
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text[index];
                    index++;
                } else {
                    clearInterval(interval);
                    checkComplete();
                }
            }, 15);
        });
        
        // Type buttons with size preservation
        Array.from(buttonElements).forEach((button) => {
            const text = button.textContent.trim();
            
            if (!text) {
                checkComplete();
                return;
            }
            
            // Preserve button size by creating ghost text
            const currentWidth = button.offsetWidth;
            const currentHeight = button.offsetHeight;
            
            // Set fixed dimensions
            button.style.minWidth = currentWidth + 'px';
            button.style.minHeight = currentHeight + 'px';
            
            // Clear visible text
            button.textContent = '';
            
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    button.textContent += text[index];
                    index++;
                } else {
                    clearInterval(interval);
                    // Remove fixed dimensions after typing
                    setTimeout(() => {
                        button.style.minWidth = '';
                        button.style.minHeight = '';
                    }, 100);
                    checkComplete();
                }
            }, 20);
        });
        
        // Type contact links (only the text span, preserve SVG icons)
        Array.from(contactLinkElements).forEach((link) => {
            const textSpan = link.querySelector('span');
            
            if (!textSpan) {
                checkComplete();
                return;
            }
            
            const text = textSpan.textContent.trim();
            
            if (!text) {
                checkComplete();
                return;
            }
            
            // Preserve link size
            const currentWidth = link.offsetWidth;
            const currentHeight = link.offsetHeight;
            
            link.style.minWidth = currentWidth + 'px';
            link.style.minHeight = currentHeight + 'px';
            
            // Clear only the text span
            textSpan.textContent = '';
            
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    textSpan.textContent += text[index];
                    index++;
                } else {
                    clearInterval(interval);
                    // Remove fixed dimensions after typing
                    setTimeout(() => {
                        link.style.minWidth = '';
                        link.style.minHeight = '';
                    }, 100);
                    checkComplete();
                }
            }, 20);
        });
    }
    
    function updateLanguageUI() {
        const langConfig = LANGUAGES[currentLang];
        if (!langConfig) {
            currentLang = 'pt';
            return;
        }
        
        document.documentElement.lang = langConfig.htmlLang;
        
        const flagIcon = document.getElementById('flagIcon');
        const langText = document.getElementById('langText');
        const repoTooltipTitle = document.getElementById('repoTooltipTitle');
        const repoTooltipValue = document.getElementById('repoTooltipValue');
        
        if (flagIcon && langText) {
            flagIcon.innerHTML = `<img src="${langConfig.flag}" alt="${langConfig.name}" class="flag-svg">`;
            langText.textContent = langConfig.code;
        }

        if (repoTooltipTitle && repoTooltipValue) {
            const repoText = {
                pt: { title: 'Repositorio', value: 'Ver no GitHub' },
                en: { title: 'Repository', value: 'View on GitHub' },
                es: { title: 'Repositorio', value: 'Ver en GitHub' }
            };
            const selected = repoText[currentLang] || repoText.pt;
            repoTooltipTitle.textContent = selected.title;
            repoTooltipValue.textContent = selected.value;
        }
    }

    // ==================== ANIMATIONS ====================
    // Animated counter for numbers
    function animateCounter(element, target, duration = 2000, suffix = '') {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }
    
    // Typing animation for section titles (character by character reveal)
    function typeTextElement(element, text, speed = 80) {
        return new Promise((resolve) => {
            // Create wrapper for text
            const wrapper = document.createElement('span');
            wrapper.className = 'section-title-text';
            
            // Create cursor element
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '▊';
            
            element.appendChild(wrapper);
            element.appendChild(cursor);
            
            let currentIndex = 0;
            
            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    // Add next character
                    wrapper.textContent += text[currentIndex];
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    // Keep cursor blinking after typing is done
                    resolve();
                }
            }, speed);
        });
    }
    
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate section titles with typing effect
                    if (entry.target.classList.contains('section-title') && !entry.target.dataset.typed) {
                        entry.target.dataset.typed = 'true';
                        const fullText = entry.target.textContent.trim();
                        
                        // Remove the text content but keep the structure
                        // CSS ::before will add "$ " automatically
                        // CSS ::after will add cursor automatically
                        const textWithoutCursor = fullText.replace('▊', '').trim();
                        
                        // Clear existing content (but ::before and ::after remain via CSS)
                        entry.target.textContent = '';
                        
                        // Start typing animation (just the text, $ is in ::before)
                        typeTextElement(entry.target, textWithoutCursor, 80);
                    }
                    
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
                    
                    // Animate stat numbers
                    if (entry.target.classList.contains('stat-card')) {
                        const numberEl = entry.target.querySelector('.stat-number');
                        if (numberEl && !numberEl.dataset.animated) {
                            numberEl.dataset.animated = 'true';
                            const text = numberEl.textContent;
                            const match = text.match(/(\d+)/);
                            if (match) {
                                const number = parseInt(match[1]);
                                const suffix = text.replace(match[0], '');
                                numberEl.textContent = '0' + suffix;
                                setTimeout(() => {
                                    animateCounter(numberEl, number, 2000, suffix);
                                }, 200);
                            }
                        }
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
            observer.observe(el);
        });
        
        // Observe section titles for typing animation
        document.querySelectorAll('.section-title').forEach(function(el) {
            observer.observe(el);
        });
        
        // Also observe stat cards specifically
        document.querySelectorAll('.stat-card').forEach(function(el) {
            observer.observe(el);
        });
    }

    // Typing animation for hero section (letter by letter with cursor)
    function initTypingAnimation() {
        const heroName = document.getElementById('heroName');
        const heroSubtitle = document.getElementById('heroSubtitle');
        
        if (!heroName || !heroSubtitle) return;
        
        // CRITICAL: Skip if already animated (check both elements)
        if (heroName.dataset.typed === 'true' || heroSubtitle.dataset.typed === 'true') {
            console.log('Hero typing animation skipped (already animated)');
            return;
        }
        
        // Also skip if heroName already has content structure (was pre-rendered)
        if (heroName.querySelector('span.hero-name-text')) {
            console.log('Hero typing animation skipped (already has text wrapper)');
            heroName.dataset.typed = 'true';
            heroSubtitle.dataset.typed = 'true';
            return;
        }
        
        const nameText = heroName.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        console.log('Starting hero typing animation');
        
        // IMPORTANT: Hide subtitle initially to prevent flash
        heroSubtitle.style.opacity = '0';
        
        // Clear and setup name typing
        heroName.textContent = '';
        heroName.dataset.typed = 'true';
        
        const nameWrapper = document.createElement('span');
        nameWrapper.className = 'hero-name-text';
        
        const nameCursor = document.createElement('span');
        nameCursor.className = 'typing-cursor';
        nameCursor.textContent = '▊';
        
        heroName.appendChild(nameWrapper);
        heroName.appendChild(nameCursor);
        
        // Type name letter by letter
        let nameIndex = 0;
        const nameInterval = setInterval(() => {
            if (nameIndex < nameText.length) {
                nameWrapper.textContent += nameText[nameIndex];
                nameIndex++;
            } else {
                clearInterval(nameInterval);
                // Remove cursor from name
                nameCursor.remove();
                
                // Start typing subtitle after name is done
                setTimeout(() => {
                    // Clear and show subtitle
                    heroSubtitle.textContent = '';
                    heroSubtitle.style.opacity = '1';
                    heroSubtitle.dataset.typed = 'true';
                    
                    const subtitleWrapper = document.createElement('span');
                    subtitleWrapper.className = 'hero-subtitle-text';
                    
                    heroSubtitle.appendChild(subtitleWrapper);
                    
                    // Type subtitle letter by letter (NO CURSOR)
                    let subtitleIndex = 0;
                    const subtitleInterval = setInterval(() => {
                        if (subtitleIndex < subtitleText.length) {
                            subtitleWrapper.textContent += subtitleText[subtitleIndex];
                            subtitleIndex++;
                        } else {
                            clearInterval(subtitleInterval);
                        }
                    }, 50);
                }, 300);
            }
        }, 100);
    }

    // ==================== EASTER EGGS ====================
    function initEasterEggs() {
        // Konami Code
        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.key);
            konamiCode = konamiCode.slice(-konamiSequence.length);
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                activateMatrixMode();
                konamiCode = [];
            }
        });
        
        // Terminal shortcut (Ctrl+Shift+K)
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'K') {
                e.preventDefault();
                toggleTerminal();
            }
        });
        
        // Terminal input
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    executeTerminalCommand(this.value.trim());
                    this.value = '';
                }
            });
        }
        
        // Console Easter eggs
        console.log('%c🎮 Konami Code Activated!', 'color: #a855f7; font-size: 14px; display: none;');
    }

    function toggleTerminal() {
        const terminal = document.getElementById('terminal-console');
        terminal.classList.toggle('active');
        
        if (terminal.classList.contains('active')) {
            document.getElementById('terminal-input').focus();
        }
    }
    
    function closeTerminal() {
        document.getElementById('terminal-console').classList.remove('active');
    }

    function updateTerminalPrompt() {
        const promptEl = document.querySelector('.terminal-prompt');
        const terminal = document.getElementById('terminal-console');
        
        if (!promptEl || !terminal) return;
        
        if (window.CoffeeMachineDebug && window.CoffeeMachineDebug.isStreaming && window.CoffeeMachineDebug.isStreaming()) {
            terminal.classList.add('terminal-streaming');
            terminal.classList.remove('terminal-name-input');
            return;
        }
        
        terminal.classList.remove('terminal-streaming');
        
        if (window.CoffeeMachineDebug && window.CoffeeMachineDebug.isAwaitingName && window.CoffeeMachineDebug.isAwaitingName()) {
            terminal.classList.add('terminal-name-input');
            promptEl.textContent = '';
            const terminalInput = document.getElementById('terminal-input');
            if (terminalInput) {
                setTimeout(() => terminalInput.focus(), 0);
            }
            return;
        }
        
        terminal.classList.remove('terminal-name-input');
        
        if (window.CoffeeMachineDebug && window.CoffeeMachineDebug.isActive && window.CoffeeMachineDebug.isActive()) {
            const currentPath = window.CoffeeMachineDebug.getCurrentPath();
            promptEl.textContent = `dev@coffee-machine:${currentPath}$`;
            return;
        }
        
        promptEl.textContent = 'mateus@portfolio:~$';
    }

    function executeTerminalCommand(command) {
        const output = document.getElementById('terminal-output');
        const terminal = document.getElementById('terminal-console');
        const cmd = command.toLowerCase();
        updateTerminalPrompt();
        
        if (window.CoffeeMachineDebug && window.CoffeeMachineDebug.isAwaitingName()) {
            const lowered = command.trim().toLowerCase();
            if (lowered === 'menu') {
                window.CoffeeMachineDebug.reset();
                window.coffeeMachineAwaitingName = false;
                
                const responseLine = document.createElement('div');
                responseLine.style.whiteSpace = 'pre-wrap';
                responseLine.style.marginBottom = '0.5rem';
                responseLine.textContent = '\nReturning to normal terminal...\n';
                output.appendChild(responseLine);
                
                document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
                updateTerminalPrompt();
                return;
            }
            
            if (lowered === 'play') {
                window.CoffeeMachineDebug.reset();
                window.coffeeMachineAwaitingName = false;
                
                const gameIntro = window.CoffeeMachineDebug.start('en');
                const responseLine = document.createElement('div');
                responseLine.style.whiteSpace = 'pre-wrap';
                responseLine.style.marginBottom = '0.5rem';
                responseLine.textContent = gameIntro;
                output.appendChild(responseLine);
                
                document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
                updateTerminalPrompt();
                return;
            }

            if (lowered === 'exit') {
                window.CoffeeMachineDebug.reset();
                window.coffeeMachineAwaitingName = false;
                
                const responseLine = document.createElement('div');
                responseLine.style.whiteSpace = 'pre-wrap';
                responseLine.style.marginBottom = '0.5rem';
                responseLine.textContent = '\nConnection closed. Returning to normal terminal...\n';
                output.appendChild(responseLine);
                
                document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
                updateTerminalPrompt();
                return;
            }

            const reservedNames = new Set([
                'play', 'menu', 'exit', 'help', 'ls', 'cd', 'cat', 'pwd',
                'ps', 'ps -ef', 'ps aux', 'free', 'free -h', 'top',
                'env', 'printenv', 'grep', 'find', 'systemctl',
                './brew-coffee.sh', 'brew-coffee.sh'
            ]);
            if (reservedNames.has(lowered) || lowered === '') {
                const responseLine = document.createElement('div');
                responseLine.style.whiteSpace = 'pre-wrap';
                responseLine.style.marginBottom = '0.5rem';
                responseLine.textContent = 'Error: invalid name. Please enter only your name.';
                output.appendChild(responseLine);
                updateTerminalPrompt();
                return;
            }

            const inputLine = document.createElement('div');
            inputLine.textContent = `> ${command}`;
            output.appendChild(inputLine);

            window.CoffeeMachineDebug.submitScore(command).then(result => {
                const responseLine = document.createElement('div');
                responseLine.style.whiteSpace = 'pre-wrap';
                responseLine.style.marginBottom = '0.5rem';
                
                if (result.success) {
                    responseLine.textContent = `\nSaving to ranking...\n\nRANKING POSITION: #${result.rank}\n`;
                    
                    output.appendChild(responseLine);
                    
                    const leaderboardOutput = [];
                    window.CoffeeMachineDebug.displayLeaderboard(leaderboardOutput, command).then(() => {
                        const leaderboardLine = document.createElement('div');
                        leaderboardLine.style.whiteSpace = 'pre-wrap';
                        leaderboardLine.textContent = leaderboardOutput.join('\n');
                        output.appendChild(leaderboardLine);
                        
                        document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
                    });
                } else {
                    responseLine.textContent = `\nError: ${result.error}\n`;
                    output.appendChild(responseLine);
                }
                
                document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
                window.coffeeMachineAwaitingName = false;
                updateTerminalPrompt();
            });
            
            return;
        }

        if (window.CoffeeMachineDebug && window.CoffeeMachineDebug.isStreaming && window.CoffeeMachineDebug.isStreaming()) {
            const responseLine = document.createElement('div');
            responseLine.style.whiteSpace = 'pre-wrap';
            responseLine.style.marginBottom = '0.5rem';
            responseLine.textContent = 'Please wait for the process to finish...';
            output.appendChild(responseLine);
            document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
            updateTerminalPrompt();
            return;
        }
        
        if (window.CoffeeMachineDebug && window.CoffeeMachineDebug.isActive()) {
            const currentPath = window.CoffeeMachineDebug.getCurrentPath();
            const isScriptCommand = cmd.startsWith('./') || cmd.endsWith('.sh') || cmd === 'brew-coffee.sh';
            if (!isScriptCommand) {
                const commandLine = document.createElement('div');
                const gamePrompt = document.createElement('span');
                gamePrompt.style.color = '#00ffff';
                gamePrompt.textContent = `dev@coffee-machine:${currentPath}$`;
                commandLine.appendChild(gamePrompt);
                commandLine.appendChild(document.createTextNode(` ${command}`));
                output.appendChild(commandLine);
            }
            
            const gameOutput = [];
            const result = window.CoffeeMachineDebug.execute(command, gameOutput);
            
            if (result === 'menu' || cmd === 'exit') {
                const responseLine = document.createElement('div');
                responseLine.style.whiteSpace = 'pre-wrap';
                responseLine.style.marginBottom = '0.5rem';
                responseLine.textContent = cmd === 'exit'
                    ? '\nConnection closed. Returning to normal terminal...\n'
                    : '\nReturning to normal terminal...\n';
                output.appendChild(responseLine);
                window.CoffeeMachineDebug.reset();
                updateTerminalPrompt();
            } else if (result && result.stream) {
                const delayMs = 450;
                let index = 0;
                const streamLine = document.createElement('div');
                streamLine.style.whiteSpace = 'pre-wrap';
                streamLine.style.marginBottom = '0.5rem';
                output.appendChild(streamLine);
                updateTerminalPrompt();
                
                const lines = result.lines || [];
                const interval = setInterval(() => {
                    if (index < lines.length) {
                        streamLine.textContent += (index === 0 ? '' : '\n') + lines[index];
                        index++;
                        document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
                    } else {
                        clearInterval(interval);
                        if (result.onDone) result.onDone();
                        updateTerminalPrompt();
                    }
                }, delayMs);
            } else if (gameOutput.length > 0) {
                const responseLine = document.createElement('div');
                responseLine.style.whiteSpace = 'pre-wrap';
                responseLine.style.marginBottom = '0.5rem';
                responseLine.textContent = gameOutput.join('\n');
                output.appendChild(responseLine);
            }
            
            document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
            updateTerminalPrompt();
            return;
        }
        
        // Add command to output
        const commandLine = document.createElement('div');
        const termPrompt = document.createElement('span');
        termPrompt.style.color = '#00ffff';
        termPrompt.textContent = 'mateus@portfolio:~$';
        commandLine.appendChild(termPrompt);
        commandLine.appendChild(document.createTextNode(` ${command}`));
        output.appendChild(commandLine);
        
        if (cmd === 'leaderboard') {
            const responseLine = document.createElement('div');
            responseLine.style.whiteSpace = 'pre-wrap';
            responseLine.style.marginBottom = '0.5rem';
            responseLine.textContent = 'Fetching leaderboard...';
            output.appendChild(responseLine);

            window.CoffeeMachineDebug.displayLeaderboard([], '').then(() => {
                const leaderboardOutput = [];
                window.CoffeeMachineDebug.displayLeaderboard(leaderboardOutput, '').then(() => {
                    const leaderboardLine = document.createElement('div');
                    leaderboardLine.style.whiteSpace = 'pre-wrap';
                    leaderboardLine.textContent = leaderboardOutput.join('\n');
                    output.appendChild(leaderboardLine);
                    document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
                    updateTerminalPrompt();
                });
            });
            return;
        }

        if (cmd === 'play') {
            const gameIntro = window.CoffeeMachineDebug.start('en');
            const responseLine = document.createElement('div');
            responseLine.style.whiteSpace = 'pre-wrap';
            responseLine.style.marginBottom = '0.5rem';
            responseLine.textContent = gameIntro;
            output.appendChild(responseLine);
            updateTerminalPrompt();
            
            document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
            return;
        }
        
        // Execute command
        let response = '';
        let isError = false;
        
        if (terminalCommands[cmd] !== undefined) {
            if (cmd === 'clear') {
                output.innerHTML = '';
                return;
            }
            response = typeof terminalCommands[cmd] === 'function'
                ? terminalCommands[cmd]()
                : terminalCommands[cmd];
        } else if (cmd === '') {
            return;
        } else {
            isError = true;
            response = `Command not found: ${command}. Type 'help' to see available commands.`;
            
            // Shake effect on error
            terminal.classList.add('shake');
            setTimeout(() => {
                terminal.classList.remove('shake');
            }, 500);
        }
        
        const responseLine = document.createElement('div');
        responseLine.style.whiteSpace = 'pre-wrap';
        responseLine.style.marginBottom = '0.5rem';
        if (isError) {
            responseLine.classList.add('error');
        }
        responseLine.textContent = response;
        output.appendChild(responseLine);
        
        // Scroll to bottom
        document.querySelector('.terminal-body').scrollTop = document.querySelector('.terminal-body').scrollHeight;
        updateTerminalPrompt();
    }

    function activateMatrixMode() {
        const body = document.body;
        body.style.animation = 'matrix-flash 0.5s ease';
        
        // Create matrix rain effect
        const matrixMessage = document.createElement('div');
        matrixMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            color: #00ff00;
            text-shadow: 0 0 30px #00ff00;
            z-index: 10001;
            font-family: monospace;
            animation: fade-in-out 3s ease;
        `;
        matrixMessage.textContent = '🟩 MATRIX MODE ACTIVATED 🟩';
        body.appendChild(matrixMessage);
        
        setTimeout(() => {
            body.removeChild(matrixMessage);
        }, 3000);
        
        console.log('%c🟩 MATRIX MODE ACTIVATED 🟩', 'color: #00ff00; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff00;');
    }

    // ==================== UTILITY FUNCTIONS ====================
    function updateYear() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
    
    // Favicon Easter Egg - Changes based on time of day
    function initFaviconEasterEgg() {
        function updateFavicon() {
            const hour = new Date().getHours();
            let emoji = '💻'; // Default
            
            if (hour >= 6 && hour < 12) {
                emoji = '☕'; // Morning - Coffee
            } else if (hour >= 12 && hour < 18) {
                emoji = '💻'; // Afternoon - Computer
            } else if (hour >= 18 && hour < 22) {
                emoji = '🌆'; // Evening - Sunset
            } else {
                emoji = '🌙'; // Night - Moon
            }
            
            const favicon = document.querySelector("link[rel='icon']");
            if (favicon) {
                favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;
            }
        }
        
        updateFavicon();
        // Update every hour
        setInterval(updateFavicon, 3600000);
    }

    // ==================== START APP ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
