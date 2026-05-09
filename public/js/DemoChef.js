const API_BASE_URL = 'http://localhost:3000';
const chefContainer = document.getElementById('chef-container');
const proceedButton = document.getElementById('proceed-btn');
let selectedChef = null;

async function fetchChefs() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chefs`);
    const chefs = await res.json();

    chefContainer.innerHTML = chefs.map(chef => `
      <div class="chef-card">
        <img src="http://localhost:3000${chef.image}" alt="${chef.name}">
        <h3>${chef.name}</h3>
        <p>${chef.specialty}</p>
        
        <button onclick="selectChef(${chef.id}, '${chef.name}')">Select Chef</button>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error fetching chefs:', err);
  }
}

function selectChef(id, name) {
  selectedChef = { id, name};
  proceedButton.disabled = false;
  alert(`You selected ${name}`);
}



proceedButton.addEventListener('click', () => {
  if (selectedChef) {
    localStorage.setItem('selectedChef', JSON.stringify(selectedChef));
    alert(`Proceeding with Chef ${selectedChef.name}`);
    // if(aa==false){
    //   fetchChefs.preventDefault()
    // }
    // Navigate to the next page
    window.location.href = 'order-summary.html';
  }
});

fetchChefs();
