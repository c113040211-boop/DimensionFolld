const campaignConfig = {
  currency: "USD",
  fundingGoal: 480000,
  currentRaised: 312500,
  marketingBudgetPercentOfGoal: 28,
  productionMilestones: [
    {
      title: "概念預告片",
      amount: 120000,
      description: "完成主視覺、前導預告、聲音設計與剪輯包裝"
    },
    {
      title: "動作設計預演",
      amount: 95000,
      description: "超市、廚房、罐頭工廠三場動作戲排練與測拍"
    },
    {
      title: "美術與場景開發",
      amount: 110000,
      description: "家庭廚房、地下軍火庫、廢棄工廠場景概念建置"
    },
    {
      title: "首波行銷素材",
      amount: 134400,
      description: "角色文本互動、社群短影音、媒體曝光與贊助者活動規劃"
    }
  ],
  marketingBudget: [
    {
      label: "社群短影音與廣告投放",
      percent: 34,
      color: "#c95746"
    },
    {
      label: "概念預告與動作素材製作",
      percent: 26,
      color: "#e1ab4f"
    },
    {
      label: "角色文本互動與網站維運",
      percent: 18,
      color: "#42556a"
    },
    {
      label: "媒體公關與影展市場曝光",
      percent: 14,
      color: "#6f7a4f"
    },
    {
      label: "贊助者活動與周邊樣品",
      percent: 8,
      color: "#202326"
    }
  ]
};

const characterThreads = [
  {
    id: "clara",
    name: "Clara Jensen",
    tag: "完美妻子 / 前幽靈王牌",
    status: "狀態：早餐前 7 分鐘解除危機",
    intro: "鬆餅糊已經拌好。窗外那台無人機也已經進入平底鍋射程。你要我先處理哪一件事？",
    replies: [
      {
        text: "維持微笑，先問早餐口味。",
        answer: "好選擇。微笑能降低敵方警戒 42%，草莓口味則能穩定家庭士氣。"
      },
      {
        text: "切換沉穩專業模式。",
        answer: "收到。左手關瓦斯，右手鎖定窗框反光點。請不要踩到剛拖好的地板。"
      },
      {
        text: "把平底鍋交給觀眾投票。",
        answer: "互動活動已建立：平底鍋、吸塵器、冷凍法棍三選一。法棍目前領先。"
      }
    ]
  },
  {
    id: "husband",
    name: "Daniel Jensen",
    tag: "保險精算師 / 意外誘餌",
    status: "狀態：正在重新理解婚姻",
    intro: "我只是想知道，地下室洗衣機下面為什麼有夜視鏡、護照和一把標著生日蠟燭的匕首？",
    replies: [
      {
        text: "告訴他那是媽媽極限體能班。",
        answer: "他沉默了 3 秒，然後問：所以會員費可以報稅嗎？"
      },
      {
        text: "坦白密碼本的危險。",
        answer: "他開始顫抖，但仍記得問晚餐要不要加洋蔥。這段婚姻有希望。"
      },
      {
        text: "邀請他成為募資代言人。",
        answer: "他同意了，條件是宣傳照不能拿著引爆線。這很合理。"
      }
    ]
  },
  {
    id: "neighbor",
    name: "New Neighbor",
    tag: "高階特務 / 烤肉派對入侵者",
    status: "狀態：假裝喜歡蜂蜜芥末醬",
    intro: "克拉拉，妳家的廚房刀具看起來很專業。妳以前學過料理，還是別的什麼？",
    replies: [
      {
        text: "端出蜂蜜芥末醬。",
        answer: "你用調味碟擋下試探。客廳沒有人發現刀尖擦過陶瓷盤。"
      },
      {
        text: "稱讚他的烤肉火候。",
        answer: "對方放鬆了半秒。半秒足夠卸掉短刀，也足夠翻面雞翅。"
      },
      {
        text: "邀請他參與角色互動活動。",
        answer: "他被迫填寫電子報。犯罪集團沒有準備好面對轉換率追蹤。"
      }
    ]
  }
];

