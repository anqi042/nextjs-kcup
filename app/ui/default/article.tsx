'use client';
import {ChangeEvent, useState} from 'react';
import { useEffect } from 'react';


export type ArticleData = {
    _id: string;
    level: number,
    title: string;
    content: string;
    question: string;
    answers: string[];
    correctAnsIdx: number,
}

const FilterDataCallback = (list: ArticleData[], filterLevel: number, changObj?: (obj: ArticleData) => void) => {
    const data = list.filter((item) => {
        // range -50 +50
        return item.level >= filterLevel - 50 && item.level <= filterLevel + 50;
    })[0];
    if (data && changObj) {
        changObj(data);
        console.log(`change to ${data.level}`)
    }
    return data
}
let globalCacheList: ArticleData[] = []
function Article({list, filterLevel}: { list: ArticleData[] , filterLevel: number}) {
    globalCacheList = list;


    const data = FilterDataCallback(list, filterLevel);
    const [articleObj, setArticleObj] = useState<ArticleData>(data);
    const cloned = {...articleObj};
    const {title, content, question, answers, correctAnsIdx, level} = cloned;


    return (
        <>
            <div
                className="bg-white rounded-lg shadow-md p-4 md:p-6 m-4 md:m-8 flex flex-col items-center justify-center w-full">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-700 mt-2">{content}</p>
            </div>
            <div>
                <RadioGroup answers={answers} question={question}
                            correctIdx={correctAnsIdx}  level={level}
                            setArticleObj={setArticleObj}
                />
            </div>
        </>
    );
}


const RadioGroup = ({question, answers, correctIdx, level, setArticleObj}: {
    question: string,
    answers: string[],
    correctIdx: number,
    level: number,
    setArticleObj?: (obj: ArticleData) => void,
}) => {
    const [selectedOption, setSelectedOption] = useState('');
    let level1 = level
    const [nextLevel, setLevelState] = useState(level1);

    const HandleOptionChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);

        if ( parseInt(event.target.value) === correctIdx ) {
            // increase level
            level1 = level + 50
        } else {
            // decrease level
            level1 = level - 50
        }
        setLevelState(level1)

    };
    useEffect(() => {
        console.log(`useEffect->`, nextLevel)
    })

    const handleOnclickOfButton = () => {
        if (setArticleObj) {
            console.log(`User's choice: ${selectedOption}`);
            // fixme calculate next level here
            console.log(`button->`, nextLevel)
            FilterDataCallback(globalCacheList, nextLevel, setArticleObj);
        }
    }


    const radioButtons = answers.map((ans, index) => {
        return (
            <label key={ans} className="flex items-center">
                <input
                    type="radio"
                    value={index}
                    checked={parseInt(selectedOption) === index}
                    onChange={HandleOptionChange}
                    className="form-radio text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span className="ml-2">{ans}</span>
            </label>
        );
    });


    return (
        <div className="flex flex-col space-y-2">
            <label className="font-bold">{question}</label>
            <div className="flex flex-col space-y-2">
                {radioButtons}
            </div>
            <p className="text-gray-500">Selected: {selectedOption}</p>
            <div>
                <button
                    onClick={handleOnclickOfButton}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Button
                </button>
            </div>
        </div>
    );
};

export default Article;
// export type, Article

