const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const productsNavToggle = document.querySelector(".products-nav-toggle");
const productsNavOptions = document.querySelector(".products-nav-options");
const cartCount = document.querySelector(".cart-count");
const toast = document.querySelector(".toast");
const contactForm = document.querySelector(".contact-form");
const contactMessage = document.querySelector(".contact-message");
const assistantPanel = document.querySelector(".assistant-panel");
const assistantToggle = document.querySelector(".assistant-toggle");
const assistantClose = document.querySelector(".assistant-close");
const assistantMessages = document.querySelector(".assistant-messages");
const assistantForm = document.querySelector(".assistant-form");
const assistantInput = document.querySelector("#assistant-input");
const assistantProgress = document.querySelector(".assistant-progress");

const cartButton = document.querySelector(".cart-link");
const cartDrawer = document.querySelector(".cart-drawer");
const cartOverlay = document.querySelector(".cart-overlay");
const cartClose = document.querySelector(".cart-close");
const cartItems = document.querySelector(".cart-items");
const cartDrawerCount = document.querySelector(".cart-drawer-count");
const cartTotalPrice = document.querySelector(".cart-total-price");
const cartCheckout = document.querySelector(".cart-checkout");
const cartCheckoutMessage = document.querySelector(".cart-checkout-message");
const productDialog = document.querySelector(".product-dialog");
const productDialogClose = document.querySelector(".product-dialog-close");
const productDialogImage = document.querySelector(".product-dialog-image");
const productDialogCategory = document.querySelector(".product-dialog-category");
const productDialogTitle = document.querySelector("#product-dialog-title");
const productDialogDescription = document.querySelector(".product-dialog-description");
const productDialogUse = document.querySelector(".product-dialog-use");
const productDialogFeatures = document.querySelector(".product-dialog-features");
const productDialogPrice = document.querySelector(".product-dialog-price");
const productDialogAdd = document.querySelector(".product-dialog-add");
const philosophyDialog = document.querySelector(".philosophy-dialog");
const philosophyOpen = document.querySelector(".philosophy-open");
const philosophyClose = document.querySelector(".philosophy-dialog-close");
const solesPerDollar = 3.75;
const cart = new Map();
let activeProduct = null;
let toastTimeout;
let evaluationQuestion = 0;
let evaluationScore = 0;
let isEvaluating = false;

const productCategories = [
  { id: "headphones", name: "Audífonos" },
  { id: "microphones", name: "Micrófonos" },
  { id: "speakers", name: "Parlantes" },
  { id: "professional", name: "Audio profesional y accesorios" },
];

