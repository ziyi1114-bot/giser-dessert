const flavorData = [
    { id: 'vanilla', name: '經典香草', img: '../../assets/images/index/flavor-vanilla.png', count: 0 },
    { id: 'chocolate', name: '法芙娜可可', img: '../../assets/images/index/flavor-chocolate.png', count: 0 },
    { id: 'matcha', name: '小山園抹茶', img: '../../assets/images/index/flavor-koyamaen.png', count: 0 },
    { id: 'thai', name: '泰式奶茶', img: '../../assets/images/index/flavor-thai-milk-tea.png', count: 0 },
    { id: 'hazelnut', name: '焦糖榛果', img: '../../assets/images/index/flavor-caramel-hazelnut.png', count: 0 },
    { id: 'taro', name: '芋泥鹹蛋黃', img: '../../assets/images/index/flavor-taro-salted-egg-yolk.png', count: 0 }
];

// 設定最大購買數量
const MAX_COUNT = 10;

// 2. 初始化渲染畫面
function render() {
    //.
    const container = document.getElementById('flavor-container');
    const totalCountSpan = document.getElementById('total-count'); // 抓總數顯示的地方
    const cartBtn = document.getElementById('btn-add-to-cart');

    //進圖條
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    // console.log( { progressFill, progressText });

    let htmlContent = '';
    let currentTotal = 0;

    // 1. 抓到元素






    // ... (原本控制按鈕狀態的程式碼) ...

    // 跑迴圈生成每一個卡片
    for (let i = 0; i < flavorData.length; i++) {

        // 1. 手動定義 item (在 forEach 裡是自動給你的)
        // 透過索引值 i 去陣列把物件抓出來
        const item = flavorData[i];

        // 2. 手動定義 index (其實就是 i)
        const index = i;

        // 累計目前的總數
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

    // 將 HTML 塞進去
    container.innerHTML = htmlContent;

    // 2. 計算百分比 (目前的數量 / 最大數量 * 100)
    // currentTotal 是你在迴圈裡算出來的總數
    const percentage = (currentTotal / MAX_COUNT) * 100;
    // 3. 更新 CSS 寬度
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    // 4. 更新文字
    if (progressText) {
        progressText.innerText = `${currentTotal} / ${MAX_COUNT}`;
    }

    // 更新上方總數
    if (totalCountSpan) {
        totalCountSpan.innerText = currentTotal;
    }

    // 控制按鈕狀態 (如果有選滿10個才亮起，或是大於0就亮起，看你的需求)
    // 這裡假設只要有選東西就可以按，但不能超過 10
    if (currentTotal > 0 && currentTotal <= MAX_COUNT) {
        cartBtn.style.opacity = '1';
        cartBtn.style.cursor = 'pointer';
    } else {
        cartBtn.style.opacity = '0.5';
        cartBtn.style.cursor = 'not-allowed';
    }
}

// 3. 更新數量的邏輯 
function updateCount(index, change) {
    // 先算出目前的總數
    let totalSelected = flavorData.reduce((sum, item) => sum + item.count, 0);

    // 情況 A: 想增加 (+)
    if (change > 0) {
        if (totalSelected < MAX_COUNT) {
            flavorData[index].count++;
        } else {
            alert("盒子滿了！最多只能選 10 個喔");
            return; // 結束，不重新渲染
        }
    }

    // 情況 B: 想減少 (-)
    if (change < 0) {
        if (flavorData[index].count > 0) {
            flavorData[index].count--;
        } else {
            return; // 已經是 0 了，不能再減
        }
    }

    // 資料更新完，重新畫畫面
    render();
}

// 程式一開始先跑一次
render();

// --- Part 4: 加入購物車邏輯 ---

function addToCart() {
    // 1. 先算一下目前選了幾個
    const currentTotal = flavorData.reduce((sum, item) => sum + item.count, 0);

    // 2. 檢查有沒有選東西 (或是你要強制一定要選滿 10 個才能買？)
    if (currentTotal === 0) {
        alert("盒子是空的喔！請先挑選喜歡的口味。");
        return;
    }

    // (選項) 如果老師要求一定要選滿 10 個才能結帳，就打開下面這段：
    /*
    if (currentTotal < MAX_COUNT) {
        alert(`還沒裝滿喔！目前只有 ${currentTotal} 個，請再選 ${MAX_COUNT - currentTotal} 個。`);
        return;
    }
    */

    // 3. 過濾出「有被選到」的口味 (數量為 0 的不要存，節省空間)
    const selectedItems = flavorData
        .filter(item => item.count > 0)
        .map(item => {
            return {
                id: item.id,
                name: item.name,
                count: item.count,
                img: item.img
            };
        });

    // 4. 建立訂單物件
    const cartItem = {
        type: 'gift-box', // 標記這是禮盒
        items: selectedItems,
        totalCount: currentTotal,
        timestamp: new Date().getTime() // 紀錄時間戳記 (如果是真的電商會用到)
    };

    // 5. 存入 localStorage
    // 注意：localStorage 只能存字串，所以要用 JSON.stringify
    // 這裡我們先讀取舊的購物車(如果有)，沒有的話就給空陣列
    let currentCart = JSON.parse(localStorage.getItem('myCart')) || [];
    currentCart.push(cartItem);

    localStorage.setItem('myCart', JSON.stringify(currentCart));

    // 6. 成功提示 & 跳轉頁面
    alert("成功加入購物車！");

    // 跳轉到首頁或是購物車頁面 (請改成你專案實際的路徑)
    // window.location.href = '../cart/cart.html'; 
    // 或是重新整理頁面
    window.location.reload();
}

// 綁定按鈕點擊事件 (確保 DOM 載入後再綁定)
document.addEventListener("DOMContentLoaded", function () {
    // 綁定加入購物車按鈕
    const btnAdd = document.getElementById('btn-add-to-cart');
    if (btnAdd) {
        btnAdd.addEventListener('click', addToCart);
    }
});