const flavorData = [
    { id: 'vanilla', name: '經典香草', img: '../../assets/images/index/flavor-vanilla.png', count: 0 },
    { id: 'chocolate', name: '法芙娜可可', img: '../../assets/images/index/flavor-chocolate.png', count: 0 },
    { id: 'matcha', name: '小山園抹茶', img: '../../assets/images/index/flavor-koyamaen.png', count: 0 },
    { id: 'thai', name: '泰式奶茶', img: '../../assets/images/index/flavor-thai-milk-tea.png', count: 0 },
    { id: 'hazelnut', name: '焦糖榛果', img: '../../assets/images/index/flavor-caramel-hazelnut.png', count: 0 },
    { id: 'taro', name: '芋泥鹹蛋黃', img: '../../assets/images/index/flavor-taro-salted-egg-yolk.png', count: 0 }
];

const MAX_COUNT = 10;


function render() {
    const container = document.getElementById('flavor-container');

    //進圖條
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    let htmlContent = '';
    let currentTotal = 0;

    for (let i = 0; i < flavorData.length; i++) {
        const item = flavorData[i];
        const index = i;
        currentTotal += item.count;
        htmlContent += `
        <div class="gift-box__card">
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <div class="select">
                <div class="icon" onclick="updateCount(${i}, -1)">
                    <img src="../../assets/icons/icon-sub.png" alt="sub">
                </div>
                
                <span class="qty-display" style="margin: 0 10px; font-weight:bold;">${item.count}</span>

                <div class="icon" onclick="updateCount(${i}, 1)">
                    <img src="../../assets/icons/icon-add.png" alt="add">
                </div>
            </div>
        </div>
    `;
    }
    container.innerHTML = htmlContent;


    const percentage = (currentTotal / MAX_COUNT) * 100;
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    if (progressText) {
        progressText.innerText = `${currentTotal} / ${MAX_COUNT}`;
    }


}


function updateCount(index, change) {
    const totalCountSpan = document.getElementById('total-count');
    let sum = 0;


    for (let i = 0; i < flavorData.length; i++) {
        let item = flavorData[i];
        sum += item.count;
    }
    
    let totalSelected = sum;
    if (change > 0) {
        
        if (totalSelected < MAX_COUNT) {
            totalCountSpan.innerText += `${flavorData[index].name}`
            flavorData[index].count++;
        } else {
            alert("盒子滿了！最多只能選 10 個喔");
            return;
        }
    }

    if (change < 0) {
        if (flavorData[index].count > 0) {
            flavorData[index].count--;
        } else {
            return;
        }
    }

    // if (totalCountSpan) {
    //     totalCountSpan.innerText = `${flavorData[index].name}`
    // }

    render();
}


render();