const catalogProducts = [
  { category: "headphones", name: "AURAL Uno", description: "Inalámbricos · Cancelación de ruido", pricePEN: 4890, tag: "Más vendido", image: "photo-1546435770-a3e426bf472b", alt: "Audífonos de diadema color negro" },
  { category: "headphones", name: "AURAL Estudio", description: "Alta fidelidad · Sobre la oreja", pricePEN: 3650, tag: "Edición estudio", image: "photo-1484704849700-f032a568e944", alt: "Audífonos de estudio sobre fondo claro" },
  { category: "headphones", name: "AURAL Movimiento", description: "Compactos · Para llevar", pricePEN: 2490, tag: "Nuevo", image: "photo-1606220945770-b5b6c2c55bf1", alt: "Audífonos inalámbricos compactos" },
  { category: "headphones", name: "AURAL Pulso", description: "Graves profundos · Bluetooth", pricePEN: 3190, tag: "Inalámbricos", image: "photo-1505740420928-5e560c06d30e", alt: "Audífonos inalámbricos de diadema" },
  { category: "headphones", name: "AURAL Silencio", description: "Cancelación activa · Sobre la oreja", pricePEN: 5290, tag: "Escucha inmersiva", image: "photo-1583394838336-acd977736f90", alt: "Audífonos de diadema premium" },
  { category: "headphones", name: "AURAL Ligero", description: "Ligeros · Para todos los días", pricePEN: 1990, tag: "Ultraligeros", image: "photo-1590658268037-6bf12165a8df", alt: "Audífonos ligeros de diseño compacto" },
  { category: "headphones", name: "AURAL Plegable", description: "Audio nítido · Diseño plegable", pricePEN: 2790, tag: "Versátiles", image: "photo-1598331668826-20cecc596b86", alt: "Audífonos plegables para escuchar música" },
  { category: "microphones", name: "AURAL Voz", description: "Voz clara · Grabación y transmisión", pricePEN: 1290, tag: "Micrófono", image: "photo-1590602847861-f357a9332bbc", alt: "Micrófono para grabación de voz" },
  { category: "microphones", name: "AURAL Condensador", description: "Condensador · Estudio", pricePEN: 2490, tag: "Estudio", image: "photo-1520523839897-bd0b52f945a0", alt: "Micrófono de condensador para estudio" },
  { category: "microphones", name: "AURAL Podcast", description: "Pódcast · Captura direccional", pricePEN: 1890, tag: "Pódcast", image: "photo-1524368535928-5b5e00ddc76b", alt: "Micrófono para grabación de voz y pódcast" },
  { category: "microphones", name: "AURAL Escenario", description: "Dinámico · Presentaciones en vivo", pricePEN: 1590, tag: "En vivo", image: "photo-1516280440614-37939bbacd81", alt: "Cantante con micrófono en escenario" },
  { category: "microphones", name: "AURAL Compacto", description: "Compacto · Conexión USB-C", pricePEN: 990, tag: "Compacto", image: "photo-1511379938547-c1f69419868d", alt: "Equipo compacto de grabación en estudio" },
  { category: "microphones", name: "AURAL Doble", description: "Doble canal · Entrevistas", pricePEN: 2990, tag: "Doble canal", image: "photo-1493225457124-a3eb161ffa5f", alt: "Entrevista musical con micrófono" },
  { category: "microphones", name: "AURAL Inalámbrico", description: "Inalámbrico · Libertad de movimiento", pricePEN: 2390, tag: "Inalámbrico", image: "photo-1506157786151-b8491531f063", alt: "Presentación en vivo con micrófono inalámbrico" },
  { category: "speakers", name: "AURAL Forma", description: "Parlante inalámbrico · Diseño minimalista", pricePEN: 2790, tag: "Diseño premium", image: "photo-1608043152269-423dbba4e7e1", alt: "Parlante inalámbrico de diseño minimalista" },
  { category: "speakers", name: "AURAL Vinilo", description: "Tocadiscos · Estilo nogal", pricePEN: 4890, tag: "Edición vinilo", image: "photo-1603048588665-791ca8aea617", alt: "Tocadiscos de vinilo con estética cálida y elegante", style: "vinyl" },
  { category: "speakers", name: "AURAL Madera", description: "Par estéreo · Acabado cálido", pricePEN: 5490, tag: "Acabado madera", image: "photo-1545454675-3531b543be5d", alt: "Parlante de estudio con laterales de madera", style: "wood" },
  { category: "speakers", name: "AURAL Estéreo", description: "Monitores · Sonido preciso", pricePEN: 3990, tag: "Estéreo", image: "photo-1563330232-57114bb0823c", alt: "Monitores de parlante en un estudio de audio" },
  { category: "speakers", name: "AURAL Colección", description: "Discos de vinilo · Estética retro", pricePEN: 2490, tag: "Estilo vinilo", image: "photo-1461360228754-6e81c478b882", alt: "Colección de discos de vinilo", style: "vinyl" },
  { category: "speakers", name: "AURAL Hogar", description: "Bluetooth · Sonido para el hogar", pricePEN: 6290, tag: "Para el hogar", image: "photo-1589003077984-894e133dabab", alt: "Parlante inalámbrico para el hogar" },
  { category: "speakers", name: "AURAL Portátil", description: "Bluetooth · Diseño compacto", pricePEN: 1790, tag: "Portátil", image: "photo-1487180144351-b8472da7d491", alt: "Parlante compacto para escuchar música" },
  { category: "professional", name: "AURAL Enlace", description: "Sistema inalámbrico · Portátil", pricePEN: 2190, tag: "Sistema inalámbrico", image: "photo-1478737270239-2f02b77fc618", alt: "Equipo de audio inalámbrico" },
  { category: "professional", name: "AURAL Reunión", description: "Sistema para juntas · Conferencias", pricePEN: 5490, tag: "Reuniones", image: "photo-1497366811353-6870744d04b2", alt: "Sala preparada para una reunión" },
  { category: "professional", name: "AURAL Monitor", description: "Monitoreo · Estudio", pricePEN: 3290, tag: "Monitoreo", image: "photo-1492684223066-81342ee5ff30", alt: "Equipo técnico de sonido en un evento" },
  { category: "professional", name: "AURAL Videollamada", description: "Videoconferencia · Audio integrado", pricePEN: 6990, tag: "Videoconferencia", image: "photo-1521737711867-e3b97375f902", alt: "Equipo para videoconferencias" },
  { category: "professional", name: "AURAL Programa de audio", description: "Software · Producción de audio", pricePEN: 890, tag: "Software", image: "photo-1611532736597-de2d4265fba3", alt: "Software de producción de audio en una pantalla" },
  { category: "professional", name: "AURAL Accesorios", description: "Complementos · Uso diario", pricePEN: 390, tag: "Accesorio", image: "photo-1606400082777-ef05f3c5cde2", alt: "Accesorios para equipo de audio" },
  { category: "professional", name: "AURAL Ropa", description: "Ropa · Colección AURAL", pricePEN: 590, tag: "Colección AURAL", image: "photo-1521572163474-6864f9cf17ab", alt: "Prenda de la colección AURAL" },
];

