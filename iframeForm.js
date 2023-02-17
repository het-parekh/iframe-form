

window.onload = (e) => {
    let frameEle = document.getElementById('i-form')
    const message = {
        validators:[
            {
                field:'name',
                validator:[{required:true},{minLength:4},{maxLength:10}]
            },
            {
                field:'email',
                validator:[{type:'email'}]
            },
            {
                field:'mobile',
                validator:[{type:'mobile'}]
            },
            {
                field:'country',
                validator:[{required:true}]
            },
            {
                field:'state',
                validator:[{required:true}]
            }
        ]
    }
    frameEle.contentWindow.postMessage(JSON.stringify(message), '*');
}

window.addEventListener('message', function (e) {
        if(typeof e.data === 'string'){
            let resultsDiv = document.getElementById('results')
            resultsDiv.innerHTML = 'Result: ' +e.data
        }
        

});


