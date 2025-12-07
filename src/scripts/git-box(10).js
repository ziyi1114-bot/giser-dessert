const flavorData = [

    { id: 'vanilla', name: '經典香草', img: '../../assets/images/index/flavor-vanilla.png', count: 0 },
    { id: 'chocolate', name: '法芙娜可可', img: '../../assets/images/index/flavor-chocolate.png', count: 0 },
    { id: 'matcha', name: '小山園抹茶', img: '../../assets/images/index/flavor-koyamaen.png', count: 0 },
    { id: 'thai', name: '泰式奶茶', img: '../../assets/images/index/flavor-thai-milk-tea.png', count: 0 },
    { id: 'caramel', name: '焦糖榛果', img: '../../assets/images/index/flavor-caramel-hazelnut.png', count: 0 },
    { id: 'taro', name: '芋泥鹹蛋黃', img: '../../assets/images/index/flavor-taro-salted-egg-yolk.png', count: 0 }
];
const MAX = 10;
const BOX_UNIT_PRICE = 999; // 禮盒單價
let currentBoxQty = 1;      // 目前購買盒數 (預設 1 盒)


// git-box(10).js

// ... (flavorData 和 MAX 變數保持不變) ...

// 🔥 新增這個函式：專門負責渲染左邊的小購物車
function renderCart() {
    const listContainer = document.getElementById('selected-list-container');
    const totalCountSpan = document.getElementById('cart-total-count');
    
    let listHTML = '';
    let totalItems = 0;

    // 1. 過濾出數量 > 0 的口味 (這就是你要的新物件概念)
    const selectedItems = flavorData.filter(item => item.count > 0);

    // 2. 跑迴圈生成 HTML
    if (selectedItems.length === 0) {
        listHTML = '<p style="color: #999; text-align: center; margin-top: 20px;">尚未選擇口味</p>';
    } else {
        selectedItems.forEach(item => {
            totalItems += item.count;
            listHTML += `
                <div class="cart-item-row">
                    <span>${item.name}</span>
                    <span>x ${item.count}</span>
                </div>
            `;
        });
    }

    // 3. 更新畫面
    listContainer.innerHTML = listHTML;
    
    // 更新購物車下方顯示的總數
    if (totalCountSpan) {
        totalCountSpan.innerText = totalItems;
    }
}

function updateBoxQty(change) {
    // 1. 計算新數量
    const newQty = currentBoxQty + change;

    // 2. 驗證：不能少於 1 盒，也可以設上限(例如最多買50盒)
    if (newQty >= 1 && newQty <= 50) {
        currentBoxQty = newQty;
        
        // 3. 更新畫面
        renderPriceInfo();
    }
}

// 👇👇👇 新增這個函式：用來更新 DOM 上的價格跟數量 👇👇👇
function renderPriceInfo() {
    const qtyDisplay = document.getElementById('box-qty-display');
    const priceDisplay = document.getElementById('total-price');

    // 計算總價
    const totalPrice = currentBoxQty * BOX_UNIT_PRICE;

    // 更新 HTML
    if (qtyDisplay) qtyDisplay.innerText = currentBoxQty;
    if (priceDisplay) priceDisplay.innerText = totalPrice.toLocaleString(); 
}


// 修改原本的 render 函式
function render() {
    const container = document.getElementById('flavor-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    let htmlContent = '';
    let currentTotal = 0;

    for (let i = 0; i < flavorData.length; i++) {
        let item = flavorData[i];
        currentTotal += item.count;
        
        // ... (中間生成卡片的 htmlContent 保持不變) ...
        htmlContent += `
        <div class="gift-box__card">
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <div class="select">
                <div class="icon" onclick="updateCount(${i}, -1)">
                    <span>➖</span>
                </div>
                <span class="qty-display" style="margin: 0 10px; ">${item.count}</span>

                <div class="icon" onclick="updateCount(${i}, 1)">
                    <span>➕</span>
                </div>
            </div>
        </div>
        `;
    }
    container.innerHTML = htmlContent;

    // 進度條邏輯保持不變
    let percentage = (currentTotal / MAX) * 100;
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    if (progressText) {
        progressText.innerText = `${currentTotal} / ${MAX}`;
    }

    // 🔥 關鍵：每次 render 主畫面的時候，順便 render 購物車
    renderCart(); 
}

function updateCount(products, change) {
    let sum = 0;
    for (let i = 0; i < flavorData.length; i++) {
        sum += flavorData[i].count;
    }

    let totalSelected = sum;

    if (change > 0) {
        if (totalSelected < MAX) {
            flavorData[products].count++;
        } else {
            alert("禮盒滿了！最多只能選 10 個");
            return;
        }
    }

    if (change < 0) {
        if (flavorData[products].count > 0) {
            flavorData[products].count--;
        } else {
            return;
        }
    }

    // 資料改完了，叫 render 重畫整個畫面 (包含購物車)
    render();
}


// 初始化
render();
renderPriceInfo();
