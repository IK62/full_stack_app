selectionh2 = document.querySelector('#H2');

username = 'none';

if (username == 'none') {
    selectionh2.innerHTML = `Hi New user`;
} else {
    selectionh2.innerHTML = `Hi ${username}`;
}