import './Quiz.scss';
import React, {useRef, useState} from "react";
import {data} from "../../assets/data.ts";

const Quiz = () => {
    const [index, setIndex] = useState<number>(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [result, setResult] = useState<boolean>(false)

    const answer1 = useRef<HTMLLIElement>(null);
    const answer2 = useRef<HTMLLIElement>(null);
    const answer3 = useRef<HTMLLIElement>(null);
    const answer4 = useRef<HTMLLIElement>(null);

    const answerArray = [answer1, answer2, answer3, answer4];

    const checkAnswer = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, answer: number) => {
        if (!lock) {
            if (question.correct === answer) {
                (event.target as HTMLElement).classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1)
            } else {
                (event.target as HTMLElement).classList.add("wrong");
                setLock(true);
                answerArray[question.correct - 1].current?.classList.add("correct");
            }
        }
    }

    const handleNextQuestion = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(prev => prev + 1);
            setLock(false);
            answerArray.map(e => {
                e.current?.classList.remove("wrong");
                e.current?.classList.remove("correct");
            })
            setQuestion(data[index + 1]);
        }
    }

    return (
        <div className={'container'}>
            <h1>Тестування (ROBO, Arduino Kids)</h1>
            <hr/>
            {result ?
                <>
                    <p>Кількість правильних віподвідей: {score}</p>
                    <p>Процент правильних відповідей: {Math.round((data.length - score)/(data.length) * 100)}%</p>
                </>
                :
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    {question.img &&
                        <img
                            src={question.img}
                            alt={question.question}
                            className={'img'}
                        />
                    }
                    <ul className={'list'}>
                        <li
                            ref={answer1}
                            onClick={(e) => checkAnswer(e, 1)}
                            className={'item'}
                        >
                            {question.answers1}
                        </li>
                        <li
                            ref={answer2}
                            onClick={(e) => checkAnswer(e, 2)}
                            className={'item'}
                        >
                            {question.answers2}
                        </li>
                        <li
                            ref={answer3}
                            onClick={(e) => checkAnswer(e, 3)}
                            className={'item'}
                        >
                            {question.answers3}
                        </li>
                        <li
                            ref={answer4}
                            onClick={(e) => checkAnswer(e, 4)}
                            className={'item'}
                        >
                            {question.answers4}
                        </li>
                    </ul>

                    <div className={'btnCnt'}>
                        <div className={'btn'} onClick={handleNextQuestion}>Next</div>
                    </div>
                    <div className={'index'}>{index + 1} из {data.length}</div>
                </>
            }
        </div>
    );
};

export default Quiz;
