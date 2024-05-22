import {atom} from "recoil"



export const priceAtom = atom({
    key: "priceatom",
    default : ""
    
})

export const deadlineAtom = atom({
    key: "deadlineatom",
    default : new Date()
})