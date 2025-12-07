// js/step1-wedding.js

// --- Part 1: 資料定義 (Model) ---
// 定義一個常數，代表每次增加的單位
// 資工系習慣：Magic Number 要提取成常數
const STEP_MAX = 10; 

const weddingFlavors = [
    { id: 'vanilla', name: '經典香草', img: '../../assets/images/index/flavor-vanilla.png', count: 0 },
    { id: 'chocolate', name: '法芙娜可可', img: '../../assets/images/index/flavor-chocolate.png', count: 0 },
    { id: 'matcha', name: '小山園抹茶', img: '../../assets/images/index/flavor-koyamaen.png', count: 0 },
    { id: 'thai', name: '泰式奶茶', img: '../../assets/images/index/flavor-thai-milk-tea.png', count: 0 },
    { id: 'caramel', name: '焦糖榛果', img: '../../assets/images/index/flavor-caramel-hazelnut.png', count: 0 },
    { id: 'taro', name: '芋泥鹹蛋黃', img: '../../assets/images/index/flavor-taro-salted-egg-yolk.png', count: 0 }
];

// --- Part 2: 渲染與互動邏輯 (View & Controller) ---
function render() {
    const container = document.getElementById('product-grid-container');
    const totalDisplay = document.getElementById('total-count-display');
    const nextBtn = document.getElementById('btn-next-step');
    
    let htmlContent = '';
    let currentTotal = 0;

    // 1. 跑迴圈生成 HTML
    weddingFlavors.forEach((item, index) => {
        currentTotal += item.count;

        htmlContent += `
            <div class="product-card">  
                    <img src="${item.img}">
                    <p>${item.name}</p>
                    <div class="control-bar">
                        <span class="icon-btn" onclick="updateWeddingCount(${index}, -1)">➖</span>
                        
                        <span>${item.count}</span>
                        
                        <span class="icon-btn" onclick="updateWeddingCount(${index}, 1)">➕</span>
                    </div>
            </div>
        `;
    });

    // 2. 更新 DOM
    container.innerHTML = htmlContent;
    totalDisplay.innerText = currentTotal;

    // 3. 控制「下一步」按鈕狀態 (有選數量才能按)
    if (currentTotal > 0) {
        nextBtn.classList.add('active');
    } else {
        nextBtn.classList.remove('active');
    }
}


function updateWeddingCount(index, direction) {
    
    const changeAmount = direction * STEP_MAX; 
    const newCount = weddingFlavors[index].count + changeAmount;

    if (newCount >= 0) {
        weddingFlavors[index].count = newCount;
        render();
    } else {
    }
}


// --- Part 3: 初始化 ---
document.addEventListener("DOMContentLoaded", function() {
    
    render(); 
});