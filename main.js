class LottoNumber extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = document.createElement('div');
        number.setAttribute('class', 'lotto-number');
        number.textContent = this.getAttribute('number');

        const style = document.createElement('style');
        style.textContent = `
            .lotto-number {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #4CAF50;
                color: white;
                font-size: 1.5rem;
                font-weight: bold;
            }
        `;
        shadow.appendChild(style);
        shadow.appendChild(number);
    }
}

customElements.define('lotto-number', LottoNumber);

document.getElementById('generate-button').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    for (const number of Array.from(numbers).sort((a, b) => a - b)) {
        const lottoNumberElement = document.createElement('lotto-number');
        lottoNumberElement.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoNumberElement);
    }
});
