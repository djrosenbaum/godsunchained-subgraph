// async function getCardsFromAddress(address) {
//     const url = `https://api.godsunchained.com/v0/user/${address}/inventory?format=compressed`;
//     const response = await fetch(url);
//     return await response.json();
// }

async function getCardsFromAddress(address) {
    return await fetch('https://api.thegraph.com/subgraphs/id/QmXZdWFJedzz5umg8Bo5qwav8sPyeLCJ2gzBcaoAWWuj2i', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({query: `{ owners(where:{ id: "${address}" }) { balance tokens(first: 10, skip:${getSkip()}) { id proto quality } } }`})
    })
    .then(r => r.json())
    // .then(data => console.log('data returned:', data.data));
}

function getSkip() {
    return 0;
}

function getMarkup(data) {
    const { tokens } = data.data.owners[0];

    return tokens.map((token) => {
        return `<a href="https://etherscan.io/token/0x629cdec6acc980ebeebea9e5003bcd44db9fc5ce?a=${token.id}" target="_blank"><div class="card-wrapper"><composited-card class="card" protoId="${token.proto}" quality="${token.quality}" responsiveSrcsetSizes="(min-width: 250px) 160px, 320px"></composited-card><div class="tokenid">${token.id}</div></div></a>`;
    }).join('');
}

function updateUrl(address) {
    const state = { address };
    const title = 'Gods Ungraphed';
    const url = `${window.location.href.split('?')[0]}?tokenHolder=${address}`;

    history.pushState(state, title, url);
}

async function displayCards() {
    const defaultAddress = '0x0006e4548aed4502ec8c844567840ce6ef1013f5';
    const inputAddress = document.getElementById('input_address').value.toLowerCase();

    const address = inputAddress || defaultAddress;

    document.getElementById('input_address').value = address;

    updateUrl(address);

    const data = await getCardsFromAddress(address);

    console.log('data:', data);

    const markup = getMarkup(data);

    // console.log('markup:', markup);

    // document.getElementById('cards').insertAdjacentHTML('beforeend', markup);
    document.getElementById('cards').innerHTML = markup;
}

window.addEventListener('DOMContentLoaded', (event) => {
    const display_cards = document.getElementById('display_cards');
    display_cards.addEventListener('click', displayCards);

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('tokenHolder')) {
        document.getElementById('input_address').value = urlParams.get('tokenHolder');
        display_cards.click();
    }
});