
// const API_BASE_URL = 'http://localhost:3000';
// const menuContainer = document.getElementById('menu-card');
// const selectedItems = document.getElementById('selected-items');
// const totalPriceElement = document.getElementById('total-price');
// const proceedButton = document.getElementById('proceed-btn');

// let totalPrice = 0;
// let selectedMenu = [];

// async function fetchMenu() {
//     try {
//         const res = await fetch(`${API_BASE_URL}/api/menus`);
//         const menus = await res.json();
//         menuContainer.innerHTML = menus.map(menu => `
//             <div class="menu-item">
              
//                 <img src="${menu.image}" alt="${menu.name}">
//                 <h3>${menu.name}</h3>
//                 <p>${menu.description}</p>
//                 <p>Price: ₹${menu.price}</p>


//                 <button onclick="selectMenu(${menu.id}, '${menu.name}', ${menu.price})">Add to Order</button>
//             </div>
//        ` ).join('');
//     } catch (err) {
//         console.error('Error fetching menu:', err);
//     }



// }

// function selectMenu(id, name, price) {
//     if (!selectedMenu.some(item => item.id === id)) {
//         selectedMenu.push({ id, name, price });
//         const listItem = document.createElement('li');
//         listItem.textContent = `${name} - ₹${price}`;
//         selectedItems.appendChild(listItem);
//         totalPrice += price;
//         totalPriceElement.textContent = totalPrice;
//         proceedButton.disabled = false;
//     }


    
// }

// proceedButton.addEventListener('click', () => {
//     localStorage.setItem('selectedMenu', JSON.stringify(selectedMenu));
//     localStorage.setItem('totalPrice', totalPrice);
//     window.location.href = 'chef.html';
// });

// fetchMenu();

///////////////////////////////////////////////////////////////////

// const API_BASE_URL = 'http://localhost:3000';
// const menuContainer = document.getElementById('menu-card');
// const selectedItems = document.getElementById('selected-items');
// const totalPriceElement = document.getElementById('total-price');
// const proceedButton = document.getElementById('proceed-btn');

// let totalPrice = 0;
// let selectedMenu = [];

// async function fetchMenu() {
//     try {
//         const res = await fetch(`${API_BASE_URL}/api/menus`);
//         const menus = await res.json();
//         menuContainer.innerHTML = menus.map(menu => `
//             <div class="menu-item">
//                   <h3>${menu.name}</h3>
//                 <p>${menu.description}</p>
//                 <p>Price: ₹${menu.price}</p>
//                 <img src="http://localhost:3000${menu.image}" alt="${menu.name}">
            


//                 <button onclick="selectMenu(${menu.id}, '${menu.name}', ${menu.price})">Add to Order</button>
//             </div>
//         `).join('');
//     } catch (err) {
//         console.error('Error fetching menu:', err);
//     }



// }

// function selectMenu(id, name, price) {
//     if (!selectedMenu.some(item => item.id === id)) {
//         selectedMenu.push({ id, name, price });
//         const listItem = document.createElement('li');
//         listItem.textContent = `${name} - ₹${price}`;
//         selectedItems.appendChild(listItem);
//         totalPrice += price;
//         totalPriceElement.textContent = totalPrice;
//         proceedButton.disabled = false;
//     }


    
// }

// proceedButton.addEventListener('click', () => {
//     localStorage.setItem('selectedMenu', JSON.stringify(selectedMenu));
//     localStorage.setItem('totalPrice', totalPrice);
//     window.location.href = 'chef.html';
// });

// fetchMenu();

///////////////////////////////////////////////////////

// const menu_Container = document.getElementById("menu-container");

// // Fetch menu items from the backend
// fetch("http://localhost:3000/api/menu")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Failed to fetch menu items");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     menu_Container.innerHTML = data
//       .map(
//         (item) => `
//       <div class="menu-card">
//         <img src="${item.image_url}" alt="${item.name}" class="menu-image">
//         <div class="menu-info">
//           <h3>${item.name}</h3>
//           <p>${item.description}</p>
//           <p class="price">Price: $${item.price.toFixed(2)}</p>
//           <button class="add-btn">Add</button>
//         </div>
//       </div>
//     `
//       )
//       .join("");
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//     menuContainer.innerHTML = "<p>Error loading menu items. Please try again later.</p>";
//   });


//   ////////////////////////////////////////////////////////

//   const API_BASE_URL = 'http://localhost:3000';
// const menuContainer = document.getElementById('menu-container');
// const selectedItems = document.getElementById('selected-items');
// const totalPriceElement = document.getElementById('total-price');
// const proceedButton = document.getElementById('proceed-btn');

// let totalPrice = 0;
// let selectedMenu = [];

