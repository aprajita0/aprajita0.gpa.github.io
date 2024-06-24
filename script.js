const table = document.querySelector('#table');
const tbody = document.querySelector('#table-body');
const tfoot = document.querySelector('#table-foot');
const calculateGpa = document.querySelector('#calculate-gpa');
const reset = document.querySelector('#reset');
let gpaArray = [];

// Function to add a default row
function addDefaultRow() {
    const tr = document.createElement('tr');
    
    // Checkbox cell
    const tdCheckbox = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true; // Initially checked
    tdCheckbox.appendChild(checkbox);
    
    // Course Name cell with editable input
    const tdcourseCode = document.createElement('td');
    const courseName = `Course #${tbody.children.length + 1}`;
    const courseInput = document.createElement('input');
    courseInput.type = 'text';
    courseInput.value = courseName;
    courseInput.placeholder = 'Course Name';
    tdcourseCode.appendChild(courseInput);

    // Credits cell with editable input
    const tdcredits = document.createElement('td');
    const creditsInput = document.createElement('input');
    creditsInput.type = 'number';
    creditsInput.placeholder = 'Credits';
    tdcredits.appendChild(creditsInput);
    
    // Grade cell with editable select dropdown
    const tdgrade = document.createElement('td');
    const gradeSelect = document.createElement('select');
    gradeSelect.innerHTML = `
        <option value="">Grade</option>
        <option value="4.0">A</option>
        <option value="3.5">B+</option>
        <option value="3.0">B</option>
        <option value="2.5">C+</option>
        <option value="2.0">C</option>
        <option value="1.0">D</option>
        <option value="0.0">F</option>
    `;
    tdgrade.appendChild(gradeSelect);
    
    // Delete button cell
    const tddelete = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'x';
    deleteBtn.classList.add('delete-btn');
    tddelete.appendChild(deleteBtn);
    
    // Append cells to row
    tr.appendChild(tdCheckbox);
    tr.appendChild(tdcourseCode);
    tr.appendChild(tdcredits);
    tr.appendChild(tdgrade);
    tr.appendChild(tddelete);
    
    // Append row to tbody
    tbody.appendChild(tr);
    
    // Event listener for delete button
    deleteBtn.addEventListener('click', () => {
        const index = Array.from(tbody.children).indexOf(tr);
        tbody.removeChild(tr);
        gpaArray.splice(index, 1); // Remove the correct entry from gpaArray
        calculateGPA(); // Recalculate GPA after row deletion
    });
    
    // Event listener for course name input
    courseInput.addEventListener('input', () => {
        const index = Array.from(tbody.children).indexOf(tr);
        gpaArray[index].courseName = courseInput.value;
    });
    
    // Event listener for credits input
    creditsInput.addEventListener('input', () => {
        const index = Array.from(tbody.children).indexOf(tr);
        gpaArray[index].credits = parseFloat(creditsInput.value);
    });
    
    // Event listener for grade select
    gradeSelect.addEventListener('change', () => {
        const index = Array.from(tbody.children).indexOf(tr);
        gpaArray[index].grade = parseFloat(gradeSelect.value);
    });
    
    // Event listener for checkbox
    checkbox.addEventListener('change', () => {
        const index = Array.from(tbody.children).indexOf(tr);
        gpaArray[index].checked = checkbox.checked;
        calculateGPA();
    });
    
    // Add to gpaArray
    gpaArray.push({
        courseName: '',
        credits: 0,
        grade: 0,
        checked: true
    });
}

// Add 3 default rows initially
for (let i = 0; i < 3; i++) {
    addDefaultRow();
}

// Event listener for Add Row button
document.querySelector('#add').addEventListener('click', addDefaultRow);

// Function to calculate GPA
function calculateGPA() {
    let totalCredits = 0, totalPoints = 0;
    gpaArray.forEach(result => {
        if (result.checked) {
            totalCredits += result.credits;
            totalPoints += result.credits * result.grade;
        }
    });

    const tr = document.createElement('tr');
    const tdGpa = document.createElement('td');
    tdGpa.colSpan = 5; // Spanning across all columns
    if (totalCredits > 0) {
        tdGpa.innerHTML = `Your GPA is ${(totalPoints / totalCredits).toFixed(2)}`;
    } else {
        tdGpa.innerHTML = `Add grades and credits to calculate GPA`;
    }

    tr.appendChild(tdGpa);
    tfoot.innerHTML = '';
    tfoot.appendChild(tr);
}

calculateGpa.addEventListener('click', calculateGPA);

reset.addEventListener('click', () => {
    tbody.innerHTML = '';
    tfoot.innerHTML = '';
    gpaArray = [];
    for (let i = 0; i < 3; i++) {
        addDefaultRow();
    }
});



















