
var data

(async () => {
    data = await (await fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json')).json()
    let countryDropdown = document.getElementById('country')
    data.forEach((country) => {
        let opt = document.createElement("option")
        opt.value = country.code3
        opt.innerHTML = country.name
        countryDropdown.append(opt)
    })

})()

const getStates = async () => {
    let stateDropdown = document.getElementById('state')
    let countryValue = document.getElementById('country').value
    while(stateDropdown.firstChild){
        stateDropdown.removeChild(stateDropdown.firstChild)
    }
    data.forEach((country) => {
        if(country?.code3 === countryValue){
            if(country?.states && country.states.length === 0){
                let opt = document.createElement("option")
                opt.setAttribute('disabled',true)
                opt.setAttribute('hidden',true)
                opt.setAttribute('selected',true)
                opt.innerHTML = 'No States Found'
                stateDropdown.append(opt)
                return
            }
            country.states.forEach(state => {
                let opt = document.createElement("option")
                opt.value = state.code
                opt.innerHTML = state.name
                stateDropdown.append(opt)
            });
        }
        
    })
}

var message
//Getting Parent window data
window.addEventListener('message', function (e) {
    message = JSON.parse(e.data);
});

//form validation
const checkError = (item) => {
    let field = item.field
    let input = ''
    input = document.getElementById(field)
    for(let validate of item.validator)
    {
        if(validate.required && !input.value){
            return {error:'This value is required'}
        }   
        else if(validate.minLength && (!input.value || input.value?.length < validate.minLength)){
            return {error:`Length must be atleast ${validate.minLength} characters`}
        }
        else if(validate.maxLength && (!input.value || input.value?.length > validate.maxLength)){
            return {error:`Length must be atmost ${validate.maxLength} characters`}
        }
        else if(validate.type && validate.type === 'email' ){
            input.type = 'email'
            if(!input.checkValidity() || !input.value){
                return {error:'Email address is invalid'}
            }
        }
        else if(validate.type && validate.type === 'mobile'){
            input.type = 'number'
            if(!input.checkValidity() || !input.value || input.value.length !== 10 ){
                return {error:'Mobile number is invalid'}
            }
        }
    }
    return false

}
const validateForm = (e) => {
    e.preventDefault()
    let result = {}
    message.validators.forEach((item) => {
        let error = checkError(item)
        if(error !== false){
            result[item.field] = error
        }
    })
    if(Object.keys(result).length === 0){
        result = {Success:"All fields are valid"}
    }
    window.parent.postMessage(JSON.stringify(result),'*')
}
