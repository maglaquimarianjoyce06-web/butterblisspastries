const products=[
{id:'cupcake',name:'Cupcakes',category:'cupcakes',price:50,display:'₱40–₱60 each',image:'ccakes.jpg',desc:'Freshly baked cupcakes for everyday treats and celebrations.'},
{id:'loaf',name:'Loaf Bread',category:'pastries',price:100,display:'₱80–₱120',image:'loafbread.jpg',desc:'Homemade loaf bread baked fresh with quality ingredients.'},
{id:'simple',name:'Simple Cake',category:'cakes',price:800,display:'From ₱800',image:'simple.jpg',desc:'A small customized cake with a simple, elegant design.'},
{id:'standard',name:'Standard Decorated Cake',category:'cakes',price:1200,display:'₱1,200',image:'standard.jpg',desc:'A decorated 1kg cake for birthdays and special occasions.'},
{id:'cookies',name:'Cookies',category:'pastries',price:200,display:'₱150–₱250 / pack',image:'cookies.jpg',desc:'150g packs of homemade cookies, perfect for gifting.'},
{id:'ube',name:'Ube Strawberry',category:'cakes',price:1200,display:'Custom quote',image:'US.jpg',desc:'A local-inspired ube and strawberry cake concept.'},
{id:'buko',name:'Buko Pandan',category:'cakes',price:1200,display:'Custom quote',image:'UP.jpg',desc:'A fresh local-inspired cake flavor for celebrations.'},
{id:'honey',name:'Wild Honey Carrot',category:'cakes',price:1200,display:'Custom quote',image:'CC.jpg',desc:'Carrot cake concept featuring native honey.'}
];
let cart=JSON.parse(localStorage.getItem('butterBlissCart')||'[]');
const $=id=>document.getElementById(id);const money=n=>'₱'+n.toLocaleString('en-PH');
function renderProducts(filter='all'){ $('productGrid').innerHTML=products.filter(p=>filter==='all'||p.category===filter).map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}"></div><div class="product-body"><span class="tag">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${p.display}</div><button class="add" onclick="addToCart('${p.id}')">Add to order +</button></div></article>`).join('')}
function save(){localStorage.setItem('butterBlissCart',JSON.stringify(cart));renderCart()}
function addToCart(id){const p=products.find(x=>x.id===id),item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();toast(p.name+' added to your order ♡')}
function changeQty(id,d){const i=cart.find(x=>x.id===id);if(!i)return;i.qty+=d;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);save()}
function renderCart(){let q=cart.reduce((s,x)=>s+x.qty,0);$('cartCount').textContent=q;if(!cart.length){$('cartItems').innerHTML='<div style="padding:50px 5px;text-align:center;color:#68716c">Your order is empty.<br><br>Add something sweet from the menu ♡</div>';$('cartTotal').textContent='₱0';return}let sum=0;$('cartItems').innerHTML=cart.map(x=>{let p=products.find(y=>y.id===x.id);sum+=p.price*x.qty;return `<div class="cart-item"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${money(p.price)} × ${x.qty}</small></div><div class="qty"><button onclick="changeQty('${p.id}',-1)">−</button><span>${x.qty}</span><button onclick="changeQty('${p.id}',1)">+</button></div></div>`}).join('');$('cartTotal').textContent=money(sum)}
function openCart(){$('cartPanel').classList.add('open');$('overlay').classList.add('open')}function closeCart(){$('cartPanel').classList.remove('open');$('overlay').classList.remove('open')}function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),1800)}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter)}));
$('cartBtn').onclick=openCart;$('closeCart').onclick=closeCart;$('overlay').onclick=closeCart;
$('checkoutBtn').onclick=()=>{closeCart();$('contact').scrollIntoView({behavior:'smooth'});setTimeout(()=>{$('[name="details"]').value=cart.map(x=>{let p=products.find(y=>y.id===x.id);return `${x.qty} × ${p.name}`}).join('\n')},500)};
$('orderForm').addEventListener('submit',e=>{e.preventDefault();let n=new FormData(e.target).get('name');toast('Thank you, '+n+'! Your inquiry is ready ♡');e.target.reset()});
$('hamburger').onclick=()=>document.querySelector('nav').classList.toggle('open');document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.querySelector('nav').classList.remove('open'));$('year').textContent=new Date().getFullYear();renderProducts();renderCart();
