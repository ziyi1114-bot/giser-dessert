// js/step1-wedding.js

// --- Part 1: 資料定義 (Model) ---
// 定義一個常數，代表每次增加的單位
// 資工系習慣：Magic Number 要提取成常數
const STEP_UNIT = 10; 

const weddingFlavors = [
    // 請替換成你正確的圖片路徑
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
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name}</p>
                <div class="control-bar">
                    <img src="assets/icons/icon-sub.png" class="icon-btn" onclick="updateWeddingCount(${index}, -1)">
                    
                    <span>${item.count}</span>
                    
                    <img src="assets/icons/icon-add.png" class="icon-btn" onclick="updateWeddingCount(${index}, 1)">
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


// 🔥 核心邏輯：更新數量 (以 10 為單位) 🔥
// index: 修改第幾個商品
// direction: 方向 (+1 代表增加, -1 代表減少)
function updateWeddingCount(index, direction) {
    
    // 這裡是最關鍵的一行！
    // 我們把方向 (+1 或 -1) 乘上 單位 (10)
    const changeAmount = direction * STEP_UNIT; 

    // 計算「如果」加減下去，新的數量會是多少
    const newCount = weddingFlavors[index].count + changeAmount;

    // 驗證：新的數量不能小於 0 (不能買負數個)
    if (newCount >= 0) {
        // 驗證通過，才真正修改資料
        weddingFlavors[index].count = newCount;
        
        // 資料變了，重新渲染畫面
        render();
    } else {
        // 如果小於 0，什麼都不做，或可以跳個 alert 提示
        // console.log("不能再少了");
    }
}


// --- Part 3: 初始化 ---
document.addEventListener("DOMContentLoaded", function() {
    // 如果有需要，這裡可以先去 localStorage 讀取上次選的紀錄 (進階功能)
    
    render(); // 一開始先畫出都是 0 的畫面
});