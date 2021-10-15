const load = ()=>{


    question.innerHTML = questionArr[indexOfQuestion].question //Caм вопрос


    option1.innerHTML = questionArr[indexOfQuestion].options[0]
    option2.innerHTML = questionArr[indexOfQuestion].options[1]
    option3.innerHTML = questionArr[indexOfQuestion].options[2]
    option4.innerHTML = questionArr[indexOfQuestion].options[3] 

    currentNumber.innerHTML = indexOfPage + 1 //Номер текущего вопроса

    indexOfPage++ //Увеличение индекса страницы
}

let completedAnswers = []; //Вопроси якi уже були заданi

const randomQuestion = ()=>{
    let randomNumber =  Math.floor( Math.random() * questionArr.length);
    let hitDuplicate = false; //Якшо буде повторение то буде 'true'

    if(indexOfPage  == questionArr.length){ // Значить iгра закiнчилася ("Question 5 0f 5")

    }else{ //Якшо не кониць
        if(completedAnswers.length > 0){//Якшо незаданий вопрос попав у сись масив то:
            completedAnswers.forEach(item=>{
                if(item == randomQuestion) {//Якшо якоесь значение совпадае
                    hitDuplicate- true
                }
            });
            if(hitDuplicate){ //якшо оно true тоесть там э екиись вопрос шо уже бов
                randomQuestion()//Ми запускаемо функцию уби найшлося якесь друге число
            }else{ //Якшо число такое шо ще не було
                indexOfQuestion = randomNumber;
                load(); 
            }
        };
        if(completedAnswers == 0){ //Якшо нич не попало
            indexOfQuestion = randomNumber;
            load(); 
        }   
    };

    completedAnswers.push(indexOfQuestion);


}


const checkAnswer=(e)=>{

    const target = e.target;

    if(target.dataset.id == questionArr[indexOfQuestion].rightAnswer){
        target.classList.add('quiz__item_correct');
        updateAnswerTracker('quiz__item_correct');
        score++;
    }else{
        updateAnswerTracker('quiz__item_wrong');
        target.classList.add('quiz__item_wrong');
    }

    disabledOptions();
}

const disabledOptions = ()=>{
    optionAll.forEach(item => {
        item.classList.add('quiz__item_disable')
        if(item.dataset.id == questionArr[indexOfQuestion].rightAnswer){
            item.classList.add('quiz__item_correct');
        }
    })
}

const enableOptions = ()=>{
    optionAll.forEach(item=>{
        item.classList.remove('quiz__item_correct', 'quiz__item_disable', 'quiz__item_wrong' )
    })
}

const answerTracker = ()=>{
    questionArr.forEach(()=>{
        const div = document.createElement('div');
        answersTracker.appendChild(div)
    })
}

const updateAnswerTracker  = status =>{
    console.log(answersTracker.children)
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

const validate = (e)=>{
    if (!optionAll[0].classList.contains('quiz__item_disable') ) {
        alert('Good bye')
    }else{
        randomQuestion();
        enableOptions();
    }

}

btnNext.addEventListener('click',validate)


optionAll.forEach(item => {
    item.addEventListener('click',function(e){
        checkAnswer(e);
    })
    
});






randomQuestion();
answerTracker();


