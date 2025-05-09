// ==============================
// 🌱 Sélection des éléments
// ==============================

const description = document.querySelector(".description");
const amount = document.querySelector(".montant");
const rubric = document.getElementById("catégorie");
const btn = document.querySelector(".add");
const resume = document.querySelector(".résumer");
const tot = document.querySelector(".total");
const date = document.querySelector(".date");

// ==============================
// 🌍 Variables globales
// ==============================

const tab = [];

// ==============================
// 🎊 Fonctionnalités
// ==============================

function find_emoji(txt_rubric) {
	console.log(txt_rubric)
	switch (txt_rubric) {
		case "alimentation":
			return ("🍕");
		case "logement":
			return ("🔑");
		case "transport":
			return ("🚅");
		case "divertissement":
			return ("✨");
		default :
		return ("?");
	}
};

function create_tab() {
	let tmp = [rubric.value, description.value, amount.value, date.value]
	tab.push(tmp);
	const emoji = find_emoji(rubric.value);
	return (`${emoji} - ${description.value} - ${amount.value}€ - ${date.value}`);
};

// add element in html

function add_resume(txt, index) {
	let div = document.createElement("div");
	div.innerHTML = `${txt} <button class="delete">❌</button>`;
	div.setAttribute("data-index", index);
	resume.appendChild(div);
};

// delete all + add all remaining tab element

function reorganize_index() {
	resume.innerHTML = "";
	let i = 0;
	tab.forEach((x) => {
		const emoji = find_emoji(x[0])
		add_resume(`${emoji} - ${x[1]} - ${x[2]}€ - ${x[3]}`, i++);
	});
};

function add_tot() {
	let total = 0;
	if (tab.length != 0) {
		tab.forEach((x) => {
			total += (Number)(x[2]);
		});
	}
	tot.innerHTML = `Total: ${total} €`;
};

function printEmpty() {
	resume.innerHTML = "Aucune dépense enregistrée.";
};

function clear_form() {
	description.value = "";
	amount.value = "";
	rubric.value = "";
	date.value = "";
};

// ==============================
// 🧲 Événements
// ==============================

// add button

printEmpty();
add_tot();

btn.addEventListener("click", function(e) {
	e.preventDefault();
	if (description.value && amount.value && rubric.value && date.value && amount.value >= 0) {
		if (tab.length == 0) {
			resume.innerHTML = '';
		}
		let txt_resume = create_tab();
		add_resume(txt_resume, (tab.length - 1));
		add_tot();
		console.log(tab);
	}
	else {
		// message remplir form
	}
	clear_form();
});

// delete button

resume.addEventListener("click", function(e) {
	if (e.target.matches("button.delete")) {
		const index = e.target.parentElement.dataset.index;
		tab.splice(index, 1);
		if (tab.length != 0) {
			reorganize_index();
		}
		else {
			printEmpty();
		}
		add_tot();
	}
});
