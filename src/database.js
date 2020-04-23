/* eslint-disable no-unused-vars */
import PouchDB from "pouchdb";
import store from "./store/index"

let remoteCouch;


export function setRemote(remote) {
   remoteCouch = new PouchDB(remote)
    remoteCouch.changes({
        since: 'now',
        live: true
    }).on('change', getAllMessages);
}

function syncErrorTo(err) {
    log("Failed to sync to Database", "#ff0000")
}

function syncErrorFrom(err) {
    log("Failed to sync from Database", "#ff0000")
}


export function putMessage(message) {
    remoteCouch.put({
        ...message,
        "_id": message.time.toISOString()+message.user
    })
}

export function getAllMessages() {
    return remoteCouch.allDocs({
        include_docs: true,
        attachments: true
    }).then(res => {
        let result = res.rows.map(obj => obj.doc);
        store.commit("setMessages", result)
    })

}

export function getUserId({name, pin}) {
    return name + "_" + pin;
}

export function getNameOfUser(user) {
    // const classlist = store.getters.classlist;
    // // const search = getUserId(user);
    // const item = classlist.filter(listitem => getUserId(listitem) === user)[0];
    return "Unbekannt";
}

export function areUsersEqual(user1, user2) {
    return getUserId(user1) === getUserId(user2)
}

export function deleteChat(message) {
    putMessage({
        ...message,
        deleted: true,
        time: new Date(message.time)
    })
}


function log(text, bg) {
    setTimeout(console.log.bind(console, `%c${text}`, `background: ${bg};color:#FFF;padding-left:5px;padding-right:5px;border-radius: 5px;line-height: 26px;`));
}
