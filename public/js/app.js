const reviews = [
    {
        id: 0,
        name: "Sara Jones",
        img: "https://res.cloudinary.com/dfthtqgr6/image/upload/v1610158232/myPhotos/person1_umqos1.jpg",
        job: "ux designer",
        text: "User experience is a person's emotions and attitudes about using a particular product, system or service. It includes the practical, experiential, affective, meaningful, and valuable aspects of human–computer interaction and product ownership."
    },
    {
        id: 1,
        name: "Miguel Jones",
        img: "https://res.cloudinary.com/dfthtqgr6/image/upload/v1610158222/myPhotos/person4_itqfws.jpg",
        job: "senior developer",
        text: "Also known as a Software Engineer, a Senior Developer performs various development duties, such as coding and web development. Senior Developers may specialize in a specific area, oversee projects, and manage junior developers."
    },
    {
        id: 2,
        name: "Avril Johnson",
        img: "https://res.cloudinary.com/dfthtqgr6/image/upload/v1610158218/myPhotos/person6_tu1bfx.jpg",
        job: "qa automation",
        text: "QA automation refers to using a separate piece of software to run tests on the software that you're developing. In the past, human testers would have to perform many of these tasks themselves, with the aid of some technology to reduce repetition."
    },
    {
        id: 3,
        name: "Kurt Lavigne",
        img: "https://res.cloudinary.com/dfthtqgr6/image/upload/v1610158214/myPhotos/person2_jpcis1.jpg",
        job: "test automation",
        text: "In software testing, test automation is the use of software separate from the software being tested to control the execution of tests and the comparison of actual outcomes with predicted outcomes. ... Test automation is critical for continuous delivery and continuous testing."
    },
    {
        id: 4,
        name: "whoever else",
        img: "https://res.cloudinary.com/dfthtqgr6/image/upload/v1610158210/myPhotos/person5_psj8zd.jpg",
        job: "Full-stack .NET Developer",
        text: "A Full-stack .NET Developer is an expert who can build and manage all the stacks of an application meaning Front-end, Back-end, database, version control, server and APIs. This learning path focus on C#, SQL Server, ASP.NET MVC, Web API, Entity Framework Code First, Bootstrap and HTML5 which are required to build a real-world application with .NET."
    },
    {
        id: 5,
        name: "A dude here",
        img: "https://res.cloudinary.com/dfthtqgr6/image/upload/v1610158210/myPhotos/person7_kuv7dg.jpg",
        job: "Full-stack JavaScript developer",
        text: "A full stack JavaScript developer is a person who can develop both client and server software. In addition to mastering HTML and CSS, he/she also knows how to: Program a browser (like using JavaScript, jQuery, Angular, or Vue) Program a server (like using Node."
    }
];

const img = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const info = document.getElementById('info');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const randomBtn = document.querySelector('.random-btn');

let currentItem = 0;

window.addEventListener("DOMContentLoaded", function () {
    showPerson();
});

function showPerson() {
    const item = reviews[currentItem];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

prevBtn.addEventListener('click', function () {
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length -1;
    }
    showPerson();
});

nextBtn.addEventListener('click', function () {
    currentItem++;
    if (currentItem > reviews.length - 1) {
        currentItem = 0;
    }
    showPerson();
});

randomBtn.addEventListener('click', function () {
    currentItem = Math.floor(Math.random() * reviews.length);
    showPerson();
});
