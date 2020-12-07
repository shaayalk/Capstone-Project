// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
            db.collection('questions').onSnapshot(snapshot => {
                setupQuestions(snapshot.docs);
                setupUI(user);
            })
    } else {
        setupUI();
        setupQuestions([])
    }
});


// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});

// DOM elements
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        // toggle user UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // toggle user elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};

// setup guides
const setupQuestions = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
        <li>
           ${guide.name + ' | '} 
           ${guide.dateofInterview + ' | '} 
           ${guide.subject + ' | '} 
           ${guide.company + ' | '}
           ${guide.question}
        </li>
      `;
            html += li;
        });
        questionList.innerHTML = html
    } else {
        questionList.innerHTML = '<h5 class="center-align">Login to view and add Questions</h5>';
    }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
})