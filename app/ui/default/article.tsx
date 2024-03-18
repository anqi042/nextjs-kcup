'use client';
import { useState,ChangeEvent } from 'react';
import Link from 'next/link';
import {
    UserGroupIcon,
    HomeIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx'; // css conditional classes

export type ArticleData = {
    _id: string;
    level: number,
    title: string;
    content: string;
    questions: string[];
    answers: string[];
}

function Article({ data }: { data: ArticleData }) {
    const { title, content, questions, answers } = data;
    return (
        <>
            <div
                className="bg-white rounded-lg shadow-md p-4 md:p-6 m-4 md:m-8 flex flex-col items-center justify-center w-full">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-700 mt-2">{content}</p>
            </div>
            <div>
                <RadioGroup answers={answers} questions={questions}/>
            </div>
        </>
    );
}



const RadioGroup = ({ questions, answers }: { questions: string[], answers: string[] }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const links = [
        {name: 'Next', href: '#', icon: ArrowRightIcon},
    ];
    const link = links[0]
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
    const LinkIcon = link.icon;

    const radioButtons = questions.map((question, index) => {
        return (
            <label key={question} className="flex items-center">
                <input
                    type="radio"
                    value={answers[index]}
                    checked={selectedOption === answers[index]}
                    onChange={handleOptionChange}
                    className="form-radio text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span className="ml-2">{question}</span>
            </label>
        );
    });

    return (
        <div className="flex flex-col space-y-2">
            <label className="font-bold">Select an option:</label>
            <div className="flex flex-col space-y-2">
                {radioButtons}
            </div>
            <p className="text-gray-500">Selected option: {selectedOption}</p>
            <div>
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                    )}>
                    <LinkIcon className="w-6"/>
                    <p className="hidden md:block">{link.name}</p>
                </Link>
            </div>
        </div>
    );
};

export default Article;
// export type, Article
