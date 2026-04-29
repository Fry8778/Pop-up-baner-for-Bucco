(function () {
  if (document.getElementById("buco-agent-root")) return;

  /* ───────────────────────────── СТИЛІ ───────────────────────────── */
  const style = document.createElement("style");
  style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

#buco-agent-root *{
  box-sizing:border-box;
  margin:0;
  font-family:'DM Sans',sans-serif
}

#buco-fab{
  bottom: 48px;
  right: 44px;

  
  position:fixed;   
  left:auto;  
  width:75px;
  height:75px;
  border-radius:50%; 
  border:none;
  cursor:pointer;
  box-shadow:0 18px 60px rgba(61,31,13,0.5);
  z-index:99998;
  transition:transform 0.2s,box-shadow 0.2s;
  overflow:visible; /* ← ВАЖЛИВО */
  padding: 0;  /* ← ДОДАЙ цей рядок */
}

#buco-fab img{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:50%;  

}

#buco-fab .buco-badge{ 
  top:-10px;
  right:0px;
  
  position:absolute;
  width:25px;
  height:25px; 
  background:#c97b3a;
  border-radius:50%;
  border:2px solid #fff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:10px;
  color:#fff;
  font-weight:500;
  z-index:5;
}

#buco-fab:hover{
transform:scale(1.07);
box-shadow:0 6px 28px rgba(61,31,13,0.45)
}

#buco-window{
  bottom: 110px;
  right: 44px;
  left:auto;
  position:fixed;
  width:380px;
  max-width:calc(100vw - 32px);
  height:580px;
  max-height:calc(100vh - 120px);
  border-radius:18px;
  overflow:hidden;
  display:none;
  flex-direction:column;
  box-shadow:0 12px 48px rgba(26,14,7,0.22);
  z-index:99999;
  animation:bucoSlideIn 0.28s cubic-bezier(.22,.68,0,.99)
}
@keyframes bucoSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
#buco-window.open{display:flex}

/* Фікс переповнення хедера */
.buco-header{
  justify-content: space-between;
  display:flex;
  align-items:center;
  gap:10px;
  padding:12px 14px;
  background:#1a0e07;
  flex-shrink:0;
  min-width:0; /* 🔥 важливо */
}

.buco-logo{
  width:38px;
  height:38px;
  border-radius:50%;
  background:#c97b3a;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  overflow:hidden; /* щоб нічого не вилазило */
}
.buco-logo img{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:50%;
}
 
/* щоб текст не розпихав все */
.buco-header-text{
  min-width:0;
  overflow:hidden;
}

