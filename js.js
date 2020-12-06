const questionList = document.querySelector('#question-list');
const form = document.querySelector('#create-form');

// create element & render questions
function renderQuestions(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let dateofInterview = document.createElement('span');
    let subject = document.createElement('span');
    let company = document.createElement('span');
    let question = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    dateofInterview.textContent = doc.data().dateofInterview;
    subject.textContent = doc.data().subject;
    company.textContent = doc.data().company;
    question.textContent = doc.data().question;

    li.appendChild(name);
    li.appendChild(dateofInterview);
    li.appendChild(subject);
    li.appendChild(company);
    li.appendChild(question);

    questionList.appendChild(li);
}

// getting data
db.collection('questions').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderQuestions(doc);
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('questions').add({
        name: form.name.value,
        dateofInterview: form.dateofInterview.value,
        subject: form.subject.value,
        company: form.company.value,
        question: form.question.value
    }).then(() => {
        const modal = document.querySelector('#modal-question');
        M.Modal.getInstance(modal).close();
    });
});

function message() {
    let name = document.querySelector('#name').value;
    let msg = "Thanks for submitting your question " + name;
    alert(msg);
}