const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#userRoutes-name').value.trim();
  const needed_funding = document.querySelector('#userRoutes-funding').value.trim();
  const description = document.querySelector('#userRoutes-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/userRoutes`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/userRoutes');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/userRoutes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok)  {
      document.location.replace('/userRoutes');
    } else {
      console.log (response);
      console.log ('Failed to delete project');
    }
  }
};

// document
//   .querySelector('.new-userRoutes-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.userRoutes-list')
//   .addEventListener('click', delButtonHandler);
