const API_URL = 'https://6889aed84c55d5c7395318b4.mockapi.io/users'; // Mock API manzilingiz bilan almashtiring

// Kontaktlarni olish va ko'rsatish (GET)
async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        const contacts = await response.json();
        const contactList = document.getElementById('contactList');
        contactList.innerHTML = '';

        contacts.forEach(contact => {
            const contactDiv = document.createElement('div');
            contactDiv.className = 'contact-item';
            contactDiv.innerHTML = `
                <div>
                    <strong>${contact.name}</strong><br>
                    Raqam: ${contact.number}
                </div>
                <button class="delete-btn" data-id="${contact.id}"><i class="fa-solid fa-trash"></i></button>
                <button class="edit-btn" data-id="${contact.id}"><i class="fa-solid fa-edit"></i></button>
            `;
            contactList.appendChild(contactDiv);
        });

        // Delete tugmalariga hodisa tinglovchisi qo'shish
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const contactId = e.target.getAttribute('data-id');
                await deleteContact(contactId);
            });
        });

        // Edit tugmalariga hodisa tinglovchisi qo'shish
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const contactId = e.target.getAttribute('data-id');
                editContact(contactId);
            });
        });
    } catch (error) {
        console.error('Kontaktlarni olishda xato:', error);
    }
}

// Kontaktni o'chirish (DELETE)
async function deleteContact(contactId) {
    try {
        const response = await fetch(`${API_URL}/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            console.log('Kontakt muvaffaqiyatli o\'chirildi');
            fetchContacts(); // Ro'yxatni yangilash
        } else {
            console.log('Kontaktni o\'chirishda xato');
        }
    } catch (error) {
        console.error('Kontaktni o\'chirishda xato:', error);
    }
}

// Kontaktni tahrirlash uchun funksiya (soddalashtirilgan)
function editContact(contactId) {
    console.log(`Tahrirlash uchun ID: ${contactId}. To'liq tahrirlash uchun forma qo'shish kerak.`);
    // To'liq tahrirlash uchun keyingi bosqichda forma va PUT so'rovi qo'shilishi mumkin
}

// Forma yuborilganda (POST)
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                number
            })
        });

        if (response.ok) {
            console.log('Kontakt muvaffaqiyatli qo\'shildi');
            document.getElementById('contactForm').reset();
            fetchContacts(); // Kontaktlar ro'yxatini yangilash
        } else {
            console.log('Kontakt qo\'shishda xato');
        }
    } catch (error) {
        console.error('Kontakt qo\'shishda xato:', error);
    }
});

// Sahifa yuklanganda kontaktlarni olish
fetchContacts();