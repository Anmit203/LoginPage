document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation
    let valid = true;
    if (!username){
        valid = false;
        document.getElementById('usernameError').textContent ='Username/Email is required';
        document.getElementById('usernameError').style.display ='block';
    }else if(!validateEmail(username)){
        valid = false;
        document.getElementById('usernameError').textContent ='Please enter a valid email';
        document.getElementById('usernameError').style.display ='block';
    }else{
        document.getElementById('usernameError').style.display ='none';
    }

    if(!password){
        valid = false;
        document.getElementById('passwordError').textContent ='Password is required';
        document.getElementById('passwordError').style.display ='block';
    }else if(password.length<6){
        valid = false;
        document.getElementById('passwordError').textContent ='Password must be at least 6 characters long';
        document.getElementById('passwordError').style.display ='block';
    }else{
        document.getElementById('passwordError').style.display ='none';
    }

    if(valid){
        // Prepare API request
        const loginData={
            username:username,
            password:password
        };

        fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loginData)
        })
        .then(response =>{
            if(response.ok){
                // Redirect to another page on successful login
                window.location.href ='content.html'; // Replace with your target page
            }else{
                throw new Error('Login failed');
            }
        })
        .catch(error=>{
            document.getElementById('loginResponse').textContent ='Login failed. Please try again.';
            document.getElementById('loginResponse').style.color ='red';
        });
    }
});

// Function to validate email format
function validateEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
