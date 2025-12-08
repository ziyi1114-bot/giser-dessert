const flavorData = [

    { id: 'vanilla', name: '經典香草', img: '../../assets/images/index/flavor-vanilla.png', count: 0 },
    { id: 'chocolate', name: '法芙娜可可', img: '../../assets/images/index/flavor-chocolate.png', count: 0 },
    { id: 'matcha', name: '小山園抹茶', img: '../../assets/images/index/flavor-koyamaen.png', count: 0 },
    { id: 'thai', name: '泰式奶茶', img: '../../assets/images/index/flavor-thai-milk-tea.png', count: 0 },
    { id: 'caramel', name: '焦糖榛果', img: '../../assets/images/index/flavor-caramel-hazelnut.png', count: 0 },
    { id: 'taro', name: '芋泥鹹蛋黃', img: '../../assets/images/index/flavor-taro-salted-egg-yolk.png', count: 0 }
];
const MAX = 10;
const BOX_UNIT_PRICE = 999; 
let currentBoxQty = 1;     

//購物車
function renderCart() {
    const listContainer = document.getElementById('selected-list-container');
    const totalCountSpan = document.getElementById('cart-total-count');
    
    let listHTML = '';
    let totalItems = 0;


    const selectedItems = flavorData.filter(item => item.count > 0);


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


    listContainer.innerHTML = listHTML;
    

    if (totalCountSpan) {
        totalCountSpan.innerText = totalItems;
    }
}

//顯示數量
function updateBoxQty(change) {
    
    const newQty = currentBoxQty + change;

    
    if (newQty >= 1 && newQty <= 50) {
        currentBoxQty = newQty;
        
       
        renderPriceInfo();
    }
}

//計算總價
function renderPriceInfo() {
    const qtyDisplay = document.getElementById('box-qty-display');
    const priceDisplay = document.getElementById('total-price');

    
    const totalPrice = currentBoxQty * BOX_UNIT_PRICE;

    
    if (qtyDisplay) qtyDisplay.innerText = currentBoxQty;
    if (priceDisplay) priceDisplay.innerText = totalPrice.toLocaleString(); 
}

function render() {
    const container = document.getElementById('flavor-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    let htmlContent = '';
    let currentTotal = 0;

    for (let i = 0; i < flavorData.length; i++) {
        let item = flavorData[i];
        currentTotal += item.count;
    
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

    // 進度條
    let percentage = (currentTotal / MAX) * 100;
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    if (progressText) {
        progressText.innerText = `${currentTotal} / ${MAX}`;
    }

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

    render();
}


render();
renderPriceInfo();
