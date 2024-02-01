const  questions = [
    {
        question:"What is full form of SQL ?",
        answer:[
            {text:"Structured Query Long" , correct:false},
            {text:"Structured Quiz Language" , correct:false},
            {text:"Straight Query Language" , correct:false},
            {text:"Structured Query Language" , correct:true},
        ]
    },
    {
        question :"What is the purpose of an operating system in a computer?",
        answer:[
            {text:"To store user files" ,correct:"false"},
            {text:"To manage hardware resources and provide services to applications" ,correct:"true"},
            {text:"To connect to the internet" ,correct:"false"},
            {text:" To design graphical user interfaces" ,correct:"false"}
           
        ]
    },
    {
        question:"Which programming language is commonly used for web development?",
        answer:[
            {text:"JAVA" ,correct:"false"},
            {text:"HTML" ,correct:"true"},
            {text:"PYTHON" ,correct:"false"},
            {text:"SWIFT" ,correct:"false"}
        ]
    },
    {
        question:"What does the acronym 'URL' stand for in the context of the internet?",
        answer:[
            {text:"Uniform Resource Locator",correct:"true"},
            {text:"Universal Reference Language",correct:"false"},
            {text:"Unified Resource Link",correct:"false"},
            {text:"User-Reliable Locator",correct:"false"}
        ]
    }
];
const queElement = document.getElementById("que");
const ansElement = document.getElementById("ans-button");
const nextButton= document.getElementById("next-btn");

let currentqueindex = 0;
let score = 0;

function startquiz(){
    currentqueindex = 0;
    score=0;
    nextButton.innerHTML= "Next";
    showQuestion();

}
function showQuestion(){
    resetState();
    let currentQuestions = questions[currentqueindex];
    let questionNO = currentqueindex + 1;
    queElement.innerHTML = questionNO+"."+currentQuestions.question;

    currentQuestions.answer.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct =answer.correct;
        }
        button.addEventListener("click",selectAnswer)
        
    });
}


function resetState(){
    nextButton.style.display="none";
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild)
    }
}


function  selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct =="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansElement.children).forEach(button =>{
        if(button.dataset.correct =="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showscore(){
    resetState();
    queElement.innerHTML =`you scored ${score} out of ${questions.length} !`
    nextButton.innerHTML ="play Again"
    nextButton.style.display ="block"
}
function handleNextButton(){
    currentqueindex++;
    if(currentqueindex<questions.length){
        showQuestion()
    }
    else{
        showscore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentqueindex<questions.length){
        handleNextButton()
    }
    else{
        startquiz();
    }
})
startquiz();