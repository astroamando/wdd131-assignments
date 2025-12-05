// W06 Project - FocusFlow Logic
// Author: Amando Evangelista

// --- Requisito: Arrays e Objetos ---
// Inicializa o array de tarefas buscando do LocalStorage ou cria um vazio
let tasks = JSON.parse(localStorage.getItem('focusFlowTasks')) || [];
let completedSessions = Number(localStorage.getItem('focusFlowSessions')) || 0;

// --- Seleção de Elementos do DOM (Requisito: DOM Interaction) ---
const taskForm = document.getElementById('task-form');
const taskListElement = document.getElementById('task-list');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const sessionCountDisplay = document.getElementById('session-count');

// --- TIMER FUNCTIONS ---
let timerInterval;
let timeLeft = 25 * 60; // 25 minutos em segundos
let isRunning = false;

// Requisito: Função 1
function updateTimerDisplay() {
    if(!timerDisplay) return; // Evita erro nas páginas que não têm timer

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Requisito: Template Literals exclusively for output
    // Formata para 00:00
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Requisito: Função 2
function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    timerInterval = setInterval(() => {
        // Requisito: Conditional Branching
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            alert("Focus session complete!");
            
            // Atualiza sessões no LocalStorage
            completedSessions++;
            localStorage.setItem('focusFlowSessions', completedSessions);
            renderSessionCount();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

function renderSessionCount() {
    if(sessionCountDisplay) {
        sessionCountDisplay.textContent = completedSessions;
    }
}

// --- TASK FUNCTIONS ---

// Requisito: Função com Parâmetro e Array Method (map)
function renderTasks(filter = 'all') {
    if (!taskListElement) return; // Evita erro se não estiver na página de tasks

    taskListElement.innerHTML = ''; // Limpa a lista

    // Filtra as tarefas baseado no botão clicado
    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    // Requisito: Template Literals para criar HTML
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div>
                <strong>${task.category}</strong>: ${task.text}
            </div>
            <div>
                <button onclick="toggleTask(${task.id})">✔</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;
        taskListElement.appendChild(li);
    });
}

// Requisito: Adicionar Objeto ao Array
function addTask(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const input = document.getElementById('task-input');
    const category = document.getElementById('category-select');

    if (input.value.trim() === '') return;

    // Cria o objeto Task
    const newTask = {
        id: Date.now(), // Gera um ID único
        text: input.value,
        category: category.value,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    input.value = ''; // Limpa o input
}

// Funções globais para serem acessadas pelo onclick no HTML
window.toggleTask = function(id) {
    // Requisito: Array Method (find) e Modificação de Objeto
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
};

window.deleteTask = function(id) {
    // Requisito: Array Method (filter) para remover
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
};

// Requisito: LocalStorage
function saveTasks() {
    localStorage.setItem('focusFlowTasks', JSON.stringify(tasks));
}

// --- EVENT LISTENERS ---
// Requisito: Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa elementos dependendo da página
    if (timerDisplay) {
        updateTimerDisplay();
        renderSessionCount();
        startBtn.addEventListener('click', startTimer);
        resetBtn.addEventListener('click', resetTimer);
    }

    if (taskForm) {
        renderTasks();
        taskForm.addEventListener('submit', addTask);
        
        // Filtros
        document.getElementById('filter-all').addEventListener('click', () => renderTasks('all'));
        document.getElementById('filter-active').addEventListener('click', () => renderTasks('active'));
        document.getElementById('filter-completed').addEventListener('click', () => renderTasks('completed'));
    }
});