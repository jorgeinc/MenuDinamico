
const menuContainer = document.getElementById("menu");
const form = document.getElementById("form");
const padreSelect = document.getElementById("principal");
const enter = document.getElementById("enter");

let menuData = [];

// Cargar datos desde el JSON
fetch("submenujson.json")
  .then(res => res.json())
  .then(data => {
    menuData = data.menu;
    renderMenu();
    updateParentSelect();
  })
  .catch(() => {
    console.error("Error al cargar submenujson.json");
  });

// Renderiza el menú principal y submenús
function renderMenu() {
  menuContainer.innerHTML = "";
  menuData.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.nombre;
    a.href = item.enlace || "#";

    li.appendChild(a);

    // Si hay submenús
    if (item.submenu && item.submenu.length > 0) {
      const ul = document.createElement("ul");
      item.submenu.forEach(sub => {
        const subLi = document.createElement("li");
        const subA = document.createElement("a");
        subA.textContent = sub.nombre;
        subA.href = sub.enlace || "#";
        subLi.appendChild(subA);
        ul.appendChild(subLi);
      });
      li.appendChild(ul);
    }

    menuContainer.appendChild(li);
  });
}

// Actualiza la lista de padres en el formulario
function updateParentSelect() {
  princialSelect.innerHTML = '<option value="">Seleccione o Nuevo</option>';
  menuData.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.nombre;
    padreSelect.appendChild(option);
  });
}

// aqui agrego un nuevo elemento al menú
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const enlace = document.getElementById("enlace").value.trim();
  const principal = document.getElementById("principal").value;

  if (!nombre) {
    alert("El nombre es obligatorio");
    return;
  }

  const newItem = {
    id: Date.now(),
    nombre,
    enlace
  };

  if (padre) {
    const parentItem = menuData.find(i => i.id == principal);
    if (!parentItem.submenu) parentItem.submenu = [];
    parentItem.submenu.push(newItem);
  } else {
    menuData.push(newItem);
  }

  renderMenu();
  updateParentSelect();
  form.reset();
});

// (móvil)
enter.addEventListener("click", () => {
  menuContainer.classList.toggle("active");
});

