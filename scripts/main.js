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
const alim_box = document.querySelector(".alimentation_box");
const logement_box = document.querySelector(".logement_box");
const transport_box = document.querySelector(".transport_box");
const div_box = document.querySelector(".divertissement_box");
const empty = document.querySelector(".empty");
const tot_alim = document.querySelector(".tot_alim");
const tot_log = document.querySelector(".tot_log");
const tot_tr = document.querySelector(".tot_tr");
const tot_dive = document.querySelector(".tot_dive");

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

function append_categorie(div, key) {
	switch (key) {
		case "alimentation": {
			alim_box.appendChild(div);
			break;
		}
		case "logement": {
			logement_box.appendChild(div);
			break;
		}
		case "transport": {
			transport_box.appendChild(div);
			break;
		}
		case "divertissement": {
			div_box.appendChild(div);
			break;
		}
	}
}

function add_resume(txt, index, key) {
	let div = document.createElement("div");
	div.innerHTML = `${txt} <button class="delete">❌</button>`;
	div.setAttribute("data-index", index);
	append_categorie(div, key);
	// resume.appendChild(div);
};

// delete all + add all remaining tab element

function delete_box() {
	alim_box.innerHTML = "";
	logement_box.innerHTML = "";
	transport_box.innerHTML = "";
	div_box.innerHTML = "";
}

function reorganize_index() {
	delete_box();
	let i = 0;
	tab.forEach((x) => {
		const emoji = find_emoji(x[0])
		add_resume(`${emoji} - ${x[1]} - ${x[2]}€ - ${x[3]}`, i++ , x[0]);
	});
};

// add total

function add_tot() {
	let total_alim = 0;
	let total_log = 0;
	let total_tra = 0;
	let total_div = 0;
	let total = 0;
	if (tab.length != 0) {
		tab.forEach((x) => {
			switch (x[0]) {
				case "alimentation": {
					total_alim += (Number)(x[2]);
					break;
				}
				case "logement": {
					total_log += (Number)(x[2]);
					break;
				}
				case "transport": {
					total_tra += (Number)(x[2]);
					break;
				}
				case "divertissement": {
					total_div += (Number)(x[2]);
					break;
				}
			}
		});
	}
	tot_alim.innerHTML = total_alim;
	tot_log.innerHTML = total_log;
	tot_tr.innerHTML = total_tra;
	tot_dive.innerHTML = total_div;
	total = total_alim + total_log + total_tra + total_div;
	tot.innerHTML = `Total: ${total} €`;
};

function printEmpty() {
	empty.innerHTML = "Aucune dépense enregistrée.";
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
			empty.innerHTML = '';
		}
		let txt_resume = create_tab();
		add_resume(txt_resume, (tab.length - 1), rubric.value);
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
			delete_box();
			printEmpty();
		}
		add_tot();
	}
});
