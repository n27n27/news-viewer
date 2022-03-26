import axios from 'axios';
import styled from "styled-components";
import usePromise from '../lib/usePromise';
import NewsItem from "./NewsItem";

type NewsListProps = {

    category: string
}

const NewsList = ({ category }: NewsListProps) => {

    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=98a9965751d54dc2969a8da5e4c7f23a`,

        );
    }, [category])    

    // 대기 중일 때
    if(loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }

    // 아직 articles 값이 설정되지 않았을 때
    if(!response) {
        return null;
    }

    if(error) {
        return <NewsListBlock>에러 발생!</NewsListBlock>
    }

    // response 값이 유요할 때
    const { articles } = response.data;
    return (
        <NewsListBlock>
            {(articles as any).map((article: any) => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
}

export default NewsList

const NewsListBlock = styled.div`
    box-sizing: border=box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;