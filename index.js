const saveCodeBtn = document.querySelector('.saveCodeBtn');
const codeBlockTitleInp = document.querySelector('#codeBlockTitle');
const codeBlocksSection = document.querySelector('.codeBlocks');

const flask = new CodeFlask('#code_editor', {
	lineNumbers: true,
});

window.addEventListener('load', () => {
	const codeBlocks = { ...localStorage };
	Object.entries(codeBlocks).forEach(([key, value]) => {
		if (key.startsWith('card')) {
			const id = key.split('_')[1];
			const cardDiv = document.createElement('div');
			cardDiv.classList.add(`c_${id}`);
			cardDiv.style.margin = '0 auto';
			cardDiv.style.marginBottom = '24px';
			cardDiv.innerHTML = JSON.parse(value);
			codeBlocksSection.append(cardDiv);
			const codeBlock = document.querySelector(`.block_${id}`);
			codeBlock.textContent = JSON.parse(localStorage.getItem(`code_${id}`));
		}
	});
});

const deleteCodeBlock = (id) => {
	const identifier = `card_${id}`;
	localStorage.removeItem(identifier);
	localStorage.removeItem(`code_${id}`);
	document.querySelector(`.c_${id}`).remove();
};

saveCodeBtn.addEventListener('click', () => {
	const code = flask.getCode();
	const codeBlockTitleValue = codeBlockTitleInp.value;
	if (code === '' || codeBlockTitleValue === '') {
		alert('Form can not be sent empty');
		return;
	}
	const id = crypto.randomUUID();
	const card = `<div class="card card_${id}" style="width: 20rem; height: 300px; overflow-y: scroll;">
                    <div class="card-body">
                    <h5 class="card-title" style="text-align:center;">${codeBlockTitleValue}</h5>
                    <hr>
                    <div class='codeBlockContainer'>
                        <code class='block_${id}'></code>
                    </div>
                    <div style="text-align: center;" class="deleteBlockBtnContainer">
                        <button type="button" class="btn btn-link" onclick="deleteCodeBlock('${id}')">Delete</button>
                    </div>
                </div>`;
	const cardDiv = document.createElement('div');
	cardDiv.classList.add(`c_${id}`);
	cardDiv.style.margin = '0 auto';
	cardDiv.style.marginBottom = '24px';
	cardDiv.innerHTML = card;
	localStorage.setItem(`card_${id}`, JSON.stringify(card));
	localStorage.setItem(`code_${id}`, JSON.stringify(code));
	codeBlocksSection.append(cardDiv);
	const codeBlock = document.querySelector(`.block_${id}`);
	codeBlock.textContent = code;
	flask.updateCode('');
	codeBlockTitleInp.value = '';
});
