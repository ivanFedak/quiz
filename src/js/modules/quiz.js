const quiz = ()=>{
    
    const home = document.querySelector('.home'),
          quiz = document.querySelector('.quiz'),
          modal = document.querySelector('.modal');
    


    const option1 = document.querySelector('.quiz__item_1'),
          option2 = document.querySelector('.quiz__item_2'),
          option3 = document.querySelector('.quiz__item_3'),
          option4 = document.querySelector('.quiz__item_4');
    
    const optionAll = document.querySelectorAll('.quiz__item'), //all question
          question = document.querySelector('.quiz__question'), //?? Question by itself
          currentNumber = document.querySelector('.quiz__current'), //in what quest we're now
          numberOfAllQustions = document.querySelector('.quiz__all'); //number of all question
    
    const answersTracker = document.querySelector('.quiz__indicator'); //Circle
    const btnNext = document.querySelector('.quiz__btn'); //Next btn
    
    const correctAnswer = document.querySelector('.modal__correct'), //in modal all correct ans
          globalNumber = document.querySelector('.modal__number'), //how many question was in quiz
          btnTry = document.querySelector('.modal__btn'); //
    
    let indexOfQuestion = 0, //in what question we are now
        indexOfPage = 0, //in what page we're now
        score = 0; // Result of quiz
        
    const questionArr = [
        {
            question: 'Как в Js вычилсть процент от числа?',
            options: [
                'Так в JS нельзя',
                'Так в JS можно',
                'Я не знаю',
                'Пока'
            ],
            rightAnswer: 1
        },
        {
            question: 'Как в Js создать Function',
            options: [
                'Create Func',
                'Я не знаю',
                'function(e){}',
                'Пока'
            ],
            rightAnswer: 2
        },
        {
            question: 'Как в Js создать перемую',
            options: [
                'let',
                'var',
                'const',
                'Все варианты правильны'
            ],
            rightAnswer: 3
        },
    ]    

//////////////////////////////////////////////////////////

    numberOfAllQustions.innerHTML = questionArr.length; //Номер всех вопроса

    const load = (e)=>{
        if(indexOfPage  != questionArr.length){ 

            option1.textContent = questionArr[indexOfQuestion].options[0];//Answers
            option2.textContent = questionArr[indexOfQuestion].options[1];//
            option3.textContent = questionArr[indexOfQuestion].options[2];//
            option4.textContent = questionArr[indexOfQuestion].options[3];//Answers
        
            question.textContent = questionArr[indexOfQuestion].question;
            currentNumber.textContent = indexOfPage + 1;
            indexOfPage++;  

        }else{// Значить iгра закiнчилася ("Question 5 0f 5")
            endQuiz();
        }

    }

    load();



    const checkAnswers = (e)=>{  
        const target = e.target
        if(target.dataset.id == questionArr[indexOfQuestion].rightAnswer){
            score++;
            target.classList.add('quiz__item_correct');
        }else{
            target.classList.add('quiz__item_wrong');
        }

        disabled();
    }


    const disabled = (e)=>{//Can't click anymore
        optionAll.forEach(item=>{
            item.classList.add('quiz__item_disable')
        })
    }

    const enable = (e)=>{//Delete all classes
        optionAll.forEach(item=>{
            item.classList.remove('quiz__item_correct', 'quiz__item_wrong', 'quiz__item_disable')
        })
    }


    const valid = (e)=>{ //If click on something and go to the next questin(if click was)
        if(!optionAll[0].classList.contains('quiz__item_disable')){
            alert('Выберите!!!')
        }else{
            load();
            enable();
            console.log(score)
        }
    }

    optionAll.forEach(item=>{//For answer
        item.addEventListener('click',function(e){ 
            checkAnswers(e);
        })
        
    })


    const endQuiz = (e)=>{ //modal show in the end
        correctAnswer.textContent = score;
        globalNumber.textContent = questionArr.length;
        modal.classList.remove('hide');
    }


    btnNext.addEventListener('click',function(e){
        indexOfQuestion++;
        valid();
    })
    
    
    



}
export default quiz;