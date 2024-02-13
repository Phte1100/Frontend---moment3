"use strict";

const url = "https://studenter.miun.se/~mallar/dt211g/";
let course;
let program;
window.onload = init;

async function init() {
    try {

    // fetchanrop
    const response = await fetch(url);
    course = await response.json();
    program = await response.json();

    displayCourse(course)
    displayProgram(program)

} catch {
    // catch om något går fel
    document.getElementById("error").innerHTML = "<p>Något gick fel!</p>";
}


function displayCourse(data) {
    const courses = data.filter(item => item.type === "Kurs");
    const sortedCourses = courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    const topCourses = sortedCourses.slice(0, 6);
    const courseNames = topCourses.map(course => course.name);
    const applicantsTotal = topCourses.map(course => course.applicantsTotal);
    createChart(courseNames, applicantsTotal);
}

function displayProgram(data) {
    const programs = data.filter(item => item.type === "Program");
    const sortedProgram = Programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    const topPrograms = sortedPrograms.slice(0, 5);
    const programNames = topPrograms.map(program => program.name);
    const applicantsTotal = topPrograms.map(program => program.applicantsTotal);
    createPieChart(programNames, applicantsTotal);
}
}

function createChart(labels, data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Totalt antal sökande',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    
}
