
const mockArticleData = {
    _id: "123456",
    level: 700,
    title: "Sample Article",
    content: "This is a sample article content.",
    question: "how did you feel about this article?",
    answers: ["Answer 1", "Answer 2", "Answer 3"],
    correctAnsIdx: 0, // suppose the correct answer is the first one
};

function GenerateMockDate() {
    // gen 50 article data
    const data = []
    const base = {...mockArticleData}
    const levelStart = 300
    for (let i = 0; i < 50; i++) {
        const newArticle = {...base}
        newArticle._id = i.toString()

        newArticle.level = levelStart + i * 20
        newArticle.content = `This is a sample article content. at level ${newArticle.level}`

        newArticle.title = `Article L ${newArticle.level}`
        data.push(newArticle)
    }
    return data
}

export default GenerateMockDate