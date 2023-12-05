const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factList = document.querySelector(".facts-list");

// Create DOM elements: Render facts in list
factList.innerHTML = "";

loadFacts();

// Load data from Supabase
async function loadFacts() {
  try {
    const res = await fetch(
      "https://nnnsdsaadbfszmgdbclp.supabase.co/rest/v1/fact",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubnNkc2FhZGJmc3ptZ2RiY2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1NDg1ODMsImV4cCI6MjAxNzEyNDU4M30.Ixizo_-z4v5yr8E2K6aWxkDuD3A92n5jBMdLSTPLLXg",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubnNkc2FhZGJmc3ptZ2RiY2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1NDg1ODMsImV4cCI6MjAxNzEyNDU4M30.Ixizo_-z4v5yr8E2K6aWxkDuD3A92n5jBMdLSTPLLXg",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    //   const filteredData = data.filter((fact => fact.category === "society"));

    createFactsList(data);
  } catch (error) {
    console.error("Error loading facts:", error);
  }
}

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
        <p>${fact.text}
            <a class="source"
                href="${fact.source}"
                target="_blank">_Source_
            </a>
        </p>
        <span style="background-color: ${
          CATEGORIES.find((el) => el.name === fact.category).color
        }" 
              class="tag">#${fact.category}#
        </span>
    </li>`
  );
  //console.log(htmlArr);
  const html = htmlArr.join("");
  factList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});