const productFilters = document.querySelector(".product-filters");
const productCatalog = document.querySelector(".product-catalog");
const productResults = document.querySelector(".product-results");
const allProductGroups = [{ id: "all", name: "Todos" }, ...productCategories];

function formatPrice(pricePEN) {
  const soles = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(pricePEN);
  const dollars = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(pricePEN / solesPerDollar));
  return { soles: `S/ ${soles}`, dollars: `(US$ ${dollars})` };
}

function getProductUsage(product) {
  if (product.category === "headphones") {
    return "Para escuchar música, pódcasts y contenido en tus desplazamientos, sesiones de trabajo o momentos de concentración.";
  }
  if (product.category === "microphones") {
    return "Para capturar voz con claridad en grabaciones, transmisiones, entrevistas, presentaciones o sesiones de estudio.";
  }
  if (product.category === "speakers" && product.style === "vinyl") {
    return "Para disfrutar discos de vinilo y ambientar tus espacios con una experiencia musical de inspiración retro.";
  }
  if (product.category === "speakers" && product.style === "wood") {
    return "Para escuchar música en casa con un sistema estéreo y una estética cálida que acompaña la decoración.";
  }
  if (product.category === "speakers") {
    return "Para reproducir música y contenido de audio en casa o llevarlo contigo, según el formato del modelo.";
  }
  if (product.description.toLocaleLowerCase("es").includes("software")) {
    return "Para producir, organizar y trabajar con audio desde un entorno de creación digital.";
  }
  if (product.description.toLocaleLowerCase("es").includes("ropa")) {
    return "Para llevar la identidad de AURAL en tu día a día.";
  }
  return "Para complementar equipos de audio en el hogar, el estudio, reuniones o actividades profesionales.";
}

function getProductFeatures(product) {
  const features = product.description.split(" · ").filter(Boolean);
  features.push(product.tag);
  if (product.category === "speakers" && product.style === "vinyl") {
    features.push("Estética inspirada en el vinilo");
  }
  if (product.category === "speakers" && product.style === "wood") {
    features.push("Acabado visual cálido");
  }
  return [...new Set(features)];
}

function openProductDetails(product) {
  activeProduct = product;
  const category = productCategories.find((item) => item.id === product.category);
  const formattedPrice = formatPrice(product.pricePEN);
  productDialogImage.src = `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=1200&q=90`;
  productDialogImage.alt = product.alt;
  productDialogCategory.textContent = category.name;
  productDialogTitle.textContent = product.name;
  productDialogDescription.textContent = product.description;
  productDialogUse.textContent = getProductUsage(product);
  productDialogFeatures.replaceChildren();
  getProductFeatures(product).forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    productDialogFeatures.append(item);
  });
  productDialogPrice.textContent = `${formattedPrice.soles} ${formattedPrice.dollars}`;
  productDialogAdd.dataset.product = product.name;
  productDialog.showModal();
}

if (new Set(catalogProducts.map((product) => product.image)).size !== catalogProducts.length) {
  throw new Error("Cada producto debe tener una imagen única.");
}

function makeProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.category = product.category;
  card.dataset.product = product.name;
  if (product.style) card.dataset.style = product.style;

  const imageLink = document.createElement("a");
  imageLink.className = "product-image";
  imageLink.href = "#productos";
  imageLink.setAttribute("aria-label", `Ver el producto ${product.name}`);

  const tag = document.createElement("span");
  tag.className = "product-tag product-tag-outline";
  tag.textContent = product.tag;

  const image = document.createElement("img");
  image.src = `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=900&q=85`;
  image.alt = product.alt;
  image.loading = "lazy";

  const arrow = document.createElement("span");
  arrow.className = "image-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  imageLink.append(tag, image, arrow);

  const meta = document.createElement("div");
  meta.className = "product-meta";
  const details = document.createElement("div");
  const name = document.createElement("h3");
  const nameButton = document.createElement("button");
  nameButton.className = "product-name-button";
  nameButton.type = "button";
  nameButton.textContent = product.name;
  name.append(nameButton);
  const description = document.createElement("p");
  description.textContent = product.description;
  details.append(name, description);
  const price = document.createElement("strong");
  const displayedPrice = formatPrice(product.pricePEN);
  price.className = "product-price";
  const soles = document.createElement("span");
  soles.textContent = displayedPrice.soles;
  const dollars = document.createElement("span");
  dollars.className = "price-usd";
  dollars.textContent = displayedPrice.dollars;
  price.append(soles, dollars);
  meta.append(details, price);

  const addButton = document.createElement("button");
  addButton.className = "add-button";
  addButton.type = "button";
  addButton.dataset.product = product.name;
  addButton.append(document.createTextNode("Añadir a la bolsa "));
  const plus = document.createElement("span");
  plus.setAttribute("aria-hidden", "true");
  plus.textContent = "+";
  addButton.append(plus);
  card.append(imageLink, meta, addButton);
  return card;
}