// async function fetchMenu() {
//     try {
//         const res = await fetch(`${API_BASE_URL}/api/menus`);
//         const menus = await res.json();
//         menuContainer.innerHTML = menus.map(menu => `
//             <div class="menu-item">

//                 <img src="http://localhost:3000${menu.image}" alt="${menu.name}">
//                 <h3>${menu.name}</h3>
//                 <p>${menu.description}</p>
//                 <p>Price: ₹${menu.price}</p>
//                 <button onclick="selectMenu(${menu.id}, '${menu.name}', ${menu.price})">Add to Order</button>
//             </div>
//         `).join('');
//     } catch (err) {
//         console.error('Error fetching menu:', err);
//     }
// }

// function selectMenu(id, name, price) {
//     if (!selectedMenu.some(item => item.id === id)) {
//         selectedMenu.push({ id, name, price });
//         const listItem = document.createElement('li');
//         listItem.textContent = `${name} - ₹${price}`;
//         selectedItems.appendChild(listItem);
//         totalPrice += price;
//         totalPriceElement.textContent = totalPrice;
//         proceedButton.disabled = false;
//     }
// }

// proceedButton.addEventListener('click', () => {
//     localStorage.setItem('selectedMenu', JSON.stringify(selectedMenu));
//     localStorage.setItem('totalPrice', totalPrice);
//     window.location.href = 'DemoChef.html';
// });

// fetchMenu();

// const API_BASE_URL = 'http://localhost:3000';
// const menuContainer = document.getElementById('menu-container');
// const selectedItems = document.getElementById('selected-items');
// const totalPriceElement = document.getElementById('total-price');
// const proceedButton = document.getElementById('proceed-btn');
// const searchBar = document.getElementById('search-bar'); // Reference to search bar

// let totalPrice = 0;
// let selectedMenu = [];
// let allMenus = []; // Store all menu items for search functionality

// async function fetchMenu() {
//     try {
//         const res = await fetch(`${API_BASE_URL}/api/menus`);
//         const menus = await res.json();
//         allMenus = menus; // Store menus for filtering
//         renderMenuItems(menus);
//     } catch (err) {
//         console.error('Error fetching menu:', err);
//     }
// }

// // Function to render menu items dynamically
// function renderMenuItems(menus) {
//     menuContainer.innerHTML = menus
//         .map(menu => `
//             <div class="menu-item">
//                 <img src="http://localhost:3000${menu.image}" alt="${menu.name}">
//                 <h3>${menu.name}</h3>
//                 <p>${menu.description}</p>
//                 <p>Price: ₹${menu.price}</p>
//                 <button onclick="selectMenu(${menu.id}, '${menu.name}', ${menu.price})">Add to Order</button>
//             </div>
//         `)
//         .join('');
// }

// function selectMenu(id, name, price) {
//     if (!selectedMenu.some(item => item.id === id)) {
//         selectedMenu.push({ id, name, price });
//         const listItem = document.createElement('li');
//         listItem.textContent = `${name} - ₹${price}`;
//         selectedItems.appendChild(listItem);
//         totalPrice += price;
//         totalPriceElement.textContent = totalPrice;
//         proceedButton.disabled = false;
//     }
// }

// // Function to search menu items
// function searchMenu(event) {
//     const query = event.target.value.toLowerCase();
//     const filteredMenus = allMenus.filter(menu =>
//         menu.name.toLowerCase().includes(query) ||
//         menu.description.toLowerCase().includes(query)
//     );
//     renderMenuItems(filteredMenus); // Re-render menu items based on search query
// }


// proceedButton.addEventListener('click', () => {
//     localStorage.setItem('selectedMenu', JSON.stringify(selectedMenu));
//     localStorage.setItem('totalPrice', totalPrice);
//     window.location.href = 'DemoChef.html';
// });

// fetchMenu();


// const API_BASE_URL = 'http://localhost:3000';
// const menuContainer = document.getElementById('menu-container');
// const selectedItems = document.getElementById('selected-items');
// const totalPriceElement = document.getElementById('total-price');
// const proceedButton = document.getElementById('proceed-btn');

// let totalPrice = 0;
// let selectedMenu = [];

// // Function to create a popup message
// function showPopupMessage(message) {
//     // Create a div element for the popup
//     const popup = document.createElement('div');
//     popup.className = 'popup-message';
//     popup.textContent = message;

//     // Append the popup to the body
//     document.body.appendChild(popup);

//     // Remove the popup after 3 seconds
//     setTimeout(() => {
//         popup.remove();
//     }, 3000);
// }