let activeThread = characterThreads[0];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: campaignConfig.currency,
  maximumFractionDigits: 0
});

function formatMoney(value) {
  return currencyFormatter.format(value);
}

function renderFunding() {
  const percent = Math.min(100, Math.round((campaignConfig.currentRaised / campaignConfig.fundingGoal) * 100));
  document.querySelector("#raisedAmount").textContent = formatMoney(campaignConfig.currentRaised);
  document.querySelector("#goalAmount").textContent = formatMoney(campaignConfig.fundingGoal);
  document.querySelector("#fundingPercent").textContent = `${percent}%`;
  document.querySelector("#fundingBar").style.width = `${percent}%`;
}

function renderMilestones() {
  const milestoneGrid = document.querySelector("#milestoneGrid");
  milestoneGrid.innerHTML = "";

  campaignConfig.productionMilestones.forEach((milestone) => {
    const card = document.createElement("article");
    card.className = "tier-card";
    card.innerHTML = `
      <small>${formatMoney(milestone.amount)}</small>
      <strong>${milestone.title}</strong>
      <span>${milestone.description}</span>
    `;
    milestoneGrid.appendChild(card);
  });
}

function appendMessage(type, text) {
  const messageFeed = document.querySelector("#messageFeed");
  const bubble = document.createElement("div");
  bubble.className = `bubble ${type}`;
  bubble.textContent = text;
  messageFeed.appendChild(bubble);
  messageFeed.scrollTop = messageFeed.scrollHeight;
}

function renderCharacters() {
  const characterList = document.querySelector("#characterList");
  characterList.innerHTML = "";

  characterThreads.forEach((thread) => {
    const button = document.createElement("button");
    button.className = `character-button${thread.id === activeThread.id ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `${thread.name}<small>${thread.tag}</small>`;
    button.addEventListener("click", () => {
      activeThread = thread;
      renderCharacters();
      renderConversation();
    });
    characterList.appendChild(button);
  });
}

function renderConversation() {
  document.querySelector("#activeRole").textContent = activeThread.name;
  document.querySelector("#activeStatus").textContent = activeThread.status;
  document.querySelector("#messageFeed").innerHTML = "";
  appendMessage("role", activeThread.intro);

  const replyGrid = document.querySelector("#replyGrid");
  replyGrid.innerHTML = "";
  activeThread.replies.forEach((reply) => {
    const button = document.createElement("button");
    button.className = "reply-button";
    button.type = "button";
    button.textContent = reply.text;
    button.addEventListener("click", () => {
      appendMessage("user", reply.text);
      window.setTimeout(() => appendMessage("role", reply.answer), 260);
    });
    replyGrid.appendChild(button);
  });
}

function renderBudget() {
  const marketingShare = campaignConfig.marketingBudgetPercentOfGoal;
  const marketingTotal = campaignConfig.fundingGoal * (marketingShare / 100);
  const budgetList = document.querySelector("#budgetList");
  const donutStops = [];
  let current = 0;

  document.querySelector("#marketingShare").textContent = `${marketingShare}%`;
  budgetList.innerHTML = "";

  campaignConfig.marketingBudget.forEach((item) => {
    const next = current + item.percent;
    donutStops.push(`${item.color} ${current}% ${next}%`);
    current = next;

    const row = document.createElement("article");
    row.className = "budget-item";
    row.innerHTML = `
      <div>
        <strong>${item.label}</strong>
        <span>${formatMoney(marketingTotal * (item.percent / 100))}</span>
      </div>
      <b>${item.percent}%</b>
      <div class="budget-meter" aria-hidden="true">
        <i style="--width: ${item.percent}%; --color: ${item.color};"></i>
      </div>
    `;
    budgetList.appendChild(row);
  });

  document.querySelector("#budgetDonut").style.background = `conic-gradient(${donutStops.join(", ")})`;
}

renderFunding();
renderMilestones();
renderCharacters();
renderConversation();
renderBudget();
