const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#profile-name').value.trim();
  const needed_funding = document.querySelector('#profile-funding').value.trim();
  const description = document.querySelector('#profile-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/profile`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/profile/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

// document
//   .querySelector('.new-profile-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.profile-list')
//   .addEventListener('click', delButtonHandler);
