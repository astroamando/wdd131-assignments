// Array de produtos fornecido na tarefa
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// 1. Seleciona o elemento HTML onde as opções vão aparecer
const selectElement = document.getElementById("productName");

// 2. Loop através do array para criar as opções
products.forEach(product => {
    // Cria um novo elemento <option>
    let newOption = document.createElement("option");
    
    // Define o valor (id) e o texto visível (name)
    newOption.value = product.id;
    newOption.textContent = product.name; // Usei name ao invés de id para ficar legível
    
    // Adiciona a opção criada dentro do select
    selectElement.appendChild(newOption);
});