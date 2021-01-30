const buttons = document.querySelectorAll('button');
textField.document.designMode = "On";
let show = false;

for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        let cmd = buttons[i].getAttribute('data-cmd');
        if(buttons[i].name === 'active'){
            buttons[i].classList.toggle('active');
        }
        if(cmd === 'insertImage' || cmd === 'createLink'){
            let url = prompt("Enter Link Here: ", "");
            textField.document.execCommand(cmd, false, url);
            if(cmd === 'insertImage'){
                const imgs = textField.document.querySelectorAll('img');
                imgs.forEach(img => {
                    img.style.maxWidth = "500px";
                })
            }else {
                const links = textField.document.querySelectorAll('a');
                links.forEach(link => {
                    link.target = "_blank";
                    link.addEventListener('mouseover', () => {
                        textField.document.designMode = "Off";
                    });
                    link.addEventListener('mouseout', () => {
                        textField.document.designMode = "On";
                    });
                })
            }
        } else {
            textField.document.execCommand(cmd, false, null);
        }
        if (cmd === 'showCode'){
            const textBody = textField.document.querySelector('body');
            if(show){
                textBody.innerHTML = textBody.textContent;
                show = false;
            }else {
                textBody.textConent = textBody.innerHTML;
                show = true;
            }
        }
    })
}