let toDoInput, errorInfo, addBtn, ulList;
let newElement;
let popup, popupInfo, toDoToEdit, popupInput, popupAddBtn, popupCloseBtn;


const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};


const prepareDOMElements = () => {
	toDoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".UlToDo");

	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};


const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewElement);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeToDo);
	toDoInput.addEventListener("keyup", enterKeyCheck);
};


const addNewElement = () => {
	if (toDoInput.value !== "") {
		
		newElement = document.createElement("li");
		newElement.textContent = toDoInput.value;

		createToolsArea();

		
		ulList.append(newElement);

		toDoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Wpisz treść zadania";
	}
};

const createToolsArea = () => {
	
	const toolsPanel = document.createElement("div");
	
	toolsPanel.classList.add("tools");
	
	newElement.append(toolsPanel);

	const completeBtn = document.createElement("button");
	completeBtn.classList.add("complete");
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement("button");
	editBtn.classList.add("edit");
	editBtn.textContent = "EDIT";

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};


const checkClick = (e) => {
	
	if (e.target.matches(".complete")) {
		
		e.target.closest("li").classList.toggle("completed");
		
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editToDo(e);
	} else if (e.target.matches(".delete")) {
		deleteToDO(e);
	}
};


const editToDo = (e) => {
	
	toDoToEdit = e.target.closest("li");
	popupInput.value = toDoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};

const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};

const changeToDo = () => {
	
	if (popupInput.value !== "") {
		
		toDoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Musisz podać jakąś treść";
	}
};


const deleteToDO = (e) => {
	
	e.target.closest("li").remove();
	const allToDO = ulList.querySelectorAll("li");
	if (allToDO.length === 0) {
		errorInfo.textContent = "Brak zadań na liście";
	}
};


const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		addNewElement();
	}
};

document.addEventListener("DOMContentLoaded", main);
