const input = document.querySelector('#input')
const expandBtn = document.querySelector('#expand-btn')
const result = document.querySelector('#result')

expandBtn.addEventListener('click', () => {
    result.removeAttribute('href');
    result.removeAttribute('target');
    
    // Initally set the result to loading
    result.innerText = 'Loading ...'
    
    fetch(`/expand?shortUrl=${input.value}`)
        .then(res => res.text())
        .then(text => {
            if(text === 'Error') {
                result.innerText = 'Invalid input';
                return;
            }

            // Display the result send from the server
            result.innerText = text
            result.setAttribute('href', text);
            result.setAttribute('target', "_blank");
        })
        .catch(err => {
            result.innerText = 'Error'
        })
})
