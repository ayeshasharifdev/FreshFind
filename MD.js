/* =========================================
   MARKET DIRECTORY JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("marketsGrid");
    const cards = [...document.querySelectorAll(".market-card")];

    const searchInput = document.getElementById("marketSearch");
    const clearSearch = document.getElementById("clearSearch");

    const areaFilter = document.getElementById("areaFilter");
    const dayFilter = document.getElementById("dayFilter");
    const produceFilter = document.getElementById("produceFilter");
    const sortFilter = document.getElementById("sortFilter");

    const applyButton = document.getElementById("applyFilters");
    const filterCount = document.getElementById("filterCount");

    const resultCount = document.getElementById("resultCount");
    const noResults = document.getElementById("noResults");
    const resetFilters = document.getElementById("resetFilters");

    const gridView = document.getElementById("gridView");
    const listView = document.getElementById("listView");


    /* =========================================
       FILTER STATE
    ========================================== */

    let activeFilters = {
        search: "",
        area: "all",
        day: "all",
        produce: "all",
        sort: "default"
    };


    /* =========================================
       SEARCH
    ========================================== */

    searchInput.addEventListener("input", () => {

        activeFilters.search = searchInput.value
            .trim()
            .toLowerCase();

        clearSearch.style.display =
            searchInput.value ? "block" : "none";

        applyFiltering();

    });


    clearSearch.addEventListener("click", () => {

        searchInput.value = "";

        activeFilters.search = "";

        clearSearch.style.display = "none";

        applyFiltering();

        searchInput.focus();

    });


    /* =========================================
       SELECT FILTERS
    ========================================== */

    areaFilter.addEventListener("change", () => {

        activeFilters.area = areaFilter.value;

        updateFilterCounter();

    });


    dayFilter.addEventListener("change", () => {

        activeFilters.day = dayFilter.value;

        updateFilterCounter();

    });


    produceFilter.addEventListener("change", () => {

        activeFilters.produce = produceFilter.value;

        updateFilterCounter();

    });


    sortFilter.addEventListener("change", () => {

        activeFilters.sort = sortFilter.value;

        applyFiltering();

    });


    /* =========================================
       APPLY FILTER BUTTON
    ========================================== */

    applyButton.addEventListener("click", () => {

        activeFilters.search =
            searchInput.value.trim().toLowerCase();

        activeFilters.area =
            areaFilter.value;

        activeFilters.day =
            dayFilter.value;

        activeFilters.produce =
            produceFilter.value;

        activeFilters.sort =
            sortFilter.value;

        applyFiltering();

        updateFilterCounter();

    });


    /* =========================================
       MAIN FILTER FUNCTION
    ========================================== */

    function applyFiltering() {

        let visibleCards = [];

        cards.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            const area =
                card.dataset.area.toLowerCase();

            const day =
                card.dataset.day.toLowerCase();

            const produce =
                card.dataset.produce.toLowerCase();

            const isOpen =
                card.dataset.open === "true";


            /* SEARCH */

            const searchMatch =
                !activeFilters.search ||
                name.includes(activeFilters.search) ||
                area.includes(activeFilters.search) ||
                produce.includes(activeFilters.search);


            /* AREA */

            const areaMatch =
                activeFilters.area === "all" ||
                area === activeFilters.area;


            /* DAY */

            const dayMatch =
                activeFilters.day === "all" ||
                day.includes(activeFilters.day);


            /* PRODUCE */

            const produceMatch =
                activeFilters.produce === "all" ||
                produce.includes(activeFilters.produce);


            const matches =
                searchMatch &&
                areaMatch &&
                dayMatch &&
                produceMatch;


            if (matches) {

                card.style.display = "";

                visibleCards.push(card);

            } else {

                card.style.display = "none";

            }

        });


        sortCards(visibleCards);

        resultCount.textContent = visibleCards.length;

        updateEmptyState(visibleCards.length);

    }


    /* =========================================
       SORTING
    ========================================== */

    function sortCards(visibleCards) {

        const sortType =
            activeFilters.sort;

        if (sortType === "default") {
            return;
        }


        visibleCards.sort((a, b) => {

            const nameA =
                a.dataset.name.toLowerCase();

            const nameB =
                b.dataset.name.toLowerCase();

            const areaA =
                a.dataset.area.toLowerCase();

            const areaB =
                b.dataset.area.toLowerCase();


            if (sortType === "name-asc") {

                return nameA.localeCompare(nameB);

            }


            if (sortType === "name-desc") {

                return nameB.localeCompare(nameA);

            }


            if (sortType === "area") {

                return areaA.localeCompare(areaB);

            }


            if (sortType === "open") {

                return (
                    Number(b.dataset.open) -
                    Number(a.dataset.open)
                );

            }

        });


        visibleCards.forEach(card => {
            grid.appendChild(card);
        });

    }


    /* =========================================
       FILTER COUNTER
    ========================================== */

    function updateFilterCounter() {

        let count = 0;


        if (
            areaFilter.value !== "all"
        ) {
            count++;
        }


        if (
            dayFilter.value !== "all"
        ) {
            count++;
        }


        if (
            produceFilter.value !== "all"
        ) {
            count++;
        }


        if (
            searchInput.value.trim() !== ""
        ) {
            count++;
        }


        if (count > 0) {

            filterCount.style.display = "flex";
            filterCount.textContent = count;

        } else {

            filterCount.style.display = "none";

        }

    }


    /* =========================================
       EMPTY STATE
    ========================================== */

    function updateEmptyState(count) {

        if (count === 0) {

            noResults.style.display = "block";
            grid.style.display = "none";

        } else {

            noResults.style.display = "none";
            grid.style.display = "";

        }

    }


    /* =========================================
       RESET
    ========================================== */

    resetFilters.addEventListener("click", resetAllFilters);


    function resetAllFilters() {

        searchInput.value = "";

        areaFilter.value = "all";
        dayFilter.value = "all";
        produceFilter.value = "all";
        sortFilter.value = "default";

        activeFilters = {
            search: "",
            area: "all",
            day: "all",
            produce: "all",
            sort: "default"
        };

        clearSearch.style.display = "none";

        updateFilterCounter();

        applyFiltering();

    }


    /* =========================================
       GRID / LIST VIEW
    ========================================== */

    gridView.addEventListener("click", () => {

        grid.classList.remove("list-view");

        gridView.classList.add("active");
        listView.classList.remove("active");

    });


    listView.addEventListener("click", () => {

        grid.classList.add("list-view");

        listView.classList.add("active");
        gridView.classList.remove("active");

    });


    /* =========================================
       FAVORITES
    ========================================== */

    document.querySelectorAll(".favorite-btn")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.stopPropagation();

                button.classList.toggle("saved");

                const icon =
                    button.querySelector("i");

                if (button.classList.contains("saved")) {

                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );

                } else {

                    icon.classList.remove(
                        "fa-solid"
                    );

                    icon.classList.add(
                        "fa-regular"
                    );

                }

            });

        });


    /* =========================================
       SAVE BOOKMARK
    ========================================== */

    document.querySelectorAll(".save-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const icon =
                    button.querySelector("i");

                icon.classList.toggle(
                    "fa-regular"
                );

                icon.classList.toggle(
                    "fa-solid"
                );

            });

        });


    /* =========================================
       MARKET DETAILS MODAL
    ========================================== */

    const modal =
        document.getElementById("marketModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalLocation =
        document.getElementById("modalLocation");

    const modalTiming =
        document.getElementById("modalTiming");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalTags =
        document.getElementById("modalTags");

    const modalStatus =
        document.getElementById("modalStatus");


    document.querySelectorAll(".details-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const card =
                    button.closest(".market-card");


                const image =
                    card.querySelector("img");

                const title =
                    card.querySelector("h3");

                const location =
                    card.querySelector(".location");

                const timing =
                    card.querySelector(".timing");

                const description =
                    card.querySelector(".description");

                const tags =
                    card.querySelectorAll(".tags span");

                const status =
                    card.querySelector(".status-badge");


                modalImage.src =
                    image.src;

                modalImage.alt =
                    title.textContent;


                modalTitle.textContent =
                    title.textContent;


                modalLocation.innerHTML =
                    location.innerHTML;


                modalTiming.innerHTML =
                    timing.innerHTML;


                modalDescription.textContent =
                    description.textContent;


                modalStatus.textContent =
                    status.textContent.trim();


                if (
                    card.dataset.open === "true"
                ) {

                    modalStatus.style.background =
                        "#e6f5ed";

                    modalStatus.style.color =
                        "#087653";

                } else {

                    modalStatus.style.background =
                        "#fdeceb";

                    modalStatus.style.color =
                        "#dc4c43";

                }


                modalTags.innerHTML = "";

                tags.forEach(tag => {

                    const span =
                        document.createElement("span");

                    span.textContent =
                        tag.textContent;

                    modalTags.appendChild(span);

                });


                modal.classList.add("show");

                document.body.style.overflow =
                    "hidden";

            });

        });


    function closeModal() {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal();
        }

    });


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeModal();

        }

    });


    /* =========================================
       CLOCK
    ========================================== */

    function updateClock() {

        const now = new Date();

        const time =
            now.toLocaleTimeString(
                "en-US",
                {
                    hour: "numeric",
                    minute: "2-digit"
                }
            );

        const currentTime =
            document.getElementById("currentTime");

        const statTime =
            document.getElementById("statTime");


        if (currentTime) {
            currentTime.textContent = time;
        }

        if (statTime) {
            statTime.textContent = time;
        }

    }


    updateClock();

    setInterval(updateClock, 60000);


    /* =========================================
       VISITOR COUNTER
    ========================================== */

    let visitors = 4892;

    const visitorElement =
        document.getElementById("visitorCount");

    const totalVisitorElement =
        document.getElementById("totalVisitors");


    function updateVisitors() {

        visitors +=
            Math.floor(Math.random() * 2);

        const formatted =
            visitors.toLocaleString();


        if (visitorElement) {
            visitorElement.textContent =
                formatted;
        }

        if (totalVisitorElement) {
            totalVisitorElement.textContent =
                formatted;
        }

    }


    setInterval(updateVisitors, 30000);


    /* =========================================
       FRESHBOT
    ========================================== */

    const freshBot =
        document.getElementById("freshBot");

    const closeBot =
        document.getElementById("closeBot");

    const botInput =
        document.getElementById("botInput");

    const sendBot =
        document.getElementById("sendBot");

    const botBody =
        freshBot.querySelector(".bot-body");


    closeBot.addEventListener("click", () => {

        freshBot.style.display = "none";

    });


    document.querySelectorAll(".quick-question")
        .forEach(button => {

            button.addEventListener("click", () => {

                botInput.value =
                    button.textContent.trim();

                sendBotMessage();

            });

        });


    sendBot.addEventListener(
        "click",
        sendBotMessage
    );


    botInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                sendBotMessage();
            }

        }
    );


    function sendBotMessage() {

        const message =
            botInput.value.trim();

        if (!message) {
            return;
        }


        const userMessage =
            document.createElement("div");

        userMessage.className =
            "bot-message";

        userMessage.style.background =
            "#087653";

        userMessage.style.color =
            "white";

        userMessage.textContent =
            message;


        botBody.appendChild(userMessage);

        botInput.value = "";


        setTimeout(() => {

            const reply =
                document.createElement("div");

            reply.className =
                "bot-message";


            const lowerMessage =
                message.toLowerCase();


            if (
                lowerMessage.includes("dha")
            ) {

                reply.textContent =
                    "DHA Farmers Market is available in our directory. Use the DHA filter to find it quickly.";

            } else if (
                lowerMessage.includes("open")
            ) {

                reply.textContent =
                    "You can use the Sort By → Open Markets option to bring currently open markets to the top.";

            } else if (
                lowerMessage.includes("season")
            ) {

                reply.textContent =
                    "September is a great time to explore seasonal fruits, vegetables and fresh local produce.";

            } else if (
                lowerMessage.includes("produce")
            ) {

                reply.textContent =
                    "Try the Produce Type filter to explore fruits, vegetables, dairy, herbs and more.";

            } else {

                reply.textContent =
                    "Try searching for a market name, Karachi area, or produce type and I'll help you find it.";

            }


            botBody.appendChild(reply);

            botBody.scrollTop =
                botBody.scrollHeight;

        }, 500);

    }


    /* =========================================
       INITIAL LOAD
    ========================================== */

    updateFilterCounter();

    applyFiltering();

});