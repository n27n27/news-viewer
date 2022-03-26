import Categories from "../components/Catagories";
import NewsList from "../components/NewsList";
import { useParams } from 'react-router-dom'

const NewsPage = () => {

    const categories = useParams();
    // 카테고리가 선택되지 않았으면 기본값 all로 적용
    const category = categories.category || 'all';

    return (
        <>
            <Categories />
            <NewsList category={category} />
        </>
    );
};

export default NewsPage;