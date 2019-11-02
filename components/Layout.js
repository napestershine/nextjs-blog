import Header from "./Header";
import Head from "next/head";

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
};

export default ({children, title}) => (
    <div style={layoutStyle}>
        <Head>
            <title>GoFooddy - Food Is Ingredient That Binds Us Togather</title>
        </Head>
        <Header/>
    </div>
);