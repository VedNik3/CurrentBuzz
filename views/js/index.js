
    const navLinks = document.querySelectorAll('#sidebar-nav .nav-link')
    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        
        navLinks.forEach(nav => {
          nav.style.backgroundColor = '';
          nav.style.color = '';
          
        });
        link.style.backgroundColor = '#0d6efd';
        link.style.color = 'white';
        
      });
      link.style.backgroundColor = '';
        link.style.color = '';
    });
  
    const navbarLinks = document.querySelectorAll('.nav-bar-link');

    

    
    navbarLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          
          navLinks.forEach(nav => {
              nav.style.backgroundColor = '';
              nav.style.color = '';
          });
      });
  });
    

  document.getElementById('topicsForm').addEventListener('submit', function(event) {
    const checkboxes = document.querySelectorAll('input[name="topic"]:checked');
    if (checkboxes.length === 0) {
      event.preventDefault();
      alert('Please select at least one topic.');
    }
  });

  document.querySelectorAll('.itemsdrop').forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      const selectedLanguage = event.target.getAttribute('data-lang');
      
      // Send the selected language to the server
      fetch('/save-language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ language: selectedLanguage })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error saving language:', error);
      });
    });
  });

