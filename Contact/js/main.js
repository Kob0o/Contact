/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
const add = document.getElementById('add-contact');
const deleteBtn = document.getElementById('delete-all');
const edit = document.getElementById('edit');
const editForm = document.getElementById('edit-form');
const contactsContainer = document.getElementById('contacts');
const modalContainer = document.getElementById('modal-container');
const closeButton = document.getElementById('close-button');
const closeEditFormButton = document.getElementById('close-edit-form');
let contacts = [];

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
function displayContacts() {
    contactsContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const contactElement = document.createElement('div');
        contactElement.classList.add('contact-item');
        contactElement.innerHTML = `
            <span>Civilité: ${contact.civilite}</span>
            <span>Nom: ${contact.firstname} ${contact.name}</span>
            <span>Téléphone: ${contact.phone}</span>
            <button class="edit-contact" data-index="${i}">Modifier</button>
            <button class="delete-contact" data-index="${i}">Supprimer</button>
        `;
        contactsContainer.appendChild(contactElement);
    }
}

function addContact(contact) {
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}

function deleteAllContacts() {
    contacts = [];
    localStorage.removeItem('contacts');
    displayContacts();
}



/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/


const storedContacts = localStorage.getItem('contacts');
if (storedContacts) {
    contacts = JSON.parse(storedContacts);
}

editForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const choixElement = document.getElementById('choix');
    const civilite = choixElement.options[choixElement.selectedIndex].value;
    const name = document.getElementById('name').value;
    const firstname = document.getElementById('firstname').value;
    const phone = document.getElementById('phone').value;

    const contact = {
        id,
        civilite,
        name,
        firstname,
        phone,
    };

    addContact(contact);
    editForm.reset();
    edit.style.display = 'none';
    isEditVisible = false;
});

deleteBtn.addEventListener('click', function () {
    deleteAllContacts();
});

// Modifier
contactsContainer.addEventListener('click', function (e) {
    const index = e.target.getAttribute('data-index');
    if (e.target.classList.contains('edit-contact')) {
        const contactToEdit = contacts[index];
        document.getElementById('id').value = contactToEdit.id;
        document.getElementById('choix').value = contactToEdit.civilite;
        document.getElementById('name').value = contactToEdit.name;
        document.getElementById('firstname').value = contactToEdit.firstname;
        document.getElementById('phone').value = contactToEdit.phone;
        editForm.setAttribute('data-index', index);
        edit.style.display = 'block';
        isEditVisible = true;
    }
});



//supprimer
contactsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-contact')) {
        const index = e.target.getAttribute('data-index');
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
    }
});

add.addEventListener('click', function () {
    edit.style.display = 'block';
    isEditVisible = true;
});

closeEditFormButton.addEventListener('click', function () {
    editForm.reset();
    edit.style.display = 'none';
    isEditVisible = false;
});


displayContacts();