function renderProductCatalog() {
  productFilters.replaceChildren();
  productCatalog.replaceChildren();
  allProductGroups.forEach((group) => {
    const products = group.id === "all"
      ? catalogProducts
      : catalogProducts.filter((product) => product.category === group.id);
    const filter = document.createElement("button");
    filter.className = "product-filter";
    filter.type = "button";
    filter.dataset.category = group.id;
    filter.setAttribute("aria-pressed", String(group.id === "all"));
    filter.textContent = `${group.name} · ${products.length}`;
    filter.addEventListener("click", () => {
      productFilters.querySelectorAll(".product-filter").forEach((button) => {
        button.setAttribute("aria-pressed", String(button === filter));
      });
      productCatalog.querySelectorAll(".product-category").forEach((section) => {
        section.hidden = group.id !== "all" && section.dataset.category !== group.id;
      });
      const shownCount = group.id === "all" ? catalogProducts.length : products.length;
      productResults.textContent = `Mostrando ${shownCount} ${shownCount === 1 ? "producto" : "productos"}.`;
    });
    productFilters.append(filter);
  });

  productCategories.forEach((category) => {
    const section = document.createElement("section");
    section.className = "product-category";
    section.dataset.category = category.id;
    section.setAttribute("aria-labelledby", `category-${category.id}`);
    const heading = document.createElement("h3");
    heading.id = `category-${category.id}`;
    heading.textContent = category.name;
    const controls = document.createElement("div");
    controls.className = "product-carousel-controls";
    const carouselId = `products-${category.id}`;
    const categoryHeader = document.createElement("div");
    categoryHeader.className = "product-category-header";
    categoryHeader.append(heading, controls);
    const grid = document.createElement("div");
    grid.className = "product-grid product-carousel";
    grid.id = carouselId;
    grid.tabIndex = 0;
    grid.setAttribute("aria-label", `${category.name}, desplázate horizontalmente para ver los siete productos`);
    ["left", "right"].forEach((direction) => {
      const button = document.createElement("button");
      button.className = "carousel-arrow";
      button.type = "button";
      button.setAttribute("aria-label", `${direction === "left" ? "Desplazar a la izquierda" : "Desplazar a la derecha"}: ${category.name}`);
      button.setAttribute("aria-controls", carouselId);
      button.textContent = direction === "left" ? "←" : "→";
      button.addEventListener("click", () => {
        grid.scrollBy({ left: (direction === "left" ? -1 : 1) * grid.clientWidth * 0.82, behavior: "smooth" });
      });
      controls.append(button);
    });
    catalogProducts
      .filter((product) => product.category === category.id)
      .forEach((product) => grid.append(makeProductCard(product)));
    section.append(categoryHeader, grid);
    productCatalog.append(section);
  });

  productResults.textContent = `Mostrando ${catalogProducts.length} productos.`;
}

renderProductCatalog();

