/**
 * GRACENERGY CLONE - CORE APPLICATION SCRIPT
 * Gestión de interfaz: Navbar interactiva, Menú Móvil, Buscador Global, Media Luna y Descarga de Catálogos.
 */

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
    // 3. CONTROL DEL MENÚ MÓVIL 
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
    // 7. SISTEMA DE CATÁLOGOS CON ASYNC JSON
    // ==========================================
    const catalogGrid = document.getElementById('catalog-grid');
    const categorySelect = document.getElementById('category-select');
    const catalogSearch = document.getElementById('catalog-search');
    const clearLocalSearch = document.getElementById('clear-local-search');

    if (catalogGrid && categorySelect && catalogSearch) {
        let docsDatabase = [];

        function renderDocuments(documents) {
            catalogGrid.innerHTML = '';

            if (documents.length === 0) {
                catalogGrid.innerHTML = `<div class="catalog-no-results"><p>No se encontraron documentos que coincidan con los criterios seleccionados.</p></div>`;
                return;
            }

            documents.forEach(doc => {
                const card = document.createElement('div');
                card.className = `file-card type-${doc.category}`;
                
                card.innerHTML = `
                    <div class="file-info">
                        <span class="file-tag tag-${doc.category}">${doc.categoryLabel_es}</span>
                        <h3>${doc.title_es}</h3>
                        <p>${doc.description_es}</p>
                    </div>
                    <div>
                        <div class="file-meta">
                            <span><strong>Formato:</strong> ${doc.format}</span>
                            <span><strong>Tamaño:</strong> ${doc.fileSize}</span>
                        </div>
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
                const matchesSearch = (
                    doc.title_es.toLowerCase().includes(searchQuery) || 
                    doc.description_es.toLowerCase().includes(searchQuery)
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
});

// ==========================================
    // 8. ANIMACIÓN ON-SCROLL PARA SECCIÓN NOSOTROS
    // ==========================================
    const animatedCards = document.querySelectorAll('.about-card.animate-on-scroll');

    if (animatedCards.length > 0) {
        const animationOptions = {
            root: null,          // Utiliza el viewport del navegador
            rootMargin: '0px',
            threshold: 0.15      // Se activa cuando el 15% de la tarjeta es visible
        };

        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añade la clase que dispara la transición CSS
                    entry.target.classList.add('is-visible');
                    // Deja de observar el elemento para mejorar el rendimiento una vez animado
                    observer.unobserve(entry.target);
                }
            });
        }, animationOptions);

        animatedCards.forEach(card => {
            cardObserver.observe(card);
        });
    }