.buco-header-text h3{
  color:#fff8f0;
  font-family:'Playfair Display',serif;font-size:15px;
  font-weight:500;
  margin-bottom:1px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.buco-header-text p{
  color:#e8a55a;
  font-size:11px;
  font-weight:300;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.buco-close{
  margin-left:auto;
  background:transparent;
  border:none;
  cursor:pointer;
  color:#e8a55a;
  font-size:20px;
  line-height:1;
  padding:4px;
  opacity:0.8
}
.buco-close:hover{opacity:1}
.buco-dot{width:7px;height:7px;border-radius:50%;background:#5cba6e;flex-shrink:0;margin-left:4px}
.buco-msgs{
  flex:1;
  overflow-y:auto;
  padding:12px;
  display:flex;
  flex-direction:column;
  gap:8px;
  background:#f5ede0;
  scroll-behavior:smooth
}
.buco-msgs::-webkit-scrollbar{width:3px}
.buco-msgs::-webkit-scrollbar-thumb{background:#ede0cc;border-radius:2px}
.buco-label{font-size:11px;color:#7a5c3e;font-weight:500;margin-bottom:2px}
.buco-msg{
  max-width:88%;
  padding:9px 13px;
  font-size:13px;
  border-radius:14px;
  line-height:1.55;  
  animation:bucoFade 0.22s ease
}
@keyframes bucoFade{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.buco-ai{
  background:#fff8f0;color:#2a1506;align-self:flex-start;
  border:0.5px solid #ede0cc;border-bottom-left-radius:3px
}
.buco-user{background:#3d1f0d;color:#fff8f0;align-self:flex-end;border-bottom-right-radius:3px}
.buco-opts{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
.buco-opt{
  background:#fff8f0;border:1px solid #c97b3a;color:#7c3c1a;
  border-radius:18px;padding:4px 11px;font-size:12px;cursor:pointer;
  transition:all 0.14s;font-family:'DM Sans',sans-serif
}
.buco-opt:hover{background:#c97b3a;color:#fff}
.buco-opt:disabled{opacity:0.38;pointer-events:none}
.buco-typing{
  display:flex;align-items:center;gap:4px;padding:9px 13px;
  background:#fff8f0;border:0.5px solid #ede0cc;border-radius:14px;
  border-bottom-left-radius:3px;align-self:flex-start
}
.buco-typing span{
  width:5px;height:5px;border-radius:50%;background:#c97b3a;
  animation:bucoBounce 1.1s infinite
}
.buco-typing span:nth-child(2){animation-delay:.18s}
.buco-typing span:nth-child(3){animation-delay:.36s}
@keyframes bucoBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
.buco-card{
  background:#fff;border:0.5px solid #ede0cc;border-radius:11px;
  padding:9px 11px;margin-top:4px
}
.buco-card h4{
  color:#7c3c1a;font-size:13px;font-weight:500;
  font-family:'Playfair Display',serif;margin-bottom:3px
}
.buco-card p{font-size:12px;color:#7a5c3e;line-height:1.4;margin-bottom:5px}
.buco-tag{
  display:inline-block;background:#fff8f0;border:0.5px solid #c97b3a;
  color:#7c3c1a;border-radius:9px;padding:2px 7px;font-size:11px;margin:2px 2px 0 0
}
.buco-restart{
  background:transparent;border:1px solid #e8a55a;color:#7a5c3e;
  border-radius:10px;padding:5px 11px;font-size:12px;cursor:pointer;
  margin-top:5px;font-family:'DM Sans',sans-serif;transition:all 0.15s
}
.buco-restart:hover{background:#e8a55a;color:#2a1506}
.buco-input-row{
  display:flex;gap:8px;padding:9px 11px;background:#1a0e07;flex-shrink:0
}
.buco-input{
  flex:1;background:#fff8f0;border:0.5px solid #ede0cc;border-radius:18px;
  padding:7px 13px;font-size:13px;color:#2a1506;outline:none;
  font-family:'DM Sans',sans-serif
}
.buco-input:focus{border-color:#c97b3a}
.buco-send{
  width:34px;height:34px;border-radius:50%;background:#c97b3a;border:none;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  flex-shrink:0;transition:background 0.14s
}
.buco-send:hover{
background:#e8a55a
}
.buco-send svg{
width:14px;
height:14px;
fill:#fff
}

  

/* ── ПЛАНШЕТ 768px–1024px ── */
@media(max-width:1024px) and (min-width:769px){
  #buco-fab{
    bottom: 30px;
    right: 44px;

    width: 70px;
    height: 70px;
  }
  #buco-window{   
    bottom: 110px;
    right: 44px;
    width: 360px;
  }
}

/* ── МОБІЛЬНИЙ портрет ── */
@media(max-width:768px) and (orientation:portrait){
  #buco-fab{
    left: auto !important;
    right: 46px !important;

    width: 65px !important;
    height: 65px !important;
    bottom: 28px !important;
  }
  #buco-window{
    bottom: 80px !important;
    right: 10px !important;

    left: auto !important;
    width: calc(100vw - 20px) !important;
    max-height: calc(100vh - 120px) !important;
  }
}

/* ── МОБІЛЬНИЙ ландшафт ── */
@media(max-width:900px) and (orientation:landscape){
  #buco-fab{
    left: auto !important;
    right: 45px !important;
    bottom: 31px !important;
    width: 75px !important;
    height: 75px !important;
  }
  #buco-window{
    right: 10px !important;
    bottom: 110px !important;
    width: calc(100vw - 20px) !important;
    height: calc(100vh - 120px) !important;
    max-height: calc(100vh - 120px) !important;
  }
}
  `;
  document.head.appendChild(style);

  const PRODUCTS = [
    /* ── МЕЛЕНА КАВА ── */
    {
      name: "Мелена кава BUCO «Рецепт Італії» 70г",
      desc: "Темне обсмаження, насичений глибокий смак із легкою гірчинкою. Арабіка 30%, Робуста 70%.",
      url: "https://bucocoffee.com.ua/buco-retsept-italii-melena-kava",
      tags: ["мелена", "еспресо", "темна обжарка"],
      price: "98 грн / 70г",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["кавомашина", "гейзер", "мока", "турка"],
      forTaste: ["шоколад", "горіхи"],
    },
    {
      name: "Мелена кава BUCO «Рецепт Італії» 200г",
      desc: "Темне обсмаження, насичений глибокий смак із легкою гірчинкою. Арабіка 30%, Робуста 70%.",
      url: "https://bucocoffee.com.ua/melena-kava-buco-retsept-italii",
      tags: ["мелена", "еспресо", "темна обжарка"],
      price: "290 грн / 200г",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["кавомашина", "гейзер", "мока", "турка"],
      forTaste: ["шоколад", "горіхи"],
    },
    {
      name: "Мелена кава BUCO «Рецепт Бразилії» 70г",
      desc: "Мікс арабік із ніжним смаком, пряними нотками та делікатним винним відтінком. Арабіка 50%, Робуста 50%.",
      url: "https://bucocoffee.com.ua/buco-retsept-brazylii-melena-kava",
      tags: ["мелена", "фільтр", "середня обжарка"],
      price: "98 грн / 70г",
      type: "кава",
      forDev: ["новачок"],
      forEquip: ["турка", "фільтр", "french press"],
      forTaste: ["карамель", "горіхи"],
    },
    {
      name: "Мелена кава BUCO «Рецепт Бразилії» 200г",
      desc: "Мікс арабік із ніжним смаком, пряними нотками та делікатним винним відтінком. Арабіка 50%, Робуста 50%.",
      url: "https://bucocoffee.com.ua/melena-kava-buco-retsept-brazylii",
      tags: ["мелена", "фільтр", "середня обжарка"],
      price: "290 грн / 200г",
      type: "кава",
      forDev: ["новачок"],
      forEquip: ["турка", "фільтр", "french press"],
      forTaste: ["карамель", "горіхи"],
    },
    {
      name: "Мелена кава BUCO «Рецепт Кенії» 70г",
      desc: "Витончена африканська арабіка з цитрусовою свіжістю та делікатним винним післясмаком. Арабіка 70%.",
      url: "https://bucocoffee.com.ua/buco-retsept-kenii-melena-kava",
      tags: ["мелена", "фільтр", "яскрава"],
      price: "98 грн / 70г",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["фільтр", "аеропрес", "french press"],
      forTaste: ["фрукти", "ягоди"],
    },
    {
      name: "Мелена кава BUCO «Рецепт Кенії» 200г",
      desc: "Витончена африканська арабіка з цитрусовою свіжістю та делікатним винним післясмаком. Арабіка 70%.",
      url: "https://bucocoffee.com.ua/buco-retsept-kenii-melena-kava/533",
      tags: ["мелена", "фільтр", "яскрава"],
      price: "310 грн / 200г",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["фільтр", "аеропрес", "french press"],
      forTaste: ["фрукти", "ягоди"],
    },
    {
      name: "Мелена кава BUCO «Рецепт Колумбії» 200г",
      desc: "Освіжаюча арабіка з Колумбії та Гондурасу. Цитрусовий, квітковий смак. Арабіка 80%.",
      url: "https://bucocoffee.com.ua/melena-kava-buco-retsept-kolumbii",
      tags: ["мелена", "еспресо", "фільтр"],
      price: "320 грн / 200г",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["будь-яке"],
      forTaste: ["фрукти", "карамель"],
    },
    {
      name: "Мелена кава BUCO «Рецепт Куби» 200г",
      desc: "Мікс кави з Куби та Центральної Америки. Смак горіху та ароматного шоколаду. 100% арабіка.",
      url: "https://bucocoffee.com.ua/buco-retsept-kuby-melena-kava",
      tags: ["мелена", "еспресо", "темна обжарка"],
      price: "335 грн / 200г",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["кавомашина", "гейзер", "мока"],
      forTaste: ["шоколад", "горіхи"],
    },
    {
      name: "Мелена кава BUCO «Рецепт Індії» 200г",
      desc: "Кава з високих гір Індії, темне обсмаження. Духмяний, пряний, горіховий смак із легкою гірчинкою.",
      url: "https://bucocoffee.com.ua/buco-retsept-italii-melena-kava/566",
      tags: ["мелена", "еспресо", "темна обжарка"],
      price: "290 грн / 200г",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["кавомашина", "гейзер", "турка"],
      forTaste: ["шоколад", "горіхи"],
    },
    {
      name: "Мелена кава BUCO «Колумбія без кофеїну» 200г",
      desc: "100% колумбійська арабіка без кофеїну. Цитруси, зелене яблуко, вишня.",
      url: "https://bucocoffee.com.ua/melena-kava/578/",
      tags: ["мелена", "без кофеїну", "фільтр"],
      price: "549 грн / 200г",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["будь-яке"],
      forTaste: ["фрукти", "ягоди"],
    },

    /* ── РОЗЧИННА КАВА ── */
    {
      name: "Розчинна кава BUCO «Ранкова» 55г",
      desc: "Ароматна бразильська розчинна кава 100% арабіка. Зручно спробувати або взяти у подорож.",
      url: "https://bucocoffee.com.ua/buco-rankova-rozchynna-kava/55g",
      tags: ["розчинна", "без обладнання"],
      price: "150 грн / 55г",
      type: "кава",
      forDev: ["новачок"],
      forEquip: ["будь-яке"],
      forTaste: ["шоколад", "горіхи"],
    },
    {
      name: "Розчинна кава BUCO «Ранкова» 120г",
      desc: "Ароматна бразильська розчинна кава 100% арабіка. Приємна гірчинка, швидко готується.",
      url: "https://bucocoffee.com.ua/buco-rankova-rozchynna-kava/120g",
      tags: ["розчинна", "без обладнання"],
      price: "330 грн / 120г",
      type: "кава",
      forDev: ["новачок"],
      forEquip: ["будь-яке"],
      forTaste: ["шоколад", "горіхи"],
    },

    /* ── ЗЕРНОВА КАВА ── */
    {
      name: "Зернова кава BUCO «Рецепт Кенії» 500г",
      desc: "Африканська арабіка у зернах із легкими цитрусовими нотками та присмаком вина. Арабіка 70%.",
      url: "https://bucocoffee.com.ua/buco-retsept-kenii-kava-v-zernakh",
      tags: ["зернова", "фільтр", "яскрава"],
      price: "700 грн / 500г",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["кавомашина", "фільтр", "аеропрес"],
      forTaste: ["фрукти", "ягоди"],
    },
    {
      name: "Зернова кава BUCO «Рецепт Бразилії» 400г",
      desc: "Мікс арабік Бразилії Сантос і Бурбон. М'який солодкуватий смак із пряними нотками та винним відтінком.",
      url: "https://bucocoffee.com.ua/buco-retsept-brazylii",
      tags: ["зернова", "фільтр", "м'яка"],
      price: "635 грн / 400г",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["кавомашина", "фільтр", "french press"],
      forTaste: ["карамель", "горіхи"],
    },
    {
      name: "Зернова кава BUCO «Рецепт Куби» 500г",
      desc: "100% арабіка з Куби та Центральної Америки. Горіх і ароматний шоколад у кожному ковтку.",
      url: "https://bucocoffee.com.ua/buco-retsept-kuby-kava-v-zernakh-arabika-100",
      tags: ["зернова", "еспресо", "100% арабіка"],
      price: "830 грн / 500г",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["кавомашина"],
      forTaste: ["шоколад", "горіхи"],
    },
    {
      name: "Зернова кава BUCO «Рецепт Італії» 1кг",
      desc: "Темне обсмаження, насичений глибокий смак із присмаком гіркого шоколаду. Арабіка 30%, Робуста 70%.",
      url: "https://bucocoffee.com.ua/buco-retsept-italii-kava-v-zernakh",
      tags: ["зернова", "еспресо", "темна обжарка"],
      price: "1300 грн / 1кг",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["кавомашина", "гейзер"],
      forTaste: ["шоколад", "горіхи"],
    },
    {
      name: "Зернова кава BUCO «Рецепт №4» 1кг",
      desc: "Збалансований мікс Бразилії та Колумбії Супремо. Солодкий, винний, пряний смак.",
      url: "https://bucocoffee.com.ua/buco-retsept-4kava-v-zernakh",
      tags: ["зернова", "еспресо", "збалансована"],
      price: "1300 грн / 1кг",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["кавомашина", "фільтр"],
      forTaste: ["карамель", "горіхи"],
    },
    {
      name: "Зернова кава BUCO «Рецепт №5» 1кг",
      desc: "Три сорти арабіки на основі Коста-Ріка Тарразу. Фрукти, цитруси, шоколад із винним присмаком.",
      url: "https://bucocoffee.com.ua/buco-retsept-5kava-v-zernakh",
      tags: ["зернова", "фільтр", "преміум"],
      price: "1500 грн / 1кг",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["кавомашина", "фільтр", "аеропрес"],
      forTaste: ["фрукти", "шоколад"],
    },
    {
      name: "Зернова кава BUCO «Рецепт №6» 1кг",
      desc: "100% арабіка Honduras SHG. Чорний шоколад, фруктовий аромат із нотками апельсину.",
      url: "https://bucocoffee.com.ua/buco-retsept-6kava-v-zernakh",
      tags: ["зернова", "фільтр", "100% арабіка"],
      price: "1600 грн / 1кг",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["фільтр", "аеропрес", "кавомашина"],
      forTaste: ["шоколад", "фрукти"],
    },
    {
      name: "Зернова кава Cafeteria «Рецепт №3» 1кг",
      desc: "Колумбійська арабіка Супремо. Благородний оксамитовий смак із легкою кислинкою фруктового вина.",
      url: "https://bucocoffee.com.ua/cafeteria-retsept-3-kava-v-zernakh",
      tags: ["зернова", "еспресо", "для кав'ярні"],
      price: "1199 грн / 1кг",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["кавомашина"],
      forTaste: ["фрукти", "карамель"],
    },
    {
      name: "Зернова кава «Колумбія без кофеїну» 200г",
      desc: "100% колумбійська арабіка без кофеїну у зернах. Цитруси, зелене яблуко, вишня.",
      url: "https://bucocoffee.com.ua/copy_zernova-kava-buco-kolumbiia-cupremo-bez-kofeinu",
      tags: ["зернова", "без кофеїну"],
      price: "549 грн / 200г",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["будь-яке"],
      forTaste: ["фрукти", "ягоди"],
    },

    /* ── BUCO HIGH SPECIALTY ── */
    {
      name: "Buco High Mexico 250г (зернова)",
      desc: "Мексика Santa Teresa — зелене яблуко, груша, квітковий мед. Висота 1250–1450 м. 100% арабіка.",
      url: "https://bucocoffee.com.ua/buco-high-mexico-zernova-kava-250g",
      tags: ["зернова", "спешелті", "фруктова"],
      price: "579 грн / 250г",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["фільтр", "аеропрес"],
      forTaste: ["фрукти", "ягоди"],
    },
    {
      name: "Buco High Mexico 1кг (зернова)",
      desc: "Мексика Santa Teresa — зелене яблуко, груша, квітковий мед. Натуральна обробка. 100% арабіка.",
      url: "https://bucocoffee.com.ua/meksyka-santa-teresa-buco-high-zernova-kava",
      tags: ["зернова", "спешелті", "фруктова"],
      price: "1799 грн / 1кг",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["фільтр", "аеропрес", "кавомашина"],
      forTaste: ["фрукти", "ягоди"],
    },
    {
      name: "Buco High Salvador 250г (зернова)",
      desc: "Сальвадор Cordillera del Balsamo — горіхи, шоколад, цитрус. Висота 1300–1450 м. 100% арабіка.",
      url: "https://bucocoffee.com.ua/buco-high-salvador-zernova-kava-250-h",
      tags: ["зернова", "спешелті", "збалансована"],
      price: "579 грн / 250г",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["фільтр", "аеропрес", "кавомашина"],
      forTaste: ["горіхи", "шоколад", "фрукти"],
    },
    {
      name: "Buco High Salvador 1кг (зернова)",
      desc: "Сальвадор Cordillera del Balsamo — насичений аромат і збалансований смак. 100% арабіка.",
      url: "https://bucocoffee.com.ua/buco-high-salvador-zernova-kava",
      tags: ["зернова", "спешелті", "збалансована"],
      price: "1799 грн / 1кг",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["фільтр", "аеропрес", "кавомашина"],
      forTaste: ["горіхи", "шоколад", "фрукти"],
    },
    {
      name: "Buco High Mexico 250г (мелена)",
      desc: "Мелена Мексика Santa Teresa — зелене яблуко, груша, квітковий мед. 100% арабіка.",
      url: "https://bucocoffee.com.ua/buco-high-mexico-melena-kava/250g",
      tags: ["мелена", "спешелті", "фруктова"],
      price: "579 грн / 250г",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["фільтр", "аеропрес"],
      forTaste: ["фрукти", "ягоди"],
    },
    {
      name: "Buco High Salvador 250г (мелена)",
      desc: "Мелена Сальвадор Cordillera del Balsamo — горіхи, шоколад, цитрус. 100% арабіка.",
      url: "https://bucocoffee.com.ua/buco-high-salvador-melena-kava",
      tags: ["мелена", "спешелті", "збалансована"],
      price: "579 грн / 250г",
      type: "кава",
      forDev: ["досвідчений"],
      forEquip: ["фільтр", "аеропрес"],
      forTaste: ["горіхи", "шоколад", "фрукти"],
    },
    {
      name: "Buco High Salvador — дріп 5×10г",
      desc: "Сальвадор у дріп-пакетах без обладнання. Горіхи, шоколад, цитрус. 5 пакетів по 10г.",
      url: "https://bucocoffee.com.ua/salvador-cordillera-del-balsamo-buco-high-kava-v-dripakh",
      tags: ["дріп", "спешелті", "без обладнання"],
      price: "260 грн / 5 шт",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["будь-яке"],
      forTaste: ["горіхи", "шоколад", "фрукти"],
    },
    {
      name: "Buco High Mexico — дріп 5×10г",
      desc: "Мексика у дріп-пакетах без обладнання. Зелене яблуко, груша, квітковий мед. 5 пакетів по 10г.",
      url: "https://bucocoffee.com.ua/meksyka-santa-teresa-buco-high-kava-v-dripakh",
      tags: ["дріп", "спешелті", "без обладнання"],
      price: "260 грн / 5 шт",
      type: "кава",
      forDev: ["новачок", "досвідчений"],
      forEquip: ["будь-яке"],
      forTaste: ["фрукти", "ягоди"],
    },
  ];

  PRODUCTS.forEach((p) => {
    // FORMAT
    if (!p.forFormat) {
      if (p.tags.includes("мелена")) p.forFormat = "мелена";
      else if (p.tags.includes("зернова")) p.forFormat = "зернова";
      else if (p.tags.includes("розчинна")) p.forFormat = "розчинна";
      else if (p.tags.includes("дріп")) p.forFormat = "дріп";
      else p.forFormat = "будь-яке";
    }

    // STRENGTH
    if (!p.forStrength) {
      if (p.tags.includes("дріп") || p.tags.includes("розчинна")) {
        p.forStrength = "легка";
      } else if (p.desc.includes("Робуста") || p.tags.includes("еспресо")) {
        p.forStrength = "міцна";
      } else {
        p.forStrength = "середня";
      }
    }

    // ACIDITY
    if (!p.forAcidity) {
      if (p.forTaste.includes("фрукти") || p.forTaste.includes("ягоди")) {
        p.forAcidity = "висока";
      } else if (p.forTaste.includes("шоколад")) {
        p.forAcidity = "низька";
      } else {
        p.forAcidity = "середня";
      }
    }

    // POPULARITY (базова)
    if (!p.popularity) {
      // const priceNum = parseInt((p.price || "").replace(/[^\d]/g, "")) || 0;
      const priceNum = parseInt((p.price || "").split(" ")[0]) || 0;

      if (priceNum <= 300) {
        p.popularity = 5; // масові хіти
      } else if (p.tags.includes("спешелті")) {
        p.popularity = 3; // нішеві
      } else {
        p.popularity = 4;
      }
    }
  });

  /* ───────────────────────────── ДІАЛОГ ───────────────────────────── */
  const FLOW = [
    {
      key: "scenario",
      msg: "Для якого моменту шукаєте каву? ☕",
      opts: [
        "На кожен день",
        "Для бадьорого ранку",
        "Для насолоди",
        "В офіс / для гостей",
      ],
    },
    {
      key: "format",
      msg: "Який формат зручніше?",
      opts: ["Зернова", "Мелена", "Розчинна", "Дріп", "Не важливо"],
    },
    {
      key: "equip",
      msg: "Як готуєте каву?",
      opts: ["Кавомашина або гейзер", "Турка", "Фільтр / френч-прес"],
      condition: (answers) =>
        answers.format !== "Розчинна" && answers.format !== "Дріп",
    },
    {
      key: "strength",
      msg: "Яку міцність любите?",
      opts: ["Легка", "Середня", "Міцна"],
    },
    {
      key: "taste",
      msg: "Який смак вам ближче?",
      opts: [
        "Шоколад і горіхи",
        "Фрукти та ягоди",
        "Карамель",
        "Квіти",
        "Вино та ферментовані нотки",
        "Не знаю — здивуйте!",
      ],
    },
    {
      key: "level",
      msg: "Який у вас досвід?",
      opts: ["Новачок", "Досвідчений"],
    },
    // 🔥 НОВИЙ БЛОК
    {
      key: "acidity",
      msg: "Якій кислотності кави ви віддаєте перевагу?",
      opts: ["Низька", "Середня", "Висока"],
      condition: (answers) => answers.level === "Досвідчений",
    },
    {
      key: "budget",
      msg: "Який бюджет?",
      opts: ["До 300 грн", "300–600 грн", "Від 600 грн", "Не важливо"],
    },
  ];

  const EQUIP_MAP = {
    "Кавомашина або гейзер": "кавомашина",
    Турка: "турка",
    "Фільтр / френч-прес": "фільтр",
  };

  const TASTE_MAP = {
    "Шоколад і горіхи": ["шоколад", "горіхи"],
    "Фрукти та ягоди": ["фрукти", "ягоди"],
    Карамель: ["карамель"],
    Квіти: ["квіти"],
    "Вино та ферментовані нотки": ["вино"],
    "Не знаю — здивуйте!": ["any"],
  };

  const LEVEL_MAP = {
    Новачок: "новачок",
    Досвідчений: "досвідчений",
  };

  const BUDGET_MAP = {
    "До 300 грн": { min: 0, max: 300 },
    "300–600 грн": { min: 300, max: 600 },
    "Від 600 грн": { min: 600, max: 99999 },
    "Не важливо": { min: 0, max: 99999 },
  };

  const FORMAT_MAP = {
    Зернова: "зернова",
    Мелена: "мелена",
    Розчинна: "розчинна",
    Дріп: "дріп",
    "Не важливо": "будь-яке",
  };

  const STRENGTH_MAP = {
    Легка: "легка",
    Середня: "середня",
    Міцна: "міцна",
  };

  const SCENARIO_MAP = {
    "На кожен день": "daily",
    "Для бадьорого ранку": "morning",
    "Для насолоди": "enjoy",
    "В офіс / для гостей": "office",
  };

  const ACIDITY_MAP = {
    Низька: "низька",
    Середня: "середня",
    Висока: "висока",
  };
  /* ───────────────────────────── HTML ───────────────────────────── */
  const root = document.createElement("div");
  root.id = "buco-agent-root";
  root.innerHTML = `
<button id="buco-fab" title="Підібрати каву">
  <img src="https://i.postimg.cc/x11sMM0p/walking-Owl-Buco.png" alt="Buco" />
  <span class="buco-badge">AI</span>
</button>
<div id="buco-window">
  <div class="buco-header">
    <div class="buco-logo">
  <img src="https://i.postimg.cc/x11sMM0p/walking-Owl-Buco.png" alt="Buco" />
</div>
    <div style="display:flex; align-items:center; gap:6px; flex:1; min-width:0;">
  <div class="buco-header-text">
    <h3>Buco експерт </h3>
    <p>Підбір кави за вашим смаком</p>
  </div>
  <div class="buco-dot"></div>
</div>
<button class="buco-close" id="buco-close-btn">✕</button>
  </div>
  <div class="buco-msgs" id="buco-msgs"></div>
  <div class="buco-input-row">
    <input class="buco-input" id="buco-input" placeholder="Напишіть запитання..." />
    <button class="buco-send" id="buco-send-btn">
      <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
    </button>
  </div>
</div>
  `;
  document.body.appendChild(root);

  /* ───────────────────────────── ЛОГІКА ───────────────────────────── */
  const fab = document.getElementById("buco-fab");
  const win = document.getElementById("buco-window");
  const msgsEl = document.getElementById("buco-msgs");
  const inputEl = document.getElementById("buco-input");
  const sendBtn = document.getElementById("buco-send-btn");
  const closeBtn = document.getElementById("buco-close-btn");

  let step = 0,
    answers = {},
    started = false;

  fab.addEventListener("click", () => {
    win.classList.toggle("open");
    if (win.classList.contains("open") && !started) {
      started = true;
      setTimeout(() => addAI(FLOW[0].msg, FLOW[0].opts), 500);
    }
  });
  closeBtn.addEventListener("click", () => win.classList.remove("open"));
  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });

  function scroll() {
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function addAI(text, opts) {
    const label = document.createElement("div");
    label.className = "buco-label";
    label.textContent = "Buco експерт ";
    msgsEl.appendChild(label);

    const el = document.createElement("div");
    el.className = "buco-msg buco-ai";
    el.innerHTML = text;
    msgsEl.appendChild(el);

    if (opts) {
      const wrap = document.createElement("div");
      wrap.className = "buco-opts";
      const curStep = step;
      opts.forEach((o) => {
        const btn = document.createElement("button");
        btn.className = "buco-opt";
        btn.textContent = o;
        btn.addEventListener("click", () => selectOpt(o, wrap, curStep));
        wrap.appendChild(btn);
      });
      msgsEl.appendChild(wrap);
    }
    scroll();
  }

  function addUser(text) {
    const el = document.createElement("div");
    el.className = "buco-msg buco-user";
    // el.innerHTML = text;
    el.textContent = text;
    msgsEl.appendChild(el);
    scroll();
  }

  function showTyping() {
    const t = document.createElement("div");
    t.className = "buco-typing";
    t.id = "buco-typing";
    t.innerHTML = "<span></span><span></span><span></span>";
    msgsEl.appendChild(t);
    scroll();
  }
  function hideTyping() {
    const t = document.getElementById("buco-typing");
    if (t) t.remove();
  }

  function selectOpt(val, wrap, flowStep) {
    Array.from(wrap.querySelectorAll(".buco-opt")).forEach(
      (b) => (b.disabled = true),
    );

    addUser(val);

    const key = FLOW[flowStep].key;
    answers[key] = val;

    step = flowStep + 1;

    // 🔥 пропускаємо кроки з condition = false
    while (
      step < FLOW.length &&
      FLOW[step].condition &&
      !FLOW[step].condition(answers)
    ) {
      step++;
    }

    setTimeout(() => {
      showTyping();
      setTimeout(() => {
        hideTyping();

        if (step < FLOW.length) {
          addAI(FLOW[step].msg, FLOW[step].opts);
        } else {
          showResult();
        }
      }, 900);
    }, 250);
  }

  function showResult() {
    const tastes = TASTE_MAP[answers.taste] || ["any"];
    const format = FORMAT_MAP[answers.format] || "будь-яке";
    const strength = STRENGTH_MAP[answers.strength];
    const scenario = SCENARIO_MAP[answers.scenario];
    const equip = EQUIP_MAP[answers.equip] || "будь-яке";
    const level = LEVEL_MAP[answers.level] || "новачок";
    const acidity = ACIDITY_MAP[answers.acidity] || null;
    const budget = BUDGET_MAP[answers.budget] || { min: 0, max: 99999 };

    const scored = PRODUCTS.map((p) => {
      let s = 0; // 👈 ОБОВʼЯЗКОВО ПЕРШИМ
      // const priceNum = parseInt((p.price || "").replace(/[^\d]/g, "") || 0);
      const priceNum = parseInt((p.price || "").split(" ")[0]) || 0;
      // const priceNum = parseInt(p.price.split(" ")[0]);

      // ❗ ЖОРСТКИЙ ФІЛЬТР ФОРМАТУ
      if (format !== "будь-яке" && p.forFormat !== format) {
        return { ...p, s: -999 };
      }
      //  Не жорсткий фільтр формату
      // if (format !== "будь-яке" && p.forFormat !== format) {
      //   s -= 3;
      // }

      // ❗ ЖОРСТКИЙ ФІЛЬТР БЮДЖЕТУ
      if (priceNum < budget.min || priceNum > budget.max) {
        return { ...p, s: -999 };
      }

      // Смак (пріоритет)
      if (tastes[0] === "any" || p.forTaste?.some((t) => tastes.includes(t))) {
        s += 5;
      }

      // Міцність
      if (p.forStrength === strength) {
        s += 3;
      }

      // Кислотність (якщо є)
      if (acidity) {
        if (p.forAcidity === acidity) s += 4;
      } else {
        // нічого не робити
      }

      // Обладнання
      if (equip === "будь-яке") {
        s += 2;
      } else if (p.forEquip.includes(equip)) {
        s += 3;
      } else {
        s -= 1;
      }

      // Формат
      // if (format === "будь-яке" || p.forFormat === format) {
      //   s += 2;
      // }
      // if (p.forFormat === format) {
      //   s += 5;
      // }

      // Рівень
      if (p.forDev.includes(level)) {
        s += 1;
      }

      // Сценарій (модифікатор)
      if (scenario === "morning" && p.forStrength === "міцна") s += 2;
      if (
        scenario === "office" &&
        (p.forFormat === "розчинна" || p.forFormat === "дріп")
      )
        s += 2;
      if (scenario === "enjoy" && p.tags?.includes("спешелті")) s += 2;
      if (scenario === "daily" && priceNum < 400) s += 1;

      // popularity (тай-брейкер)
      s += Math.min(p.popularity || 0, 3) * 0.5;

      return { ...p, s };
    });

    // const strict = scored.filter((p) => p.s > 0);

    // const hasFormat = PRODUCTS.some(
    //   (p) => format === "будь-яке" || p.forFormat === format,
    // );

    // const hasBudget = PRODUCTS.some((p) => {
    //   const priceNum = parseInt((p.price || "").split(" ")[0]) || 0;
    //   return priceNum >= budget.min && priceNum <= budget.max;
    // });

    // // ❗ ЖОРСТКИЙ STOP ЛОГІКИ
    // if (!strict.length) {
    //   let msg = document.createElement("div");
    //   msg.className = "buco-msg buco-ai";

    //   if (!hasFormat) {
    //     msg.textContent = "У нас немає кави у цьому форматі ☕";
    //   } else if (!hasBudget) {
    //     msg.textContent = "У цьому бюджеті немає доступних варіантів ☕";
    //   } else {
    //     msg.textContent =
    //       "Не знайдено точного збігу ☕ Спробуйте змінити смак або міцність";
    //   }

    //   msgsEl.appendChild(msg);

    //   const restart = document.createElement("button");
    //   restart.className = "buco-restart";
    //   restart.textContent = "↩ Почати підбір знову";
    //   restart.addEventListener("click", restartFlow);
    //   msgsEl.appendChild(restart);

    //   return;
    // }

    // Блок перевірки
    const strict = scored.filter((p) => p.s > 0);

    if (!strict.length) {
      const msg = document.createElement("div");
      msg.className = "buco-msg buco-ai";

      // Перевіряємо формат і бюджет ТІЛЬКИ серед товарів потрібного формату
      const formatProducts = PRODUCTS.filter(
        (p) => format === "будь-яке" || p.forFormat === format,
      );

      const hasBudgetInFormat = formatProducts.some((p) => {
        const priceNum = parseInt((p.price || "").split(" ")[0]) || 0;
        return priceNum >= budget.min && priceNum <= budget.max;
      });

      if (formatProducts.length === 0) {
        msg.textContent = "У нас немає кави у цьому форматі ☕";
      } else if (!hasBudgetInFormat) {
        msg.textContent = `У нас відсутня ${answers.format.toLowerCase()} кава в цьому бюджеті ☕ Спробуйте змінити бюджет.`;
      } else {
        msg.textContent =
          "Не знайдено точного збігу. Спробуйте змінити смак або міцність 🙂";
      }

      msgsEl.appendChild(msg);

      const restart = document.createElement("button");
      restart.className = "buco-restart";
      restart.textContent = "↩ Почати підбір знову";
      restart.addEventListener("click", restartFlow);
      msgsEl.appendChild(restart);
      return;
    }
    // fallback
    let filtered = scored.filter((p) => p.s > 0);

    // 1. якщо нічого — пробуємо М’ЯКИЙ фільтр (зберігаємо формат)
    // if (!filtered.length) {
    //   filtered = PRODUCTS.map((p) => {
    //     const priceNum = parseInt((p.price || "").split(" ")[0]) || 0;
    //     let s = p.popularity || 0;
    //     if (format !== "будь-яке" && p.forFormat !== format) {
    //       s -= 3;
    //     }
    //     // бюджет не блокує, тільки штраф
    //     if (priceNum < budget.min || priceNum > budget.max) {
    //       s -= 1;
    //     }

    //     return { ...p, s };
    //   }).filter(Boolean);
    // }

    if (!filtered.length) {
      filtered = PRODUCTS.filter((p) => {
        const priceNum = parseInt((p.price || "").split(" ")[0]) || 0;
        return (
          (format === "будь-яке" || p.forFormat === format) &&
          priceNum >= budget.min &&
          priceNum <= budget.max
        );
      }).map((p) => ({ ...p, s: p.popularity || 0 }));
    }

    // 2. якщо все ще пусто — гарантуємо формат
    if (!filtered.length) {
      filtered = PRODUCTS.filter(
        (p) => format === "будь-яке" || p.forFormat === format,
      ).map((p) => ({
        ...p,
        s: p.popularity || 0,
      }));
    }

    // 3. якщо навіть це пусто — fallback на все
    if (!filtered.length) {
      filtered = PRODUCTS.map((p) => ({
        ...p,
        s: p.popularity || 0,
      }));
    }

    let final = filtered.sort((a, b) => b.s - a.s);

    // 👇 ДАЛІ ТВОЯ ЛОГІКА БЕЗ ЗМІН
    let top = [...new Map(final.map((p) => [p.name, p])).values()].slice(0, 3);

    if (top.length < 3) {
      top = final.slice(0, 5);
    }

    if (answers.taste === "Не знаю — здивуйте!") {
      const pool = PRODUCTS.filter(
        (p) =>
          p.popularity >= 4 &&
          (format === "будь-яке" || p.forFormat === format),
      );

      top = pool
        .sort(() => 0.5 - Math.random()) // випадковість
        .slice(0, 3);
    }

    const label = document.createElement("div");
    label.className = "buco-label";
    label.textContent = "Buco експерт";
    msgsEl.appendChild(label);

    const intro = document.createElement("div");
    intro.className = "buco-msg buco-ai";
    intro.textContent =
      top.length > 0
        ? `Підібрав для вас ${top.length} варіанти ☕ Ось мої рекомендації:`
        : "На жаль, не знайшов ідеального варіанту під ваші критерії. Спробуйте змінити бюджет або смак 🙂";
    msgsEl.appendChild(intro);

    top.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "buco-card";
      const productUrl = p.url || "https://bucocoffee.com.ua/";
      card.innerHTML = `<h4><a href="${productUrl}" target="_blank" style="color:#7c3c1a;text-decoration:none;">${i === 0 ? "⭐ " : ""}${p.name}</a></h4><p>${p.desc}</p><span class="buco-tag" style="background:#3d1f0d;color:#fff8f0;border-color:#3d1f0d">${p.price}</span>${p.tags.map((t) => `<span class="buco-tag">${t}</span>`).join("")}<br><a href="${productUrl}" target="_blank" style="display:inline-block;margin-top:8px;background:#c97b3a;color:#fff;border-radius:12px;padding:5px 14px;font-size:12px;text-decoration:none;">Перейти до товару →</a>`;
      msgsEl.appendChild(card);
    });

    const outro = document.createElement("div");
    outro.className = "buco-msg buco-ai";
    outro.style.marginTop = "4px";
    outro.textContent = "Є питання про будь-який сорт? Напишіть мені! 🙂";
    msgsEl.appendChild(outro);

    const restart = document.createElement("button");
    restart.className = "buco-restart";
    restart.textContent = "↩ Почати підбір знову";
    restart.addEventListener("click", restartFlow);
    msgsEl.appendChild(restart);

    scroll();
  }

  function handleSend() {
    const val = inputEl.value.trim();
    if (!val) return;
    inputEl.value = "";
    addUser(val);
    setTimeout(() => {
      showTyping();
      setTimeout(() => {
        hideTyping();
        addAI(getReply(val));
      }, 950);
    }, 200);
  }

  function getReply(text) {
    const t = text.toLowerCase();

    if (/цін|скільки|вартість|цена|стоимость|почем/.test(t))
      return 'Ціни вказані під кожним товаром.<br>Для замовлення зателефонуйте<br><a href="tel:+380502678614">+38 (050) 267 8614</a> нашому менеджеру!';

    if (/доставк|доставка|відправк|нова пошта/.test(t))
      return "Доставка по всій Україні — Нова Пошта. Термін: 1–3 дні. Безкоштовна доставка для замовлень від 1500 грн.";

    if (/знижк|акція|акції|промокод|скидк|скидка|акция/.test(t))
      return 'Підпишіться на розсилку на сайті <a href="https://bucocoffee.com.ua/" target="_blank">bucocoffee.com.ua</a> або у Buco-боті <a href="https://t.me/bucocoffee_bot" target="_blank">bucocoffee_bot</a>, щоб першими дізнаватися про акції та нові надходження!';

    if (/помел|молот|помол/.test(t))
      return "Можемо змолоти каву під ваше обладнання! Просто вкажіть тип пристрою при замовленні.";

    if (/підписк|абонемент|щомісяц|подписк/.test(t))
      return 'Кавова підписка — щомісячна доставка свіжообсмаженої кави до вашого дому! Деталі у нашого менеджера <a href="tel:+380502678614">+38 (050) 267 8614</a>.';

    if (/обжарк|свіж|дата|обжарка|свежа/.test(t))
      return "Ми обсмажуємо нову партію свіжо щодня.<br>Дата обжарки завжди вказана на упаковці.";

    if (/склад|состав|інгредієнт/.test(t))
      return "Склад вказаний на упаковці кожного товару. Всі наші кави — 100% натуральні, без добавок.";

    if (/як замовит|як купит|оформит|заказат|замовлення|заказ/.test(t))
      return 'Замовити можна на сайті <a href="https://bucocoffee.com.ua/" target="_blank">bucocoffee.com.ua</a> або зателефонувавши нам<br><a href="tel:+380502678614">+38 (050) 267 8614</a>.';

    if (/привіт|привет|добрий|добрый|вітаю|здравствуй|hello|hi/.test(t))
      return "Вітаю! ☕ Радий вас бачити! Можу допомогти підібрати каву або відповісти на запитання.";

    if (/дякую|спасибо|дякі|спс|thanks/.test(t))
      return "Завжди радий допомогти! ☕ Гарної Вам кави!";

    if (/кава|кофе|coffee|сорт|вид|різновид/.test(t))
      return "Щоб підібрати каву — натисніть кнопку<br>«↩ Почати підбір знову» або напишіть що саме вас цікавить!";

    return 'Дякую за питання! Для детальної консультації звертайтесь до нас за телефоном<br><a href="tel:+380502678614">+38 (050) 267 8614</a> або в Instagram <a href="https://www.instagram.com/buco_coffee/">@buco_coffee</a> 😊';
  }

  function restartFlow() {
    step = 0;
    answers = {};
    msgsEl.innerHTML = "";
    setTimeout(() => addAI(FLOW[0].msg, FLOW[0].opts), 400);
  }
})();
