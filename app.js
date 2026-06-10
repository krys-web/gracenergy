/**
 * GRACENERGY CLONE - CORE APPLICATION SCRIPT
 * Gestión de interfaz: Navbar interactiva, Menú Móvil, Sistema Multidioma y Buscador Global.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SELECTORES DEL DOM (Cargados de forma segura)
    // ==========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const langBtn = document.getElementById('lang-btn');
    const langText = document.getElementById('lang-text');
    const navLinks = document.querySelectorAll('.nav-link');
    const infoForm = document.getElementById('infoForm'); // Formulario de contacto

    // ==========================================
    // 2. DICCIONARIO DE TRADUCCIONES (i18n)
    // ==========================================
    const translations = {
        es: {
"nav-home": "Inicio",
            "nav-applications": "Aplicaciones",
            "nav-about": "Nosotros",
            "nav-solutions": "Soluciones",
            "nav-products": "Productos",
            "nav-catalogos": "Descargas",
            "nav-contact": "Contactos",
            "hero-title": "Infraestructura que no se detiene",
            "hero-desc": "Resiliencia energética escalable, carga vehicular de alta potencia y transformación digital.",
            "hero-btn": "Descubrir Soluciones",
            "solutions-title": "Nuestras Soluciones",
            "card1-title": "Almacenamiento de Energía",
            "card1-desc": "Sistemas de resiliencia avanzada mediante baterías de litio y control inteligente.",
            "card2-title": "Electromovilidad",
            "card2-desc": "Estaciones de carga ultra-rápida y gestión de flotas eléctricas industriales.",
            "card3-title": "Microrredes Híbridas",
            "card3-desc": "Integración eficiente de generación solar, térmica y almacenamiento distribuido."
        },
        en: {
"nav-home": "Home",
            "nav-applications": "Applications",
            "nav-about": "About Us",
            "nav-solutions": "Solutions",
            "nav-products": "Products",
            "nav-catalogos": "Downloads",
            "nav-contact": "Contact",
            "hero-title": "Infrastructure that never stops",
            "hero-desc": "Scalable energy resilience, high-power electric vehicle charging, and digital transformation.",
            "hero-btn": "Discover Solutions",
            "solutions-title": "Our Solutions",
            "card1-title": "Energy Storage",
            "card1-desc": "Advanced resilience systems using lithium batteries and intelligent control.",
            "card2-title": "E-Mobility",
            "card2-desc": "Ultra-fast charging stations and industrial electric fleet management.",
            "card3-title": "Hybrid Microgrids",
            "card3-desc": "Efficient integration of solar, thermal generation, and distributed storage."
        }
    };

    let currentLang = localStorage.getItem('selectedLanguage') || 'es';

    // ==========================================
    // 3. LOGICA DEL SISTEMA DE IDIOMAS (i18n)
    // ==========================================
    function changeLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        
        // Cambiar el texto del botón del navbar de manera segura
        if (langText) {
            langText.textContent = lang === 'es' ? 'EN' : 'ES';
        }

        // Traducir todos los elementos con atributo data-key
        const elementsToTranslate = document.querySelectorAll('[data-key]');
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                // Si es un input o textarea con placeholder
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    // Inicializar el idioma por defecto
    changeLanguage(currentLang);

    // --- CORRECCIÓN DE SEGURIDAD 1: Validar botón de idiomas ---
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'es' ? 'en' : 'es';
            changeLanguage(nextLang);
        });
    }

    // ==========================================
    // 4. CONTROL DEL NAV-BAR (Sticky scroll)
    // ==========================================
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // 5. CONTROL DEL MENÚ MÓVIL (Hamburguesa a X)
    // ==========================================
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú móvil al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 6. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // ==========================================
    if (infoForm) {
        infoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert(currentLang === 'es' ? '¡Formulario enviado con éxito!' : 'Form submitted successfully!');
            infoForm.reset();
        });
    }

    // ==========================================
    // 7. MOTOR DE BÚSQUEDA GLOBAL INDEXADO
    // ==========================================
    const siteIndex = [
        { url: "index.html", title: "Inicio / Home", content: "infraestructura resiliencia energetica carga vehicular alta potencia transformacion digital soluciones almacenamiento energia baterias krysweb gracenergy" },
        { url: "aplicaciones.html", title: "Aplicaciones", content: "aplicaciones industriales mineria centros de datos hospitales industria pesada infraestructura puertos aeropuertos energia respaldo estabilidad automatizacion" },
        { url: "nosotros.html", title: "Nosotros / Empresa", content: "trayectoria mision vision valores ingenieria expertos ecuador eficiencia calidad equipo tecnico especialistas seguridad sustentabilidad industrial" },
        { url: "soluciones.html", title: "Soluciones", content: "sistemas de almacenamiento cargadores vehiculos electricos microrredes hibridas subestaciones plantas industriales automatizacion control ingenieria a medida" },
        { url: "productos.html", title: "Productos", content: "inversores industriales celdas de media tension transformadores de potencia modulos de baterias litio monitoreo inteligente medidores cables conectores" },
        { url: "catalogos.html", title: "Catálogos", content: "descargas pdf fichas tecnicas folletos corporativos especificaciones tecnicas manuales operacion certificaciones industriales gratis" },
        { url: "contacto.html", title: "Contactos", content: "formulario solicitud informacion correo electronico telefono direccion quito ecuador atencion al cliente cotizaciones presupuestos christian chavez" }
    ];

    const searchForm = document.getElementById('global-search-form');
    const searchInput = document.getElementById('search-input');
    const resultsBox = document.getElementById('search-results-dropdown');

    if (searchForm && searchInput && resultsBox) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            resultsBox.innerHTML = '';

            if (query.length < 2) {
                resultsBox.classList.remove('active');
                return;
            }

            const matches = siteIndex.filter(page => page.content.includes(query) || page.title.toLowerCase().includes(query));

            if (matches.length > 0) {
                matches.forEach(match => {
                    const indexPos = match.content.indexOf(query);
                    const start = Math.max(0, indexPos - 20);
                    const end = Math.min(match.content.length, indexPos + query.length + 40);
                    const snippet = "..." + match.content.substring(start, end) + "...";

                    const item = document.createElement('div');
                    item.className = 'search-item';
                    item.innerHTML = `
                        <a href="${match.url}">
                            <div class="search-item-title">${match.title}</div>
                            <div class="search-item-text">${snippet}</div>
                        </a>
                    `;
                    resultsBox.appendChild(item);
                });
            } else {
                resultsBox.innerHTML = `<div class="search-no-results">No se encontraron resultados para "${searchInput.value}"</div>`;
            }

            resultsBox.classList.add('active');
        });

        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target) && !resultsBox.contains(e.target)) {
                resultsBox.classList.remove('active');
            }
        });

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const firstResult = resultsBox.querySelector('a');
            if (firstResult) {
                window.location.href = firstResult.getAttribute('href');
            }
        });
    }
});

// ==========================================
// 8. CONTROL DEL CARRUSEL (Aislado e independiente)
// ==========================================
(() => {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let slideIndex = 0;
    let carouselInterval;

    if (slides.length === 0) return; // Si no hay carrusel en la página actual, apaga este bloque silenciosamente

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slideIndex = index;
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        slides[slideIndex].classList.add('active');
    }

    function nextSlide() { showSlide(slideIndex + 1); }
    function prevSlide() { showSlide(slideIndex - 1); }
    function startInterval() { carouselInterval = setInterval(nextSlide, 4000); }
    function resetInterval() { clearInterval(carouselInterval); startInterval(); }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
        startInterval();
    }
})();

// ==========================================
    // 9. SISTEMA DE CATÁLOGOS CON CARGA ASÍNCRONA JSON
    // ==========================================
    const catalogGrid = document.getElementById('catalog-grid');
    const categorySelect = document.getElementById('category-select');
    const catalogSearch = document.getElementById('catalog-search');
    const clearLocalSearch = document.getElementById('clear-local-search');

    if (catalogGrid && categorySelect && catalogSearch) {
        let docsDatabase = [];

        // Textos locales del componente para el soporte dinámico de idioma
        const catalogUiTexts = {
            es: {
                noResults: "No se encontraron documentos que coincidan con los criterios seleccionados.",
                btnView: "Visualizar",
                btnDownload: "Descargar",
                errorMsg: "Error al cargar el catálogo técnico. Por favor, intente más tarde."
            },
            en: {
                noResults: "No documents found matching the selected criteria.",
                btnView: "View",
                btnDownload: "Download",
                errorMsg: "Error loading the technical catalogue. Please try again later."
            }
        };

        function renderDocuments(documents) {
            catalogGrid.innerHTML = '';
            
            // Detecta el idioma activo de forma segura ('es' por defecto)
            const lang = (typeof currentLang !== 'undefined') ? currentLang : 'es';
            const texts = catalogUiTexts[lang] || catalogUiTexts.es;

            if (documents.length === 0) {
                catalogGrid.innerHTML = `<div class="catalog-no-results"><p>${texts.noResults}</p></div>`;
                return;
            }

            documents.forEach(doc => {
                const card = document.createElement('div');
                card.className = `file-card type-${doc.category}`;
                
                // Mapeo dinámico de datos del JSON según idioma
                const title = lang === 'en' ? (doc.title_en || doc.title_es) : doc.title_es;
                const description = lang === 'en' ? (doc.description_en || doc.description_es) : doc.description_es;
                const categoryLabel = lang === 'en' ? (doc.categoryLabel_en || doc.categoryLabel_es) : doc.categoryLabel_es;

                card.innerHTML = `
                    <div class="file-info">
                        <span class="file-tag tag-${doc.category}">${categoryLabel}</span>
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                    <div>
                        <div class="file-meta">
                            <span><strong>Formato:</strong> ${doc.format}</span>
                            <span><strong>Tamaño:</strong> ${doc.fileSize}</span>
                        </div>
                        <div class="file-actions">
                            <a href="${doc.filePath}" target="_blank" class="btn-file btn-view">${texts.btnView}</a>
                            <a href="${doc.filePath}" download class="btn-file btn-download">${texts.btnDownload}</a>
                        </div>
                    </div>
                `;
                catalogGrid.appendChild(card);
            });
        }

        function filterCatalog() {
            const selectedCategory = categorySelect.value;
            const searchQuery = catalogSearch.value.toLowerCase().trim();

            if (clearLocalSearch) {
                if (searchQuery.length > 0) {
                    clearLocalSearch.style.display = 'block';
                } else {
                    clearLocalSearch.style.display = 'none';
                }
            }

            const filteredDocs = docsDatabase.filter(doc => {
                const lang = (typeof currentLang !== 'undefined') ? currentLang : 'es';
                const title = lang === 'en' ? (doc.title_en || doc.title_es) : doc.title_es;
                const description = lang === 'en' ? (doc.description_en || doc.description_es) : doc.description_es;

                const matchesCategory = (selectedCategory === 'all' || doc.category === selectedCategory);
                const matchesSearch = (
                    title.toLowerCase().includes(searchQuery) || 
                    description.toLowerCase().includes(searchQuery)
                );
                return matchesCategory && matchesSearch;
            });

            renderDocuments(filteredDocs);
        }

        async function loadCatalogData() {
            try {
                const response = await fetch('data/catalogos.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                docsDatabase = await response.json();
                renderDocuments(docsDatabase);
            } catch (error) {
                console.error("Error cargando el archivo catalogos.json: ", error);
                const lang = (typeof currentLang !== 'undefined') ? currentLang : 'es';
                const texts = catalogUiTexts[lang] || catalogUiTexts.es;
                catalogGrid.innerHTML = `<div class="catalog-no-results"><p>${texts.errorMsg}</p></div>`;
            }
        }

        // Asignación de listeners de eventos interactivos
        categorySelect.addEventListener('change', filterCatalog);
        catalogSearch.addEventListener('input', filterCatalog);

        if (clearLocalSearch) {
            clearLocalSearch.addEventListener('click', () => {
                catalogSearch.value = '';
                filterCatalog();
                catalogSearch.focus();
            });
        }

        // Ejecución inicial de la carga asíncrona
        loadCatalogData();
        
        // Acople seguro al conmutador global de idiomas
        if (typeof changeLanguage === 'function') {
            const nativeChangeLanguage = changeLanguage;
            changeLanguage = function(lang) {
                nativeChangeLanguage(lang);
                filterCatalog();
            };
        }
    }