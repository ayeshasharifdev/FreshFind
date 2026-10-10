const chatCard = document.getElementById("chatbotCard");
const chatBody = document.getElementById("chatBody");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const typing = document.getElementById("typing");
const floatingBot = document.getElementById("floatingBot");
const mobileToggle = document.getElementById("mobileToggle");

const answers = {
    "Which markets are open today?":
        "Here are some farmers’ markets open today in Karachi: Clifton Farmers Market, Gulshan Farmers Market and Saddar Farmers Market. I can also help you find one near your area.",
    "Find markets near DHA Karachi":
        "For DHA Karachi, try checking markets around Clifton, DHA Phase 6 and nearby local produce stalls. Tell me your DHA phase and I can narrow the suggestions down.",
    "What's in season in September?":
        "September is a great month for seasonal produce such as guava, bananas, papaya, okra, tomatoes, eggplant and several leafy greens in Pakistan.",
    "Show me all vegetable markets":
        "I can help you explore vegetable markets in Karachi. Popular areas include Clifton, Gulshan-e-Iqbal, Saddar and DHA.",
    "Where can I buy fresh strawberries?":
        "Fresh strawberries are usually more seasonal in Pakistan. For the freshest options, check larger farmers’ markets and produce sellers, and look for locally sourced stock.",
    "What are the market timings?":
        "Market timings vary by location. Many farmers’ markets open in the morning, commonly around 7:00–8:00 AM, and close around noon or afternoon.",
    "Seasonal Produce":
        "Ask me about any month or fruit and vegetable, and I’ll show you seasonal produce information.",
    "Market Directory":
        "I can help you find markets by area, including DHA, Clifton, Gulshan-e-Iqbal and Saddar.",
    "Other Question":
        "Sure! Type your question below and I’ll help you with FreshFind information."
};

function scrollChat() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addMessage(text, type = "user") {
    const message = document.createElement("div");
    message.className = `message ${type}`;

    if (type === "user") {
        message.innerHTML = `<div class="bubble"></div><time>${getTime()}</time>`;
        message.querySelector(".bubble").textContent = text;
    } else {
        message.innerHTML = `
            <div class="mini-avatar"><i class="fa-solid fa-robot"></i></div>
            <div><div class="bubble"></div><time>${getTime()}</time></div>
        `;
        message.querySelector(".bubble").textContent = text;
    }

    chatBody.insertBefore(message, typing);
    scrollChat();
}

function getTime() {
    return new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
}

function botReply(question) {
    const clean = question.trim();

    if (answers[clean]) return answers[clean];

    const lower = clean.toLowerCase();

    if (lower.includes("dha")) return answers["Find markets near DHA Karachi"];
    if (lower.includes("season") || lower.includes("september")) return answers["What's in season in September?"];
    if (lower.includes("timing") || lower.includes("time") || lower.includes("open")) return answers["What are the market timings?"];
    if (lower.includes("strawber")) return answers["Where can I buy fresh strawberries?"];
    if (lower.includes("market")) return answers["Market Directory"];

    return "I can help with Karachi farmers’ markets, market timings, seasonal produce and FreshFind pages. Try asking about a market, location or fruit/vegetable.";
}

function askQuestion(question) {
    if (!question.trim()) return;

    chatCard.classList.remove("minimized", "closed");
    addMessage(question, "user");

    typing.classList.remove("hidden");
    scrollChat();

    setTimeout(() => {
        typing.classList.add("hidden");
        addMessage(botReply(question), "bot");
    }, 700);
}

document.querySelectorAll("[data-question]").forEach(button => {
    button.addEventListener("click", () => askQuestion(button.dataset.question));
});

chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const value = chatInput.value.trim();
    if (!value) return;
    chatInput.value = "";
    askQuestion(value);
});

document.getElementById("minimizeChat").addEventListener("click", () => {
    chatCard.classList.toggle("minimized");
});

document.getElementById("closeChat").addEventListener("click", () => {
    chatCard.classList.add("closed");
});

floatingBot.addEventListener("click", () => {
    chatCard.classList.remove("closed", "minimized");
    document.querySelector(".chat-section").scrollIntoView({behavior:"smooth", block:"center"});
    setTimeout(() => chatInput.focus(), 500);
});

mobileToggle.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("show");
});

/* Demo conversation shown in the reference design */
setTimeout(() => {
    document.getElementById("demoUserMessage").classList.remove("hidden");
    document.getElementById("demoBotMessage").classList.remove("hidden");
    scrollChat();
}, 900);


/* ------------------------------
   EXTRA PAGE INTERACTIONS
------------------------------ */

const searchButton = document.getElementById("searchButton");
const favoriteButton = document.getElementById("favoriteButton");
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");

function toast(message) {
    let box = document.getElementById("freshToast");
    if (!box) {
        box = document.createElement("div");
        box.id = "freshToast";
        box.className = "fresh-toast";
        document.body.appendChild(box);
    }
    box.textContent = message;
    box.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => box.classList.remove("show"), 2600);
}

searchButton?.addEventListener("click", () => {
    const term = prompt("What would you like to find?");
    if (!term) return;

    const q = term.toLowerCase();

    if (q.includes("market")) {
        document.getElementById("market-directory")?.scrollIntoView({behavior:"smooth"});
        return;
    }

    if (q.includes("produce") || q.includes("fruit") || q.includes("vegetable")) {
        document.getElementById("produce-guide")?.scrollIntoView({behavior:"smooth"});
        return;
    }

    chatCard.classList.remove("closed", "minimized");
    document.getElementById("chatbot")?.scrollIntoView({behavior:"smooth", block:"center"});
    setTimeout(() => {
        chatInput.value = term;
        chatInput.focus();
    }, 500);
});

favoriteButton?.addEventListener("click", () => {
    const active = favoriteButton.classList.toggle("saved");
    favoriteButton.innerHTML = active
        ? '<i class="fa-solid fa-heart"></i>'
        : '<i class="fa-regular fa-heart"></i>';
    toast(active ? "FreshFind saved to your favorites." : "Removed from favorites.");
});

loginButton?.addEventListener("click", e => {
    e.preventDefault();
    toast("Login page is ready to connect to your authentication system.");
});

signupButton?.addEventListener("click", e => {
    e.preventDefault();
    toast("Sign Up page is ready to connect to your registration system.");
});

document.querySelectorAll(".panel-chat-btn[data-question]").forEach(btn => {
    btn.addEventListener("click", () => {
        askQuestion(btn.dataset.question);
        document.getElementById("chatbot")?.scrollIntoView({behavior:"smooth", block:"center"});
    });
});

newsletterForm?.addEventListener("submit", e => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();

    if (!email || !newsletterEmail.checkValidity()) {
        newsletterEmail.reportValidity();
        return;
    }

    localStorage.setItem("freshfindNewsletterEmail", email);
    newsletterEmail.value = "";
    toast("You're subscribed to FreshFind updates!");
});

document.querySelectorAll(".nav-links a, .footer a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links")?.classList.remove("show");
    });
});

window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        document.querySelector(".nav-links")?.classList.remove("show");
    }
});
