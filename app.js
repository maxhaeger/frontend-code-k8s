function submitform(evt) {
    evt.preventDefault();
    let data = new FormData(evt.target);
    let title = data.get("title");
    let message = data.get("message");
    fetch("/apiv1/messages/create", {
        method: "POST",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
        body: `title=${title}&message=${message}`
    }).then(result => {
        reloadMessages();
    })
}
function reloadMessages() {
    let listElement = document.getElementById("messages");
    fetch("/apiv1/messages/list").then(result => {
        result.json().then(data => {
            listElement.replaceChildren();
            data.forEach(msg => {
                let e = document.createElement("li");
                e.innerText = `${msg.title}: ${msg.message}`;
                listElement.appendChild(e);
            })
        });
    });
}
window.onload = reloadMessages;