document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SELECTORES DEL DOM (Cargados de forma segura)
    // ==========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const infoForm = document.getElementById('infoForm');

    // ==========================================
    // 2. CONTROL DEL NAV-BAR (Sticky scroll)
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
    // 3. CONTROL DEL MENÚ MÓVIL \n    
    // ==========================================

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // ==========================================
    if (infoForm) {
        infoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Formulario enviado con éxito!');
            infoForm.reset();
        });
    }

    // ==========================================
    // 5. MOTOR DE BÚSQUEDA GLOBAL INDEXADO
    // ==========================================
    const siteIndex = [
        { url: "index.html", title: "Inicio", content: "infraestructura resiliencia energetica carga vehicular alta potencia transformacion digital soluciones almacenamiento energia baterias krysweb gracenergy" },
        { url: "aplicaciones.html", title: "Aplicaciones", content: "aplicaciones industriales mineria centros de datos hospitales industria pesada infraestructura puertos aeropuertos energia respaldo estabilidad automatizacion" },
        { url: "nosotros.html", title: "Nosotros / Empresa", content: "trayectoria mision vision valores ingenieria expertos ecuador eficiencia calidad equipo tecnico especialistas seguridad sustentabilidad industrial" },
        { url: "soluciones.html", title: "Soluciones", content: "sistemas de almacenamiento cargadores vehiculos electricos microrredes hibridas subestaciones plantas industriales automatizacion control ingenieria a medida" },
        { url: "productos.html", title: "Productos", content: "inversores industriales celdas de media tension transformadores de potencia modulos de baterias litio monitoreo inteligente medidores cables conectores" },
        { url: "descargas.html", title: "Descargas", content: "descargas pdf fichas tecnicas folletos corporativos specifications tecnicas manuales operacion certifications industriales gratis" },
        { url: "contacto.html", title: "Contactos", content: "formulario solicitud informacion correo electronico telefono direccion quito ecuador atencion al cliente cotizaciones presupuestos christian chavez webmail log-in" }
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
    }

    // ==========================================
    // 6. INTERACTIVIDAD DEL CARRUSEL EN MEDIA LUNA
    // ==========================================
    const items = document.querySelectorAll('.arc-item');
    const details = document.querySelectorAll('.arc-detail-content');
    const prevBtn = document.getElementById('arc-prev-btn');
    const nextBtn = document.getElementById('arc-next-btn');
    
    let currentIndex = 0;
    const totalItems = items.length;
    const intervalTime = 5000; 
    let autoSlideTimer;

    function updateArcCarousel() {
        if (items.length === 0) return;

        items.forEach((item, idx) => {
            item.classList.remove('active', 'prev', 'next', 'hidden-back');

            if (idx === currentIndex) {
                item.classList.add('active');
            } else if (idx === (currentIndex - 1 + totalItems) % totalItems) {
                item.classList.add('prev');
            } else if (idx === (currentIndex + 1) % totalItems) {
                item.classList.add('next');
            } else {
                item.classList.add('hidden-back');
            }
        });

        details.forEach((detail, idx) => {
            if (idx === currentIndex) {
                detail.classList.add('active');
            } else {
                detail.classList.remove('active');
            }
        });
    }

    function nextArcSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateArcCarousel();
    }

    function prevArcSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateArcCarousel();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(nextArcSlide, intervalTime);
    }

    if (items.length > 0 && details.length > 0) {
        updateArcCarousel();
        resetAutoSlide();

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextArcSlide();
                resetAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevArcSlide();
                resetAutoSlide();
            });
        }
    }

    // ==========================================
    // 7. SISTEMA DE CATÁLOGOS CON ASYNC JSON (CORREGIDO Y OPTIMIZADO)
    // ==========================================
    const catalogGrid = document.getElementById('catalog-grid');
    const categorySelect = document.getElementById('category-select');
    const catalogSearch = document.getElementById('catalog-search');
    const clearLocalSearch = document.getElementById('clear-local-search');

    if (catalogGrid && categorySelect && catalogSearch) {
        let docsDatabase = [];

        // Mapeo dinámico de etiquetas limpias según la categoría
        function getCleanLabel(category) {
            const labels = {
                'catalogos': 'Catálogo Técnico',
                'brochure': 'Brochure',
                'manuales': 'Manual de Operación'
            };
            return labels[category] || 'Documento';
        }

        function renderDocuments(documents) {
            catalogGrid.innerHTML = '';

            if (documents.length === 0) {
                catalogGrid.innerHTML = `<div class="catalog-no-results"><p>No se encontraron documentos que coincidan con los criterios seleccionados o palabras clave.</p></div>`;
                return;
            }

            documents.forEach(doc => {
                const card = document.createElement('div');
                card.className = `file-card type-${doc.category}`;
                
                card.innerHTML = `
                    <div class="file-content-group">
                        <div class="file-info">
                            <span class="file-tag tag-${doc.category}">${getCleanLabel(doc.category)}</span>
                            <h3>${doc.title_es}</h3>
                            <p>${doc.description_es}</p>
                        </div>
                    </div>
                    <div class="file-actions-wrapper">
                        <div class="file-actions">
                            <a href="${doc.filePath}" target="_blank" class="btn-file btn-view">Visualizar</a>
                            <a href="${doc.filePath}" download class="btn-file btn-download">Descargar</a>
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
                clearLocalSearch.style.display = searchQuery.length > 0 ? 'block' : 'none';
            }

            const filteredDocs = docsDatabase.filter(doc => {
                const matchesCategory = (selectedCategory === 'all' || doc.category === selectedCategory);
                
                // SEO Interno: Busca coincidencias en títulos, descripciones y en el arreglo de keywords
                const matchesSearch = (
                    doc.title_es.toLowerCase().includes(searchQuery) || 
                    doc.description_es.toLowerCase().includes(searchQuery) ||
                    (doc.keywords && doc.keywords.some(kw => kw.toLowerCase().includes(searchQuery)))
                );
                return matchesCategory && matchesSearch;
            });

            renderDocuments(filteredDocs);
        }

        async function loadCatalogData() {
            try {
                const response = await fetch('data/catalogos.json');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                docsDatabase = await response.json();
                renderDocuments(docsDatabase);
            } catch (error) {
                console.error("Error cargando el archivo JSON: ", error);
                catalogGrid.innerHTML = `<div class="catalog-no-results"><p>Error al cargar el catálogo técnico. Por favor, intente más tarde.</p></div>`;
            }
        }

        categorySelect.addEventListener('change', filterCatalog);
        catalogSearch.addEventListener('input', filterCatalog);

        if (clearLocalSearch) {
            clearLocalSearch.addEventListener('click', () => {
                catalogSearch.value = '';
                filterCatalog();
                catalogSearch.focus();
            });
        }

        loadCatalogData();
    } 

    // ==========================================
    // 8. ANIMACIÓN ON-SCROLL PARA SECCIÓN NOSOTROS
    // ==========================================
    const animatedCards = document.querySelectorAll('.about-card.animate-on-scroll');

    if (animatedCards.length > 0) {
        const animationOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, animationOptions);

        animatedCards.forEach(card => {
            cardObserver.observe(card);
        });
    }
});

// ==========================================
    // 9. INTERACTIVIDAD DE ACORDEÓN DE PROVEEDORES
    // ==========================================
    const toggleButtons = document.querySelectorAll('.supplier-toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                // Alternar estado activo del botón (para la flecha y color)
                button.classList.toggle('active');

                // Si está colapsado, lo abrimos calculando su altura real exacta
                if (targetContent.style.maxHeight && targetContent.style.maxHeight !== '0px') {
                    targetContent.style.maxHeight = '0px';
                    targetContent.style.opacity = '0';
                } else {
                    targetContent.style.maxHeight = targetContent.scrollHeight + 'px';
                    targetContent.style.opacity = '1';
                }
            }
        });
    });

    // ==========================================
    // 10. ANIMACIÓN SCROLL REVEAL PARA LAS 4 ÁREAS
    // ==========================================
    const revealItems = document.querySelectorAll('.reveal-item');

    if (revealItems.length > 0) {
        const revealOptions = {
            root: null,
            threshold: 0.15, 
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Agrega un pequeño retraso escalonado (stagger) para un efecto más profesional
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 100); 
                    
                    // Deja de observar el elemento una vez animado para optimizar rendimiento
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    }
    // ================================================================
    // 11. ANIMACIÓN SCROLL REVEAL PARA LAS 4 ÁREAS - PAGINA SOLUCIONES
    // ================================================================
    
    document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos todos los elementos que queremos animar
    const items = document.querySelectorAll('.fade-in-scroll');

    // Configuración del observador
    const observerOptions = {
        root: null, 
        rootMargin: "0px", 
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento entra en el viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Asignamos el observador a cada uno de los bloques de soluciones
    items.forEach(item => {
        scrollObserver.observe(item);
    });
});