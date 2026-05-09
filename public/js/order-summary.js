

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve data from localStorage
  const selectedMenu = JSON.parse(localStorage.getItem("selectedMenu")) || [];
  const selectedChef = JSON.parse(localStorage.getItem("selectedChef")) || {};

  // Get DOM elements
  const bookingTimeElement = document.getElementById("booking-time");
  const durationElement = document.getElementById("duration");
  const chefNameElement = document.getElementById("chef-name");
  const chefSpecialtyElement = document.getElementById("chef-specialty");
  const menuListElement = document.getElementById("menu-list");
  const totalPriceElement = document.getElementById("total-price");

  // Calculate booking time (current time + 35 minutes)
  const currentDate = new Date();
  const bookingTime = new Date(currentDate.getTime() + 35 * 60 * 1000);
  const formattedTime = `${bookingTime.toLocaleDateString()} ${bookingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  bookingTimeElement.textContent = formattedTime;

  // Calculate duration based on the number of selected menu items
  const durationMinutes = selectedMenu.reduce((total, item) => total + (item.quantity || 1) * 40, 0); // 40 minutes per dish
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const formattedDuration = `${hours > 0 ? hours + " Hour(s) " : ""}${minutes} Minute(s)`;
  durationElement.textContent = formattedDuration;

  // Display chef details
  chefNameElement.textContent = selectedChef.name || "Chef details not available";
  // chefSpecialtyElement.textContent = selectedChef.specialty || "Specialty information not available";

  // Display selected menu items and calculate total price
  let totalPrice = 0;
  selectedMenu.forEach(item => {
      const menuItem = document.createElement("li");
      menuItem.textContent = `${item.name} - ₹${item.price} x ${item.quantity || 1}`;
      menuListElement.appendChild(menuItem);
      totalPrice += item.price * (item.quantity || 1);
  });

  // Display total price
    totalPriceElement.textContent = totalPrice.toFixed(2);

    const bookingData = {
        user_id: 1, // temporary
        chef_id: selectedChef.id,
        booking_date: bookingTime.toISOString().split("T")[0],
        booking_time: bookingTime.toTimeString().split(" ")[0],
        total_amount: totalPrice
    };

    fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
        .then(res => res.json())
        .then(data => console.log("Booking saved:", data))
        .catch(err => console.error("Error:", err));
});