// async function fetchMenu() {
//     try {
//         const res = await fetch(`${API_BASE_URL}/api/menus`);
//         const menus = await res.json();
//         menuContainer.innerHTML = menus
//             .map(
//                 (menu) => `
//             <div class="menu-item">
//                 <img src="http://localhost:3000${menu.image}" alt="${menu.name}">
//                 <h3>${menu.name}</h3>
//                 <p>${menu.description}</p>
//                 <p>Price: ₹${menu.price}</p>
//                 <button onclick="selectMenu(${menu.id}, '${menu.name}', ${menu.price})">Add to Order</button>
//             </div>
//         `
//             )
//             .join('');
//     } catch (err) {
//         console.error('Error fetching menu:', err);
//     }
// }

// function selectMenu(id, name, price) {
//     if (!selectedMenu.some((item) => item.id === id)) {
//         selectedMenu.push({ id, name, price });

//         // Add to the selected items list
//         const listItem = document.createElement('li');
//         listItem.textContent = `${name} - ₹${price}`;
//         selectedItems.appendChild(listItem);

//         // Update total price
//         totalPrice += price;
//         totalPriceElement.textContent = totalPrice;

//         // Enable the proceed button
//         proceedButton.disabled = false;

//         // Show popup message
//         showPopupMessage(`${name} added to cart`);
//     }
// }

// ///////////////////////////////////////

// // Function to search menu items
// function searchMenu(event) {
//     const query = event.target.value.toLowerCase();
//     const filteredMenus = allMenus.filter(menu =>
//         menu.name.toLowerCase().includes(query) ||
//         menu.description.toLowerCase().includes(query)
//     );
//     renderMenuItems(filteredMenus); // Re-render menu items based on search query
// }

// ///////////////////////////////////////





// proceedButton.addEventListener('click', () => {
//     localStorage.setItem('selectedMenu', JSON.stringify(selectedMenu));
//     localStorage.setItem('totalPrice', totalPrice);
//     window.location.href = 'DemoChef.html';
// });

// fetchMenu();


const API_BASE_URL = window.location.origin;
const menuContainer = document.getElementById('menu-container');
const selectedItems = document.getElementById('selected-items');
const totalPriceElement = document.getElementById('total-price');
const proceedButton = document.getElementById('proceed-btn');
const searchBar = document.getElementById('search-bar'); // Reference to search bar

let totalPrice = 0;
let selectedMenu = [];
let allMenus = []; // Store all menu items for search functionality

// Fetch menu items from the API
async function fetchMenu() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/menus`);
        const menus = await res.json();
        allMenus = menus; // Store menus for filtering
        renderMenuItems(menus);
    } catch (err) {
        console.error('Error fetching menu:', err);
    }
}

// Render menu items dynamically
function renderMenuItems(menus) {
    menuContainer.innerHTML = menus
        .map(menu => `
            <div class="menu-item">
                <img src="${API_BASE_URL}${menu.image}"
                <h3>${menu.name}</h3>
                <p>${menu.description}</p>
                <p>Price: ₹${menu.price}</p>
                <button onclick="selectMenu(${menu.id}, '${menu.name}', ${menu.price})">Add to Order</button>
            </div>
        `)
        .join('');
}

// Add item to order
function selectMenu(id, name, price) {
    // Check if the item is already in the selected menu
    const existingItem = selectedMenu.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
        const listItem = document.getElementById(`item-${id}`);
        listItem.textContent = `${name} - ₹${price} x ${existingItem.quantity}`;
    } else {
        // Add new item to selected menu
        const newItem = { id, name, price, quantity: 1 };
        selectedMenu.push(newItem);

        const listItem = document.createElement('li');
        listItem.id = `item-${id}`; // Set a unique ID for the list item
        listItem.textContent = `${name} - ₹${price} x 1`;
        selectedItems.appendChild(listItem);
    }

    // Update total price
    totalPrice += price;
    totalPriceElement.textContent = totalPrice;

    // Enable proceed button
    proceedButton.disabled = false;

    // Show popup message
    showPopupMessage(`${name} added to cart`);
}

// Function to show a popup message
function showPopupMessage(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.textContent = message;

    document.body.appendChild(popup);

    // Remove popup after 3 seconds
    setTimeout(() => popup.remove(), 3000);
}

// Search menu items
function searchMenu(event) {
    const query = event.target.value.toLowerCase();
    const filteredMenus = allMenus.filter(menu =>
        menu.name.toLowerCase().includes(query) ||
        menu.description.toLowerCase().includes(query)
    );
    renderMenuItems(filteredMenus); // Re-render menu items based on search query
}

// Proceed to Chef Selection
proceedButton.addEventListener('click', () => {
    localStorage.setItem('selectedMenu', JSON.stringify(selectedMenu));
    localStorage.setItem('totalPrice', totalPrice);
    window.location.href = 'DemoChef.html';
});

// Fetch menu on page load
fetchMenu();
