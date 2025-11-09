
const menuContainer = M.getElementById("menuDinamic");
const form = M.getElementById("form");
const padreSelect = M.getElementById("principal");
const enter = M.getElementById("enter");

let menuData = [];

// Cargar datos desde el JSON
fetch("submenujson.json")
  .then(res => res.json())
  .then(data => {
    menuData = data.menuDinamic;
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
    const li = M.createElement("li");
    const a = M.createElement("a");
    a.textContent = item.nombre;
    a.href = item.principal || "#";

    li.appendChild(a);

    // Si hay submenús
    if (item.submenu && item.submenu.length > 0) {
      const ul = M.createElement("ul");
      item.submenu.forEach(sub => {
        const subLi = M.createElement("li");
        const subA = M.createElement("a");
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
  padreSelect.innerHTML = '<option value="">Seleccione o Nuevo</option>';
  menuData.forEach(item => {
    const option = M.createElement("option");
    option.value = item.id;
    option.textContent = item.nombre;
    padreSelect.appendChild(option);
  });
}

// aqui agrego un nuevo elemento al menú
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = M.getElementById("nombre").value.trim();
  const dealle = M.getElementById("enlace").value.trim();
  const principal = M.getElementById("padre").value;

  if (!nombre) {
    alert("El nombre es obligatorio");
    return;
  }

  const newItem = {
    id: Date.now(),
    nombre,
    enlace
  };

  if (principal) {
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

