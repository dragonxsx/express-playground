const input = document.querySelector('#input')
const expandBtn = document.querySelector('#expand-btn')
const result = document.querySelector('#result')

expandBtn.addEventListener('click', () => {
    // Initally set the result to loading
    result.innerText = 'Loading ...'
    fetch(`/expand`)
        .then(res => res.text())
        .then(text => {
            // Display the result send from the server
            result.innerText = text
        })
        .catch(err => {
            console.log(err)
            result.innerText = 'Error'
        })
})
