const API_BASE_URL = 'http://localhost:3000';

// Function to show the selected tab
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        if (tab.id === tabId) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    });
}

// Function to open a modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Function to close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fetch and populate menu data
async function fetchMenuData() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/menus`);
        const menus = await res.json();
        const menuList = document.getElementById('menu-list');
        menuList.innerHTML = menus.map(menu => `
            <tr>
                <td>${menu.name}</td>
                <td>${menu.description}</td>
                <td>₹${menu.price}</td>
                <td><img src="http://localhost:3000${menu.image}" alt="${menu.name}" width="50"></td>
                <td>
                    <button onclick="editMenu(${menu.id}, '${menu.name}', '${menu.description}', ${menu.price}, '${menu.image}')">Edit</button>
                    <button onclick="deleteMenu(${menu.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching menu data:', error);
    }
}

// Fetch and populate chef data
async function fetchChefData() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/chefs`);
        const chefs = await res.json();
        const chefList = document.getElementById('chef-list');
        chefList.innerHTML = chefs.map(chef => `
            <tr>
                <td>${chef.name}</td>
                <td>${chef.specialty}</td>
                <td><img src="http://localhost:3000${chef.image}" alt="${chef.name}" width="50"></td>
                <td>
                    <button onclick="editChef(${chef.id}, '${chef.name}', '${chef.specialty}', '${chef.image}')">Edit</button>
                    <button onclick="deleteChef(${chef.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching chef data:', error);
    }
}

// Edit menu item
function editMenu(id, name, description, price, image) {
    const menuForm = document.getElementById('menu-form');
    menuForm.elements['id'].value = id;
    menuForm.elements['name'].value = name;
    menuForm.elements['description'].value = description;
    menuForm.elements['price'].value = price;
    openModal('menu-modal');
}

// Edit chef
function editChef(id, name, specialty, image) {
    const chefForm = document.getElementById('chef-form');
    chefForm.elements['id'].value = id;
    chefForm.elements['name'].value = name;
    chefForm.elements['specialty'].value = specialty;
    openModal('chef-modal');
}

// Delete menu item
async function deleteMenu(id) {
    try {
        await fetch(`${API_BASE_URL}/api/menus/${id}`, { method: 'DELETE' });
        fetchMenuData();
    } catch (error) {
        console.error('Error deleting menu:', error);
    }
}

// Delete chef
async function deleteChef(id) {
    try {
        await fetch(`${API_BASE_URL}/api/chefs/${id}`, { method: 'DELETE' });
        fetchChefData();
    } catch (error) {
        console.error('Error deleting chef:', error);
    }
}

// Add or update menu item
document.getElementById('menu-form').addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/api/menus/${id}` : `${API_BASE_URL}/api/menus`;

    try {
        await fetch(url, { method, body: formData });
        fetchMenuData();
        closeModal('menu-modal');
        e.target.reset();
    } catch (error) {
        console.error('Error saving menu:', error);
    }
});

// Add or update chef
document.getElementById('chef-form').addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/api/chefs/${id}` : `${API_BASE_URL}/api/chefs`;

    try {
        await fetch(url, { method, body: formData });
        fetchChefData();
        closeModal('chef-modal');
        e.target.reset();
    } catch (error) {
        console.error('Error saving chef:', error);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    showTab('menu-tab'); // Default tab
    fetchMenuData();
    fetchChefData();
});
