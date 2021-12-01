const app = {

    base_url: 'http://localhost:3000',
    defaultErrorMessage: 'Désolé un problème est survenu, veuillez réessayer ultérieurement',

    init: function () {
    console.log('app.init !');

    app.addListenerToActions();
    app.getPlayFromAPI();
    },

    addListenerToActions: function () {
    },

    getPlayFromAPI: async function () {
        try {

            const response = await fetch(app.base_url + '/api/');

            if (response.status !== 200) {
                const error = await response.json();
                throw error;
            }

            const lists = await response.json();
            console.log(`lists`, lists)
            for (const list of lists) {
                app.makeListInDOM(list);
                }

        } catch (error) {
            alert(app.defaultErrorMessage);
            console.error(error);
        }
    },

    makeListInDOM: function (list) {
        console.log(`list`, list)
        const playTemplate = document.getElementById('template-play');
        const playTemplateContent = playTemplate.content;
        const newPlay = document.importNode(playTemplateContent, true);
   
        const time = newPlay.querySelector('.time');
        time.textContent = list.created_at

        const nameTeam_A = newPlay.querySelector('.team_A');
        nameTeam_A.textContent = list.team_A

        const nameTeam_B = newPlay.querySelector('.team_B');
        nameTeam_B.textContent = list.team_B

        // if (listId) {
        //     const blockList = newList.querySelector('.panel');
        //     blockList.setAttribute('list-id', listId);
        //     const idField = form.querySelector('input[name="id"]');
        //     idField.value = listId;
        //     const nameField = form.querySelector('input[name="name"]');
        //     nameField.value = listName;
        // }

        const playContainer = document.querySelector('.lists');
        // const button = newList.querySelector('.add-card-button');

        // const buttonTrash = newList.querySelector('.buttonMoins');
        // buttonTrash.addEventListener('click', listModule.deleteList);

        playContainer.append(newPlay);

        // button.addEventListener('click', cardModule.showAddCardModal);
    },

};


document.addEventListener('DOMContentLoaded', app.init);