function renderCart() {
  const itemCount = [...cart.values()].reduce((total, item) => total + item.quantity, 0);
  const totalPEN = [...cart.values()].reduce((total, item) => total + item.product.pricePEN * item.quantity, 0);
  cartCount.textContent = String(itemCount);
  cartDrawerCount.textContent = `(${itemCount})`;
  cartTotalPrice.textContent = `${formatPrice(totalPEN).soles} ${formatPrice(totalPEN).dollars}`;
  cartItems.replaceChildren();

  if (cart.size === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "cart-empty";
    emptyMessage.textContent = "Tu bolsa está vacía. Explora el catálogo y añade tus favoritos.";
    cartItems.append(emptyMessage);
    return;
  }

  cart.forEach(({ product, quantity }, name) => {
    const row = document.createElement("article");
    row.className = "cart-item";
    const image = document.createElement("img");
    image.src = `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=160&h=160&q=75`;
    image.alt = "";
    const details = document.createElement("div");
    details.className = "cart-item-details";
    const title = document.createElement("h3");
    title.textContent = product.name;
    const price = document.createElement("p");
    const formatted = formatPrice(product.pricePEN);
    price.textContent = `${formatted.soles} ${formatted.dollars}`;
    const controls = document.createElement("div");
    controls.className = "cart-item-controls";
    const decrease = document.createElement("button");
    decrease.type = "button";
    decrease.setAttribute("aria-label", `Quitar una unidad de ${product.name}`);
    decrease.textContent = "−";
    decrease.addEventListener("click", () => updateCartQuantity(name, -1));
    const quantityLabel = document.createElement("span");
    quantityLabel.textContent = String(quantity);
    const increase = document.createElement("button");
    increase.type = "button";
    increase.setAttribute("aria-label", `Añadir una unidad de ${product.name}`);
    increase.textContent = "+";
    increase.addEventListener("click", () => updateCartQuantity(name, 1));
    const remove = document.createElement("button");
    remove.className = "cart-item-remove";
    remove.type = "button";
    remove.setAttribute("aria-label", `Eliminar ${product.name} de la bolsa`);
    remove.textContent = "Eliminar";
    remove.addEventListener("click", () => {
      cart.delete(name);
      renderCart();
    });
    controls.append(decrease, quantityLabel, increase, remove);
    details.append(title, price, controls);
    row.append(image, details);
    cartItems.append(row);
  });
}

function updateCartQuantity(name, change) {
  const item = cart.get(name);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) cart.delete(name);
  renderCart();
}

function addProductToCart(product) {
  const existingItem = cart.get(product.name);
  cart.set(product.name, { product, quantity: (existingItem?.quantity ?? 0) + 1 });
  renderCart();
  toast.textContent = `${product.name} se añadió a tu bolsa`;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function openCart() {
  cartDrawer.hidden = false;
  cartOverlay.hidden = false;
  document.body.classList.add("cart-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartButton.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => {
    cartDrawer.classList.add("is-open");
    cartOverlay.classList.add("is-open");
  });
  cartClose.focus();
}

function closeCart(returnFocus = true) {
  cartDrawer.classList.remove("is-open");
  cartOverlay.classList.remove("is-open");
  document.body.classList.remove("cart-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartButton.setAttribute("aria-expanded", "false");
  window.setTimeout(() => {
    if (cartDrawer.getAttribute("aria-hidden") === "true") {
      cartDrawer.hidden = true;
      cartOverlay.hidden = true;
    }
  }, 280);
  if (returnFocus) cartButton.focus();
}

cartButton.addEventListener("click", openCart);
cartClose.addEventListener("click", () => closeCart());
cartOverlay.addEventListener("click", () => closeCart());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && productsNavToggle.getAttribute("aria-expanded") === "true") {
    closeProductsMenu();
    productsNavToggle.focus();
    return;
  }
  if (event.key === "Escape" && philosophyDialog.open) {
    philosophyDialog.close();
    return;
  }
  if (event.key === "Escape" && productDialog.open) {
    productDialog.close();
    return;
  }
  if (event.key === "Escape" && cartButton.getAttribute("aria-expanded") === "true") closeCart();
});
cartCheckout.addEventListener("click", () => {
  cartCheckoutMessage.textContent = cart.size
    ? "La tienda es una demostración; el pago aún no está conectado."
    : "Añade productos a tu bolsa antes de continuar.";
});

renderCart();

