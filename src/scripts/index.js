
const flavorData = [
    {
        id: 'chocolate',
        title: '法芙娜可可',
        desc: '使用頂級 Valrhona 可可粉，濃郁苦甜的大人系風味，每一口都是奢華享受。',
        img: 'src/assets/images/index/flavor-chocolate.png'
    },
    {
        id: 'vanilla',
        title: '經典香草',
        desc: '選用馬達加斯加香草莢，最純粹的蛋奶香氣，搭配焦糖脆殼的經典之作。',
        img: 'src/assets/images/index/flavor-vanilla.png'
    },
    {
        id: 'matcha',
        title: '小山園抹茶',
        desc: '來自京都小山園的抹茶粉，茶香回甘不苦澀，與焦糖外殼交織出優雅的和風滋味。',
        img: 'src/assets/images/index/flavor-koyamaen.png'
    },
    {
        id: 'thai',
        title: '泰式奶茶',
        desc: '手標茶葉熬煮的濃郁泰奶，獨特的橘紅魅力，彷彿置身曼谷街頭的甜蜜。',
        img: 'src/assets/images/index/flavor-thai-milk-tea.png'
    },
    {
        id: 'caramel',
        title: '焦糖榛果',
        desc: '慢火熬煮的焦糖醬與烘烤榛果的堅果香氣，層次豐富，香氣逼人。',
        img: 'src/assets/images/index/flavor-caramel-hazelnut.png'
    },
    {
        id: 'taro',
        title: '芋泥鹹蛋黃',
        desc: '綿密大甲芋泥遇上金沙鹹蛋黃，鹹甜交織的台式靈魂，令人驚艷的創意組合。',
        img: 'src/assets/images/index/flavor-taro-salted-egg-yolk.png'
    }
];

function initFlavorInteraction() {
    const figures = document.querySelectorAll('.flavor-introduce__list figure');
    const titleDisplay = document.getElementById('introduce_title');
    const contentDisplay = document.getElementById('introduce_content');

    updateFlavorDisplay(0);

    figures.forEach((figure, index) => {
        figure.addEventListener('click', () => {
            
            figures.forEach(f => f.classList.remove('active'));
            figure.classList.add('active');
            updateFlavorDisplay(index);
        });
    });

    function updateFlavorDisplay(index) {
        const data = flavorData[index];

        const textBox = document.querySelector('.introduce');
        textBox.style.opacity = 0;

        setTimeout(() => {
            titleDisplay.innerText = data.title;
            contentDisplay.innerText = data.desc;
            textBox.style.opacity = 1;
        }, 200);
    }
}


var mySwiper = new Swiper(".mySwiper", {
    //  基礎設定
    loop: true,              
    slidesPerView: 1,        
    spaceBetween: 0,        

    //  導航
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
document.addEventListener('DOMContentLoaded', initFlavorInteraction);