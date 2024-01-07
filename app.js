var Eimage = document.getElementById('image');
var Efname = document.getElementById('fname');
var Elname = document.getElementById('lname');
var Eemail = document.getElementById('email');
var Egender = document.getElementById('gender');
var Ejob = document.getElementById('job');
var Eaddress = document.getElementById('address');
var btn = document.getElementById('btn');



var spinnerWrapper = document.createElement('div');
spinnerWrapper.classList.add('spinner-wrapper');

var spinner = document.createElement('div');
spinner.classList.add('spinner');
spinnerWrapper.appendChild(spinner);

function setLoader(){
    document.body.appendChild(spinnerWrapper);
}

function removeLoader(){
    document.body.removeChild(spinnerWrapper);
}

btn.addEventListener('click', generateUser);

async function getUser(){
    setLoader();
    try{
        const response = await fetch('https://random-data-api.com/api/users/random_user?size=1', {
            method: 'GET'
        });
        removeLoader();
        return response.json();
    }catch(err){
        console.log("Error while fetching user: ", err);
    }
    removeLoader();
}

function setData(url, fname, lname, email, gender, job, address){
    Eimage.setAttribute("src", url);
    Efname.innerText = fname;
    Elname.innerText = lname;
    Eemail.innerText = email;
    Egender.innerText = gender;
    Ejob.innerText = job;
    Eaddress.innerText = address;
}

async function generateUser(){
    getUser()
    .then((res) => {
        const { avatar, first_name, last_name, email, gender, employment, address: addressObject } = res[0];
        
        const job = employment.title;
    
        const {street_name, street_address, city, state, country, zip_code} = addressObject;
        const addressList = [street_name, street_address, city, state, country, zip_code]
        
        const address = addressList.join(", ");
        setData(avatar, first_name, last_name, email, gender, job, address);
    }).catch(err => {
        console.log(err);
    })
}

generateUser();