const evaluationQuestions = [
  { question: "¿Qué marca presenta esta tienda?", options: ["AURAL", "SONORA", "FRECUENCIA"], answer: 0 },
  { question: "¿Cuál es el nombre del modelo más vendido?", options: ["AURAL Movimiento", "AURAL Uno", "AURAL Estudio"], answer: 1 },
  { question: "¿Cuánto cuesta AURAL Uno?", options: ["S/ 2,490", "S/ 3,650", "S/ 4,890"], answer: 2 },
  { question: "¿Qué característica se destaca en AURAL Uno?", options: ["Cancelación de ruido", "Resistencia al agua", "Audio deportivo"], answer: 0 },
  { question: "¿Cuál modelo se describe como de alta fidelidad?", options: ["AURAL Movimiento", "AURAL Estudio", "AURAL Uno"], answer: 1 },
  { question: "¿Cuánto cuesta AURAL Estudio?", options: ["S/ 3,650", "S/ 4,890", "S/ 2,490"], answer: 0 },
  { question: "¿Qué modelo se presenta como compacto y fácil de llevar?", options: ["AURAL Uno", "AURAL Estudio", "AURAL Movimiento"], answer: 2 },
  { question: "¿Cuál es el precio de AURAL Movimiento?", options: ["S/ 4,890", "S/ 2,490", "S/ 3,650"], answer: 1 },
  { question: "¿Qué modelo está etiquetado como «Nuevo»?", options: ["AURAL Movimiento", "AURAL Estudio", "AURAL Uno"], answer: 0 },
  { question: "¿Qué modelo lleva la etiqueta «Edición estudio»?", options: ["AURAL Uno", "AURAL Estudio", "AURAL Movimiento"], answer: 1 },
  { question: "¿Qué modelo está etiquetado como «Más vendido»?", options: ["AURAL Movimiento", "AURAL Uno", "AURAL Estudio"], answer: 1 },
  { question: "¿Cuál se describe como inalámbrico?", options: ["AURAL Uno", "AURAL Estudio", "Ambos"], answer: 0 },
  { question: "¿Cuál se describe como de alta fidelidad y sobre la oreja?", options: ["AURAL Movimiento", "AURAL Estudio", "AURAL Uno"], answer: 1 },
  { question: "¿A partir de qué monto se anuncia envío gratis?", options: ["Compras mayores a S/ 2,500", "Cualquier compra", "Compras mayores a S/ 5,000"], answer: 0 },
  { question: "¿Qué acción ofrece el botón de cada producto?", options: ["Añadir a la bolsa", "Comparar precios", "Descargar ficha"], answer: 0 },
  { question: "¿Qué muestra el contador junto a «Bolsa»?", options: ["El número de artículos añadidos", "El total en pesos", "Los productos favoritos"], answer: 0 },
  { question: "¿Qué propone el mensaje principal de AURAL?", options: ["Escucha lo que importa", "Corre más lejos", "Diseña tu espacio"], answer: 0 },
  { question: "Según la página, ¿qué cabe en una nota?", options: ["Un mundo entero", "Una ciudad", "Una historia breve"], answer: 0 },
  { question: "¿Qué cree AURAL sobre el buen sonido?", options: ["Solo se oye", "Se oye y también te mueve y conecta", "Solo importa en el estudio"], answer: 1 },
  { question: "¿Qué invita a encontrar la sección de filosofía?", options: ["Tu propia frecuencia", "Tu próximo escenario", "Tu lista de compras"], answer: 0 },
  { question: "¿Qué zona de Lima puedes elegir en el formulario de contacto?", options: ["Miraflores", "Cusco", "Arequipa"], answer: 0 },
  { question: "¿Qué dato de contacto solicita el formulario?", options: ["Correo electrónico", "Dirección postal", "Fecha de nacimiento"], answer: 0 },
  { question: "¿Cómo se llama el enlace de navegación a la colección?", options: ["Productos", "Contacto", "Ubicaciones"], answer: 0 },
  { question: "¿Qué enlace lleva a la filosofía de AURAL?", options: ["Nuestra filosofía", "Ver bolsa", "Contacto"], answer: 0 },
  { question: "¿Qué frase aparece en la cinta naranja de la página?", options: ["Precisión en cada nota", "Más por menos", "Escucha en silencio"], answer: 0 },
  { question: "¿Qué frase acompaña a AURAL Uno en la ficha?", options: ["Inalámbricos · Cancelación de ruido", "Compactos · Para llevar", "Alta fidelidad · Sobre la oreja"], answer: 0 },
  { question: "¿Qué frase acompaña a AURAL Estudio en la ficha?", options: ["Inalámbricos · Cancelación de ruido", "Alta fidelidad · Sobre la oreja", "Compactos · Para llevar"], answer: 1 },
  { question: "¿Qué frase acompaña a AURAL Movimiento en la ficha?", options: ["Compactos · Para llevar", "Alta fidelidad · Sobre la oreja", "Edición estudio"], answer: 0 },
  { question: "¿Qué acción permite el enlace «Explorar colección»?", options: ["Ir a los audífonos", "Abrir el boletín", "Ver la filosofía"], answer: 0 },
  { question: "¿Qué idea resume la marca en el pie de página?", options: ["Hecho para escuchar", "Hecho para correr", "Hecho para viajar"], answer: 0 },
];

