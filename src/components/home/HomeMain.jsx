import FirstContent from './FirstContent';
import TemplateContent from './TemplateContent';
import './HomeMain.css';

function HomeMain() {
    const myItems = [
        {
            topic: 'Restaurant discovery',
            content: 'Explore a wide array of local restaurants with ease.',
        },
        {
            topic: 'Order tracking',
            content: 'Stay updated on your food delivery in real-time.',
        },
        {
            topic: 'Menu browsing',
            content: 'View detailed menus from your favorite restaurants.',
        },
    ];

    const contentToRender = [
        {
            topHeader: <h3>DISCOVER FOODLINK</h3>,
            mainHeader: <h2>Your gateway to delicious meals</h2>,
            paragraph: (
                <p>
                    FoodLink connects you to finest restaurants right at your
                    fingertips. Browse through a diverse selection of eateries,
                    explore their menus, and handpick your favorite dishes for a
                    delightful dining experience. Completing your order is a
                    breeze with our easy-to-use platform. Plus, you can track
                    your order online every step of the way. Enjoy the flavors
                    of Ashdod without leaving your home!,
                </p>
            ),
            button: 'Get In Touch',
            link: '/contact'
        },
        {
            topHeader: <h3>DELICIOUS DELIVERIES</h3>,
            mainHeader: <h2>Order from the best local restaurants</h2>,
            paragraph: myItems.map((item, index) => (
                <li key={index}>
                    <strong>{item.topic}:</strong> {item.content}
                </li>
            )),
        },
    ];

    const mapItems = contentToRender.map((content, index) => (
        <TemplateContent
            key={index}
            topHeader={content.topHeader}
            mainHeader={content.mainHeader}
            paragraph={content.paragraph}
            button={content.button}
        />
    ))

    return (
        <div className="home-main">
            <FirstContent />
            {mapItems}
        </div>
    );
}

export default HomeMain;