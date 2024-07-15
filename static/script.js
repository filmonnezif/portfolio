function showContent(contentId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(contentId).classList.add('active');
    event.target.classList.add('active');
    
    document.querySelector(`#${contentId}`).scrollIntoView({
        behavior: 'smooth'
    });
}
// Advanced Spark effect
function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    document.body.appendChild(spark);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const duration = Math.random() * 0.3 + 0.2;

    spark.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'ease-out'
    }).onfinish = () => spark.remove();
}

function createSparkCluster(x, y) {
    for (let i = 0; i < 20; i++) {
        createSpark(x, y);
    }
}

function handleInteraction(event) {
    const x = event.clientX || (event.touches && event.touches[0].clientX);
    const y = event.clientY || (event.touches && event.touches[0].clientY);
    createSparkCluster(x, y);
}

const imageSection = document.getElementById('image');
imageSection.addEventListener('mousedown', handleInteraction);
imageSection.addEventListener('touchstart', handleInteraction, { passive: true });


const text = "Currently, I'm an Electrical Engineering student at the Higher\
                Colleges of Technology SJM. I'm a huge fan of computers, electronics, coding.\
                I'm particularly interested in using my skills to develop practical \
                solutions for real-world problems.  Whether it's experimenting with microcontrollers \
                and creating IoT solutions, or building fun apps and websites like this one.\
                Dive into my project portfolio below and see how I'm utilizing my skills."
let i = 0;
const speed = 50; // Typing speed in milliseconds
const header = "Hi, this is me, Filmon Nezif.";
let j = 0;

function typeWriter() {
    if (j < header.length) {
        document.getElementById("greatings").innerHTML += header.charAt(j);
        j++;
        setTimeout(typeWriter, 100);
    } else if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

document.addEventListener('DOMContentLoaded', typeWriter);


//fade in image
const aboutMeImage = document.getElementById('aboutmepic-img');

setTimeout(() => {
  aboutMeImage.classList.add('fade-in');
}, 1000);

// Function to show/hide project details
function showProjectDetails(projectId) {
    const projectDetails = document.querySelectorAll('.details-img');
    projectDetails.forEach(detail => detail.style.display = 'none');

    const selectedDetails = document.getElementById(`${projectId}-details`);
    selectedDetails.style.display = 'block';
  
    const projectTabs = document.querySelectorAll('.project-tab-button');
    projectTabs.forEach(tab => tab.classList.remove('active'));
  
    const selectedButton = document.querySelector(`[onclick*="${projectId}"]`);
    selectedButton.classList.add('active');
  }
  
  const initialProject = 'rafek'; 
  showProjectDetails(initialProject);

  function submit_message() {
                        
    event.preventDefault();

    // Get form values
    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    console.log(name, message);

    // Prepare data object
    var data = {
        name: name,
        message: message
    };

    // Send POST request using Fetch API
    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        
        console.log('Message sent successfully!');
        document.getElementById("ifsent").style.display = "block";
        document.getElementById("myForm").reset();

        setTimeout(() => {
            document.getElementById("ifsent").style.display = "none";
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);  // Handle network or other errors
    });

    // Return false to prevent default form submission again (optional)
    return false;
}
function change(buttonId) {
    const button = document.getElementById(buttonId);
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const levelElement = document.getElementById('level');
    const levelText = levelElement.innerText;
    const level = parseInt(levelText.split(':')[1].trim());
    const btnstate = button.textContent;
    if ((btnstate === '1') || (btnstate === '?')) {
        button.textContent = '0';
    } else {
        button.textContent = '1';
    }
    if (level > 3) {
        if (btn1.textContent !== '?' && btn2.textContent !== '?' && btn3.textContent !== '?') {
        check(btn1, btn2, btn3, level);}
    } else {
        if (btn1.textContent !== '?' && btn3.textContent !== '?') {
            check(btn1, btn2, btn3, level);
        
    }}

}
function check(btn1, btn2,btn3,level) {
    const imageElement = document.querySelector('.gates img');
    const bulb = document.querySelector('.bulb img');
    console.log(btn1.textContent,btn2.textContent,btn3.textContent,level);
    var data = {
        btn1: btn1.textContent,
        btn2: btn2.textContent,
        btn3: btn3.textContent,
        level:level
    };
    fetch('/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data
        if (data.status === 'on') {
            bulb.src = 'static/on.svg';
            
        } else if (data.status === 'off') {
            bulb.src = 'static/off.svg';
        }
    })
    .catch(error => {
        console.error('Error:', error);  // Handle network or other errors
    });

    
}
function next(){
    const imageElement = document.querySelector('.gates img');
    const bulb = document.querySelector('.bulb img');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const levelElement = document.getElementById('level');
    const levelText = levelElement.innerText;
    let level = parseInt(levelText.split(':')[1].trim());
    console.log(bulb.src)
    if (bulb.src.includes('on.svg')) {
        level += 1;
        levelElement.innerText = `Score: ${level}`;
        btn1.textContent = '?';
        btn2.textContent = '?';
        btn3.textContent = '?';
        imageElement.src = `static/image${level+1}.svg`;
        bulb.src = 'static/off.svg';
    }else{
        alert('You need to turn on the bulb to proceed to the next level');
    }
        
    if (level > 3) {
        btn2.style.visibility = 'visible'; 
        }
    if (level > 6) {
        btn2.style.visibility = 'hidden';
        levelElement.innerText = `Score: 0`;
        imageElement.src = `static/image1.svg`; 
        }
}