function addAssistantMessage(text, isUser = false) {
  const message = document.createElement("p");
  message.className = `assistant-message${isUser ? " is-user" : ""}`;
  message.textContent = text;
  assistantMessages.append(message);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function startEvaluation() {
  isEvaluating = true;
  evaluationQuestion = 0;
  evaluationScore = 0;
  assistantProgress.hidden = false;
  addAssistantMessage("¡Vamos! Son 30 preguntas de opción múltiple sobre AURAL. Elige una respuesta en cada pregunta.");
  showEvaluationQuestion();
}

function showEvaluationQuestion() {
  if (evaluationQuestion >= evaluationQuestions.length) {
    const percentage = Math.round((evaluationScore / evaluationQuestions.length) * 100);
    isEvaluating = false;
    assistantProgress.textContent = `Evaluación finalizada · ${evaluationQuestions.length} de ${evaluationQuestions.length}`;
    addAssistantMessage(`Terminaste la evaluación: ${evaluationScore} de ${evaluationQuestions.length} respuestas correctas (${percentage}%).`);
    addAssistantMessage(percentage >= 70 ? "¡Buen trabajo! Ya conoces muy bien AURAL." : "Puedes volver a intentarlo cuando quieras y descubrir más sobre AURAL.");
    addAssistantOptions([{ label: "Repetir evaluación", action: startEvaluation }]);
    return;
  }

  const current = evaluationQuestions[evaluationQuestion];
  assistantProgress.textContent = `Pregunta ${evaluationQuestion + 1} de ${evaluationQuestions.length} · ${evaluationScore} correctas`;
  addAssistantMessage(`${evaluationQuestion + 1}. ${current.question}`);
  addAssistantOptions(current.options.map((option, index) => ({
    label: option,
    action: () => answerEvaluation(index),
  })));
}

function addAssistantOptions(options) {
  const group = document.createElement("div");
  group.className = "assistant-options";
  options.forEach(({ label, action }) => {
    const button = document.createElement("button");
    button.className = "assistant-option";
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => {
      group.querySelectorAll("button").forEach((option) => { option.disabled = true; });
      action();
    });
    group.append(button);
  });
  assistantMessages.append(group);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function answerEvaluation(answer) {
  const current = evaluationQuestions[evaluationQuestion];
  const isCorrect = answer === current.answer;
  if (isCorrect) evaluationScore += 1;
  addAssistantMessage(isCorrect ? "¡Correcto!" : `No es esa. La respuesta correcta es: ${current.options[current.answer]}.`);
  evaluationQuestion += 1;
  showEvaluationQuestion();
}

function respondToAssistant(text) {
  const query = text.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  addAssistantMessage(text, true);

  if (/(cancelar|terminar|salir).*(evaluacion|prueba)|(evaluacion|prueba).*(cancelar|terminar|salir)/.test(query)) {
    isEvaluating = false;
    assistantProgress.hidden = true;
    addAssistantMessage("Evaluación cancelada. Puedes iniciarla de nuevo cuando quieras.");
    return;
  }
  if (isEvaluating) {
    addAssistantMessage("Para continuar, selecciona una de las opciones de la pregunta. Escribe «cancelar evaluación» si quieres salir.");
    return;
  }
  if (/(evaluacion|30 preguntas|iniciar prueba|hacer prueba|quiz)/.test(query)) {
    startEvaluation();
  } else if (/(hola|buenas|buenos dias|buenas tardes)/.test(query)) {
    addAssistantMessage("¡Hola! Puedo ayudarte a conocer los productos AURAL, buscar entre las categorías o iniciar una evaluación de 30 preguntas.");
  } else if (/(envio|entrega|gratis)/.test(query)) {
    addAssistantMessage("La página anuncia envío gratis en compras mayores a S/ 2,500.");
  } else if (/(aural uno|uno\b)/.test(query)) {
    addAssistantMessage(`AURAL Uno cuesta ${formatPrice(4890).soles} ${formatPrice(4890).dollars} y se describe como inalámbrico, con cancelación de ruido. Está marcado como el más vendido.`);
  } else if (/(aural estudio|estudio\b)/.test(query)) {
    addAssistantMessage(`AURAL Estudio cuesta ${formatPrice(3650).soles} ${formatPrice(3650).dollars} y ofrece alta fidelidad con diseño sobre la oreja.`);
  } else if (/(aural movimiento|movimiento\b)/.test(query)) {
    addAssistantMessage(`AURAL Movimiento cuesta ${formatPrice(2490).soles} ${formatPrice(2490).dollars}. Es compacto y fácil de llevar.`);
  } else if (/(parlante|altavoz|aural forma)/.test(query)) {
    addAssistantMessage(`Hay siete modelos de parlantes, con diseños inspirados en vinilos y acabados de madera. AURAL Forma cuesta ${formatPrice(2790).soles} ${formatPrice(2790).dollars}; explora la categoría «Parlantes».`);
  } else if (/(microfono|microfonos)/.test(query)) {
    addAssistantMessage("El catálogo tiene siete opciones de micrófonos AURAL para estudio, podcast, escenario y uso inalámbrico. Explóralas en la categoría «Micrófonos».");
  } else if (/(precio|cuanto cuesta|cuestan|catalogo|productos|audifonos|coleccion)/.test(query)) {
    addAssistantMessage("Hay siete opciones en cada categoría: audífonos, micrófonos, parlantes y audio profesional y accesorios. Los productos y precios son de muestra; puedes filtrar el catálogo por categoría.");
  } else if (/(contacto|formulario|correo|consulta)/.test(query)) {
    addAssistantMessage("Puedes enviarnos una consulta en la sección «Contacto». Incluye tu correo y selecciona una zona de Lima para orientarte.");
  } else if (/(ayuda|que puedes|opciones)/.test(query)) {
    addAssistantMessage("Puedo ayudarte con audífonos, micrófonos, parlantes, audio profesional, el envío gratis o la evaluación de 30 preguntas.");
  } else {
    addAssistantMessage("Soy el asistente de AURAL y puedo responder sobre productos, precios, envío y contacto. También puedes filtrar el catálogo por categoría o iniciar la evaluación de 30 preguntas.");
  }
}

function setAssistantOpen(isOpen) {
  assistantPanel.hidden = !isOpen;
  assistantToggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) assistantInput.focus();
}

