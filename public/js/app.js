
const weatherForm = document.querySelector('form')
const addressTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const errorMessage = document.querySelector('#message-error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const intervalId = setInterval(toggleLoading, 300);
    // Empty all other data in the past 
    messageTwo.textContent = ""
    errorMessage.textContent = ""
    fetch(`/weather?address=${addressTerm.value}`).then((res) => {
        res.json().then((data) => {
            messageOne.textContent = ""
            clearInterval(intervalId);
            if (data.error) {
                errorMessage.textContent = "error: " + data.error
            } else {
                messageOne.textContent = "Location: " + data.location
                messageTwo.textContent = `It's ${data.temperature} degree. Yes, ${data.condition} condition in ${data.address}`
            }
        })
    })

})


// handle loading
function toggleLoading() {
    const messageOne = document.querySelector('#message-1')
    const currentText = messageOne.textContent;

    switch (currentText) {
        case 'Loading':
            messageOne.textContent = 'Loading.';
            break;
        case 'Loading.':
            messageOne.textContent = 'Loading..';
            break;
        case 'Loading..':
            messageOne.textContent = 'Loading...';
            break;
        case 'Loading...':
            messageOne.textContent = 'Loading';
            break;
        default:
            messageOne.textContent = 'Loading';
    }
}