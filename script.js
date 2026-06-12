
  fundingGoal: 480000,
  currentRaised: 312500,
  marketingBudgetPercentOfGoal: 28,
  pledgeTiers: [
  productionMilestones: [
    {
      title: "早餐情報員",
      amount: 25,
      reward: "電子感謝名單、角色訊息包與限定桌布"
      title: "概念預告片",
      amount: 120000,
      description: "完成主視覺、前導預告、聲音設計與剪輯包裝"
    },
    {
      title: "超市掩護者",
      amount: 80,
      reward: "概念預告搶先看、導演文字場記與角色語音"
      title: "動作設計預演",
      amount: 95000,
      description: "超市、廚房、罐頭工廠三場動作戲排練與測拍"
    },
    {
      title: "蜂蜜芥末同盟",
      amount: 180,
      reward: "線上幕後直播、動作設計分鏡 PDF 與海報套組"
      title: "美術與場景開發",
      amount: 110000,
      description: "家庭廚房、地下軍火庫、廢棄工廠場景概念建置"
    },
    {
      title: "罐頭工廠行動組",
      amount: 520,
      reward: "片尾鳴謝、限定劇照、製片會議觀摩席"
      title: "首波行銷素材",
      amount: 134400,
      description: "角色文本互動、社群短影音、媒體曝光與贊助者活動規劃"
    }
  ],
  marketingBudget: [
  }
];

let raisedAmount = campaignConfig.currentRaised;
let activeThread = characterThreads[0];

const currencyFormatter = new Intl.NumberFormat("en-US", {
}

function renderFunding() {
  const percent = Math.min(100, Math.round((raisedAmount / campaignConfig.fundingGoal) * 100));
  document.querySelector("#raisedAmount").textContent = formatMoney(raisedAmount);
  const percent = Math.min(100, Math.round((campaignConfig.currentRaised / campaignConfig.fundingGoal) * 100));
  document.querySelector("#raisedAmount").textContent = formatMoney(campaignConfig.currentRaised);
  document.querySelector("#goalAmount").textContent = formatMoney(campaignConfig.fundingGoal);
  document.querySelector("#fundingPercent").textContent = `${percent}%`;
  document.querySelector("#fundingBar").style.width = `${percent}%`;
}

function renderTiers() {
  const tierGrid = document.querySelector("#tierGrid");
  tierGrid.innerHTML = "";
function renderMilestones() {
  const milestoneGrid = document.querySelector("#milestoneGrid");
  milestoneGrid.innerHTML = "";

  campaignConfig.pledgeTiers.forEach((tier) => {
    const button = document.createElement("button");
    button.className = "tier-card";
    button.type = "button";
    button.innerHTML = `
      <small>${formatMoney(tier.amount)}</small>
      <strong>${tier.title}</strong>
      <span>${tier.reward}</span>
  campaignConfig.productionMilestones.forEach((milestone) => {
    const card = document.createElement("article");
    card.className = "tier-card";
    card.innerHTML = `
      <small>${formatMoney(milestone.amount)}</small>
      <strong>${milestone.title}</strong>
      <span>${milestone.description}</span>
    `;
    button.addEventListener("click", () => {
      raisedAmount += tier.amount;
      renderFunding();
      appendMessage("user", `我加入「${tier.title}」贊助。`);
      appendMessage("role", `克拉拉已收到資金訊號：${formatMoney(tier.amount)}。下一步，將它轉化成預告片火力。`);
    });
    tierGrid.appendChild(button);
    milestoneGrid.appendChild(card);
  });
}

}

renderFunding();
renderTiers();
renderMilestones();
renderCharacters();
renderConversation();
renderBudget();