assistantToggle.addEventListener("click", () => {
  setAssistantOpen(assistantPanel.hidden);
  if (assistantMessages.childElementCount === 0) {
    addAssistantMessage("¡Hola! Soy el asistente de AURAL. Pregúntame por los audífonos o prueba tus conocimientos con una evaluación de 30 preguntas.");
  }
});
assistantClose.addEventListener("click", () => {
  setAssistantOpen(false);
  assistantToggle.focus();
});
assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = assistantInput.value.trim();
  if (!message) return;
  assistantInput.value = "";
  respondToAssistant(message);
});
document.querySelectorAll("[data-assistant-prompt]").forEach((button) => {
  button.addEventListener("click", () => respondToAssistant(button.dataset.assistantPrompt));
});

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
  navigation.classList.toggle("is-open", !isExpanded);
});

function closeProductsMenu() {
  productsNavToggle.setAttribute("aria-expanded", "false");
  productsNavOptions.hidden = true;
  productsNavOptions.classList.remove("is-open");
}

productsNavToggle.addEventListener("click", () => {
  const isExpanded = productsNavToggle.getAttribute("aria-expanded") === "true";
  productsNavToggle.setAttribute("aria-expanded", String(!isExpanded));
  productsNavOptions.hidden = isExpanded;
  productsNavOptions.classList.toggle("is-open", !isExpanded);
});

productsNavOptions.addEventListener("click", (event) => {
  const option = event.target.closest("[data-product-category]");
  if (!option) return;

  const category = option.dataset.productCategory;
  const filter = productFilters.querySelector(`[data-category="${category}"]`);
  const section = productCatalog.querySelector(`.product-category[data-category="${category}"]`);
  if (!filter || !section) throw new Error(`No se encontró la categoría de productos "${category}".`);

  filter.click();
  closeProductsMenu();
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    navigation.classList.remove("is-open");
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".products-nav-item") && productsNavToggle.getAttribute("aria-expanded") === "true") {
    closeProductsMenu();
  }
});

productCatalog.addEventListener("click", (event) => {
  const target = event.target;
  const addButton = target.closest(".add-button");
  if (addButton) {
    const product = catalogProducts.find((item) => item.name === addButton.dataset.product);
    if (!product) throw new Error(`No se encontró el producto "${addButton.dataset.product}" en el catálogo.`);
    addProductToCart(product);
    return;
  }

  const card = target.closest(".product-card");
  if (!card || target.closest(".carousel-arrow")) return;
  const product = catalogProducts.find((item) => item.name === card.dataset.product);
  if (!product) throw new Error("No se encontró el producto seleccionado en el catálogo.");
  event.preventDefault();
  openProductDetails(product);
});

productDialogClose.addEventListener("click", () => productDialog.close());
productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) productDialog.close();
});
productDialogAdd.addEventListener("click", () => {
  if (!activeProduct) throw new Error("No hay ningún producto seleccionado para añadir a la bolsa.");
  addProductToCart(activeProduct);
  productDialog.close();
});

philosophyOpen.addEventListener("click", () => philosophyDialog.showModal());
philosophyClose.addEventListener("click", () => philosophyDialog.close());
philosophyDialog.addEventListener("click", (event) => {
  if (event.target === philosophyDialog) philosophyDialog.close();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  contactMessage.textContent = "Formulario validado. Este sitio de demostración aún no envía mensajes; conecta un servicio de contacto para recibir consultas.";
  contactMessage.classList.add("is-success");
  contactForm.reset();
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
